import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MyAlert from "components/alert";
import { getToken } from "next-auth/jwt";
import React, { FC, useEffect, useState } from "react";
import { initializeApollo } from "src/apollo";
import { alertMessageVar } from "src/cache";
import { Queries } from "src/gql_definitions/queries";
import { GetServerSidePropsContext } from "next";
import {
  CountriesQuery,
  Country,
  CreateCityInput,
  useCountriesQuery,
  useCreateCityMutation,
} from "src/graphql/types";
import { useSession, getSession } from "next-auth/react";
import { method } from "lodash";
import { NormalizedCache } from "@apollo/client";
import { createTempToken } from "helpers/AuthHelper";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

type AddCityType = {
  initialApolloState: NormalizedCache;
  alertMessage: string;
};

const AddCity: FC<AddCityType> = (props) => {
  const { alertMessage } = props;
  const {
    data: { countries },
    loading,
    error,
  } = useCountriesQuery();
  const { data: session, status } = useSession();
  const [
    createCity,
    {
      data: createCityData,
      loading: createCityLoading,
      error: createCityError,
    },
  ] = useCreateCityMutation();

  const [cityData, setCityData] = useState<CreateCityInput>({
    name: "",
    population: undefined,
    countryId: 0,
  });

  const CreateHandler = async () => {
    createCity({
      variables: {
        input: { ...cityData },
      },
    });
  };

  useEffect(() => {
    createCityData &&
      alertMessageVar({ severity: "success", message: "success" });
    createCityLoading &&
      alertMessageVar({ severity: "info", message: "progress..." });
    createCityError &&
      alertMessageVar({ severity: "error", message: "error :-(" });
  }, [createCityData, createCityLoading, createCityError]);

  useEffect(() => {
    alertMessageVar(undefined);
  }, []);

  return (
    <>
      <h1>Add City</h1>
      <Grid container direction="column" spacing={2} sx={{ width: "500px" }}>
        <Grid item>
          <TextField
            label="City name"
            value={cityData.name}
            onChange={(e) => setCityData({ ...cityData, name: e.target.value })}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Population"
            value={cityData.population}
            onChange={(e) => {
              let population = e.target.value
                ? Number(e.target.value)
                : undefined;

              setCityData({
                ...cityData,
                population,
              });
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" sx={{ minWidth: 220 }}>
            <InputLabel>Country</InputLabel>
            <Select
              value={cityData.countryId}
              label="Country"
              onChange={(e) =>
                setCityData({
                  ...cityData,
                  countryId: e.target.value as number,
                })
              }
            >
              {countries.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={CreateHandler}>
            Create
          </Button>
        </Grid>
        <Grid item>
          <MyAlert />
        </Grid>
      </Grid>
    </>
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
    fetchPolicy: "network-only",
  });

  let normCache = apolloClient.cache.extract();

  return {
    props: {
      initialApolloState: normCache,
    },
  };
}

export default AddCity;
