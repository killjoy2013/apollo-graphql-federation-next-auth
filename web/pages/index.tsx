import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import {
  unstable_getServerSession as getServerSession,
  Session,
} from "next-auth";
import { useSession, getSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

const Homepage = () => {
  return (
    <Grid container direction="column" justifyContent="space-between">
      <Grid item>
        <Typography variant="h4">Home Page</Typography>
      </Grid>
    </Grid>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req } = ctx;
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permenant: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default Homepage;
