import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import MyAlert from 'components/alert';
import { getServerSession, Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import React, { FC, useCallback, useEffect } from 'react';
import { initializeApollo } from 'src/apollo';
import { alertMessageVar } from 'src/cache';
import { Queries } from 'src/gql_definitions/queries';
import {
  CountriesQuery,
  useCountriesQuery,
  useRemoveCountryMutation,
} from 'src/graphql/types';
import { NormalizedCache } from '@apollo/client';
import { authOptions } from './api/auth/[...nextauth]';
import { createTempToken } from 'helpers/AuthHelper';

interface SessionWithRightsType extends Session {
  rights: string[];
}

type CountriesType = {
  initialApolloState: NormalizedCache;
  rights: string[];
};

const Countries: FC<CountriesType> = (props) => {
  const { rights } = props;

  const { data, loading, error } = useCountriesQuery();
  const { data: session, status } = useSession();

  const [removeCountry] = useRemoveCountryMutation({
    update(cache, { data: { removeCountry: removedId } }) {
      cache.evict({ id: `Country:${removedId}` });
      cache.gc;

      // const { countries: oldCountries } = cache.readQuery<CountriesQuery>({
      //   query: Queries.COUNTRIES,
      // });

      // cache.writeQuery<CountriesQuery>({
      //   query: Queries.COUNTRIES,
      //   data: {
      //     countries: oldCountries.filter((f) => f.id != removedId),
      //   },
      // });
    },
  });
  useEffect(() => {
    alertMessageVar(undefined);
  }, []);

  const displayDelete = useCallback(
    (countryId: number) => {
      if (rights.includes('removeCountry')) {
        return (
          <IconButton
            onClick={async () => {
              try {
                await removeCountry({
                  variables: {
                    id: countryId,
                  },
                });
              } catch (error) {}
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      } else {
        return null;
      }
    },
    [session]
  );

  return (
    <>
      <h1>Countries</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Continent</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.countries.map((country) => (
            <TableRow key={country.id}>
              <TableCell>{country.name}</TableCell>
              <TableCell>{country.continent}</TableCell>
              <TableCell>{displayDelete(country.id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MyAlert />
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const session = await getServerSession(ctx, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permenant: false,
      },
    };
  }

  const { username, rights, accessTokenExpires } = session;
  const token = createTempToken({ username, rights, accessTokenExpires });
  const cookie = `next-auth.session-token=${token}`;

  const apolloClient = initializeApollo();
  await apolloClient.query<CountriesQuery>({
    query: Queries.COUNTRIES,
    context: {
      headers: {
        cookie,
      },
    },
    fetchPolicy: 'network-only',
  });

  let normCache = apolloClient.cache.extract();

  return {
    props: {
      initialApolloState: normCache,
      rights,
    },
  };
}

export default Countries;
