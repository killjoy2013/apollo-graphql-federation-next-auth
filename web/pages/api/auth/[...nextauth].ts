import NextAuth, { NextAuthOptions } from "next-auth";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import ldap, { Client } from "ldapjs";
import jsonwebtoken from "jsonwebtoken";
import { decode, JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt";
import { prisma } from "db/prisma";
import { signOut, signIn } from "next-auth/react";

async function getRights(username: string): Promise<string[]> {
  let founduser = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      UserRole: {
        include: {
          role: {
            include: {
              rights: {
                select: {
                  right: true,
                },
              },
            },
          },
        },
      },
    },
  });

  let rights = [];

  founduser.UserRole.forEach((ur) => {
    ur.role.rights.forEach((ri) => {
      rights = [...rights, ri.right.name];
    });
  });

  return rights;
}

async function authAndCreateToken(username: string, password: string) {
  let rights = await authenticate(username, password);

  const token = {
    username: username,
    rights: rights,
    accessTokenExpires:
      Date.now() + parseInt(process.env.TOKEN_REFRESH_PERIOD) * 1000,
  };

  let refreshToken = jsonwebtoken.sign(token, process.env.TOKEN_SECRET, {
    expiresIn: parseInt(process.env.TOKEN_MAX_AGE),
    algorithm: "HS512",
  });

  return token;
}

async function validate(username: string, password: string): Promise<boolean> {
  if (username && password) {
    let foundUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (foundUser) {
      return true;
    } else {
      throw new Error("username not found");
    }
  } else {
    return false;
  }
}

async function authenticate(username: string, password: string) {
  let rights: string[];

  return new Promise(async (resolve, reject) => {
    try {
      await validate(username, password);
      rights = await getRights(username);
    } catch (error) {
      reject(error);
    }
    resolve(rights);
  });
}

function dell() {
  console.log("dd");
}

async function refreshToken(oldToken: JWT): Promise<any> {
  let returnValue: any;
  return new Promise(async (resolve, reject) => {
    let username = oldToken.username as string;

    console.log(
      `${username} token will refresh on ${new Date().toLocaleTimeString()}`
    );

    try {
      let user = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user || !user.refreshToken) {
        signOut();
        reject(`${username} not found or refresh token is empty!`);
      }

      const verified = jsonwebtoken.verify(
        user.refreshToken,
        process.env.TOKEN_SECRET
      ) as JWT;

      const { iat, exp, ...others } = oldToken;

      let rights = await getRights(user.username);

      const newToken = {
        ...others,
        rights,
        accessTokenExpires:
          Date.now() + parseInt(process.env.TOKEN_REFRESH_PERIOD) * 1000,
      };

      // const jwtClaims = {
      //   ...newClaims,
      //   createdAt: new Date().getTime(),
      // };

      const newRefreshToken = jsonwebtoken.sign(
        newToken,
        process.env.TOKEN_SECRET,
        {
          expiresIn: parseInt(process.env.TOKEN_MAX_AGE),
          algorithm: "HS512",
        }
      );

      await prisma.user.update({
        where: {
          username,
        },
        data: {
          refreshToken: newRefreshToken,
        },
      });

      // const newAccessToken = jsonwebtoken.sign(
      //   jwtClaims,
      //   process.env.TOKEN_SECRET,
      //   {
      //     expiresIn: parseInt(process.env.TOKEN_MAX_AGE),
      //     algorithm: 'HS512',
      //   }
      // );

      //returnValue = { ...jwtClaims };
      //returnValue = newAccessToken;

      resolve(newToken);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export const authOptions: NextAuthOptions = {
  secret: process.env.TOKEN_SECRET,
  jwt: {
    secret: process.env.TOKEN_SECRET,
    encode: async (params: JWTEncodeParams): Promise<string> => {
      const { secret, token } = params;
      let encodedToken = "";
      if (token) {
        const { exp, iat, ...rest } = token;

        encodedToken = jsonwebtoken.sign(rest, secret, {
          expiresIn: parseInt(process.env.TOKEN_REFRESH_PERIOD),
          algorithm: "HS512",
        });
      } else {
        console.log("TOKEN EMPTY. SO, LOGOUT!...");
        return "";
      }
      return encodedToken;
    },
    decode: async (params: JWTDecodeParams) => {
      const { token, secret } = params;
      const decoded = jsonwebtoken.decode(token);

      return { ...(decoded as JWT) };
    },
  },
  session: {
    maxAge: parseInt(process.env.TOKEN_MAX_AGE),
    updateAge: 0,
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.username = token.username;
      session.rights = token.rights;
      session.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return { ...user };
      }

      let left = ((token.accessTokenExpires as number) - Date.now()) / 1000;
      // console.log({
      //   now: Date.now(),
      //   accessTokenExpires: token.accessTokenExpires,
      //   left,
      // });

      if (left > 0) {
        return token;
      } else {
        let newToken = await refreshToken(token);
        // console.log(`refreshed token on ${new Date().toLocaleTimeString()}`, {
        //   newToken,
        // });
        return newToken;
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: "ORDINARY_JWT",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        if (!username || !password) {
          throw new Error("enter username or password");
        }
        try {
          let token = await authAndCreateToken(username, password);
          return token;
        } catch (error) {
          console.log(error);
          throw new Error("Authentication error");
        }
      },
    }),
  ],
  events: {
    async signOut({ session, token }) {
      await prisma.user.update({
        where: {
          username: token.username as string,
        },
        data: {
          refreshToken: null,
        },
      });
    },
  },
};

export default NextAuth(authOptions);
