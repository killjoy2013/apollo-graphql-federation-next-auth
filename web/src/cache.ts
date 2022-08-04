import { InMemoryCache, makeVar } from '@apollo/client';
import { AlertColor } from '@mui/material/Alert';
import { City, Country } from './graphql/types';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        countries: {
          read: (countries: Country[], { canRead, toReference }) => {
            if (countries) {
              return countries.filter((country) => {
                return canRead(country);
              });
            } else {
              return [];
            }
          },
          merge: (existing, incoming) => {
            return incoming;
          },
        },
        cities: {
          read: (cities: City[], { canRead, toReference }) => {
            if (cities) {
              return cities.filter((city) => {
                return canRead(city);
              });
            } else {
              return [];
            }
          },
          merge: (existing, incoming) => {
            return incoming;
          },
        },
      },
    },
  },
});

export const cityParamVar = makeVar<string>('');

export type MessageType = {
  severity: AlertColor;
  message: string;
};

export const alertMessageVar = makeVar<MessageType>(undefined);
