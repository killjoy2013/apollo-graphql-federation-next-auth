import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';
import { getServerSession, Session } from 'next-auth';
import { useSession, getSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';

const Homepage = () => {
  return (
    <Grid container direction="column" justifyContent="space-between">
      <Grid item>
        <Typography variant="h4">Home Page</Typography>
      </Grid>
    </Grid>
  );
};

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  const session = await getServerSession(ctx, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permenant: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default Homepage;
