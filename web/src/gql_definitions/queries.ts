import gql from "graphql-tag";

const CITIES = gql`
  query cities($name: String) {
    cities(name: $name) {
      id
      name
      persons {
        firstName
        occupation
      }
      restaurants {
        name
        priceRange
      }
    }
  }
`;

const COUNTRIES = gql`
  query countries {
    countries {
      id
      name
      continent
    }
  }
`;

export const Queries = {
  CITIES,
  COUNTRIES,
};
