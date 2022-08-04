import NextAuth, { NextAuthOptions } from 'next-auth';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import CredentialsProvider from 'next-auth/providers/credentials';
import ldap, { Client } from 'ldapjs';
import jsonwebtoken from 'jsonwebtoken';
import { decode, JWT, JWTDecodeParams, JWTEncodeParams } from 'next-auth/jwt';
import { prisma } from 'db/prisma';
import { signOut, signIn } from 'next-auth/react';

const regexCn = /.*CN=(.+[^,]).*OU=ESS,\s*OU=APPOU.*/gi;

async function updateUserRolesAndGetRights(
  username: string,
  roles: string[]
): Promise<string[]> {
  await prisma.$executeRaw`select auth.sp_revoke_all_roles_from_user(${username}); `;

  let promises: Promise<any>[] = [];

  roles.forEach((role) =>
    promises.push(
      prisma.$executeRaw`select auth.sp_assign_role_to_user(${role},${username});`
    )
  );

  await Promise.all(promises);

  let rights: any[] =
    await prisma.$queryRaw`select auth.sp_get_user_rights(${username})`;

  let justRights = rights.map((m) => m.sp_get_user_rights as string);

  return justRights;
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
    algorithm: 'HS512',
  });

  await prisma.user.upsert({
    where: { username },
    update: { refreshToken },
    create: { username, refreshToken },
  });

  return token;
}

async function searchAdForRoles(
  username: string,
  _client: Client = null
): Promise<string[]> {
  let client: Client = null;

  if (_client) {
    client = _client;
  } else {
    client = ldap.createClient({
      url: process.env.LDAP_HOST_ROLES as string,
    });

    client.on('error', (err) => {
      console.log('ldap err', err);
    });
  }

  const entries: ldap.SearchEntry[] = [];
  const roles: string[] = [];

  return new Promise((resolve, reject) => {
    client.bind(
      process.env.LDAP_DN_ROLES as string,
      process.env.LDAP_PASSWORD_ROLES as string,
      (error) => {
        if (error) {
          reject('LDAP bound failed');
        } else {
          const opts: ldap.SearchOptions = {
            filter: `(&(sAMAccountName=${username}))`,
            scope: 'sub',
            attributes: ['dn', 'sn', 'cn', 'sAMAccountName', 'memberOf'],
          };

          client.search(
            process.env.LDAP_BASE_DN_ROLES as string,
            opts,
            (err, res) => {
              if (err) {
                reject(`User ${username} LDAP search error`);
              } else {
                res.on('searchRequest', (searchRequest) => {
                  //console.log('searchRequest: ', searchRequest.messageID);
                });
                res.on('searchEntry', async (entry) => {
                  entries.push(entry);

                  entry.attributes
                    .filter((att) => att.json.type == 'memberOf')
                    .forEach((eaAtt) => {
                      eaAtt.json.vals.filter((val) => {
                        let match = regexCn.exec(val);
                        match && match[1] && roles.push(match[1]);
                      });
                    });

                  resolve(roles);

                  //todo: solve password problem in this ldap server
                  // client.bind(entry.dn, password, (err, res) => {
                  //   if (err) {
                  //     reject(`User ${username} username or password problem`);
                  //   } else {
                  //     resolve({
                  //       username,
                  //     });
                  //   }
                  // });
                });
                res.on('searchReference', (referral) => {
                  //console.log('referral: ' + referral.uris.join());
                });
                res.on('error', (err) => {
                  reject('LDAP SEARCH error');
                });
                res.on('end', (result) => {
                  if (entries.length == 0) {
                    reject(`User ${username} username or password problem`);
                  }
                });
              }
            }
          );
        }
      }
    );
  });
}

async function validate(username: string, password: string): Promise<boolean> {
  const client = ldap.createClient({
    url: process.env.LDAP_HOST_VALIDATION as string,
  });

  client.on('error', (err) => {
    console.log('ldap err', err);
  });

  const entries: ldap.SearchEntry[] = [];

  return new Promise((resolve, reject) => {
    client.bind(
      process.env.LDAP_DN_VALIDATION as string,
      process.env.LDAP_PASSWORD_VALIDATION as string,
      (error) => {
        if (error) {
          reject('LDAP bound failed');
        } else {
          const opts: ldap.SearchOptions = {
            filter: `(&(sAMAccountName=${username}))`,
            scope: 'sub',
            attributes: ['dn', 'sn', 'cn', 'sAMAccountName'],
          };

          client.search(
            process.env.LDAP_BASE_DN_VALIDATION as string,
            opts,
            (err, res) => {
              if (err) {
                reject(`User ${username} LDAP search error`);
              } else {
                res.on('searchRequest', (searchRequest) => {
                  //console.log('searchRequest: ', searchRequest.messageID);
                });
                res.on('searchEntry', (entry) => {
                  entries.push(entry);

                  client.bind(entry.dn, password, (err, res) => {
                    if (err) {
                      reject(`User ${username} username or password problem`);
                    } else {
                      resolve(true);
                    }
                  });
                });
                res.on('searchReference', (referral) => {
                  //console.log('referral: ' + referral.uris.join());
                });
                res.on('error', (err) => {
                  reject('LDAP SEARCH error');
                });
                res.on('end', (result) => {
                  if (entries.length == 0) {
                    reject(`User ${username} username or password problem`);
                  }
                });
              }
            }
          );
        }
      }
    );
  });
}

async function authenticate(username: string, password: string) {
  const client = ldap.createClient({
    url: process.env.LDAP_HOST_ROLES as string,
  });

  client.on('error', (err) => {
    console.log('ldap err', err);
  });

  let rights: string[];

  return new Promise(async (resolve, reject) => {
    try {
      await validate(username, password);
      let roles = await searchAdForRoles(username, client);
      rights = await updateUserRolesAndGetRights(username, roles);
    } catch (error) {
      reject(error);
    }
    resolve(rights);
  });
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

      let roles = await searchAdForRoles(user.username);
      let rights = await updateUserRolesAndGetRights(user.username, roles);

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
          algorithm: 'HS512',
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
      let encodedToken = '';
      if (token) {
        const { exp, iat, ...rest } = token;

        encodedToken = jsonwebtoken.sign(rest, secret, {
          expiresIn: parseInt(process.env.TOKEN_REFRESH_PERIOD),
          algorithm: 'HS512',
        });
      } else {
        console.log('TOKEN EMPTY. SO, LOGOUT!...');
        return '';
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
    strategy: 'jwt',
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
      name: 'LDAP',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        if (!username || !password) {
          throw new Error('enter username or password');
        }
        try {
          let token = await authAndCreateToken(username, password);
          return token;
        } catch (error) {
          console.log(error);
          throw new Error('Authentication error');
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
