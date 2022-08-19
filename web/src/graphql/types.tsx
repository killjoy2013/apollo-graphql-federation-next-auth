/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  join__FieldSet: any;
  _FieldSet: any;
};










export type Address = {
  __typename?: 'Address';
  city: City;
  detail: Scalars['String'];
  id: Scalars['Int'];
  personId: Scalars['Int'];
};

export type City = {
  __typename?: 'City';
  id: Scalars['Int'];
  name: Scalars['String'];
  persons?: Maybe<Array<Person>>;
  population?: Maybe<Scalars['Int']>;
  restaurants?: Maybe<Array<Restaurant>>;
  touristic?: Maybe<Scalars['Boolean']>;
};

export enum Continent {
  Africa = 'Africa',
  America = 'America',
  Asia = 'Asia',
  Europe = 'Europe'
}

export type Country = {
  __typename?: 'Country';
  capital: City;
  cities?: Maybe<Array<City>>;
  continent?: Maybe<Continent>;
  id: Scalars['Int'];
  name: Scalars['String'];
  population?: Maybe<Scalars['Int']>;
  treaties?: Maybe<Array<Treaty>>;
};

export type CreateAddressInput = {
  cityId: Scalars['Int'];
  detail: Scalars['String'];
};

export type CreateCityInput = {
  countryId: Scalars['Int'];
  name: Scalars['String'];
  population?: Maybe<Scalars['Int']>;
};

export type CreateCountryInput = {
  continent?: Maybe<Continent>;
  name: Scalars['String'];
  population?: Maybe<Scalars['Int']>;
};

export type CreateHobbyInput = {
  cityId: Scalars['Int'];
  difficulty: Difficulty;
  name: Scalars['String'];
};

export type CreateMealInput = {
  name: Scalars['String'];
};

export type CreatePersonInput = {
  address: CreateAddressInput;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  occupation: Scalars['String'];
};

export type CreateRestaurantInput = {
  cityId: Scalars['Int'];
  name: Scalars['String'];
  priceRange: PriceRange;
};

export type CreateRightInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateRoleInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateTreatyInput = {
  name: Scalars['String'];
};

export type CreateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userName: Scalars['String'];
};

export enum Difficulty {
  Difficult = 'Difficult',
  Easy = 'Easy',
  Moderate = 'Moderate'
}

export type Hobby = {
  __typename?: 'Hobby';
  difficulty?: Maybe<Difficulty>;
  id: Scalars['Int'];
  name: Scalars['String'];
  persons?: Maybe<Array<Person>>;
};

export type Meal = {
  __typename?: 'Meal';
  id: Scalars['Int'];
  name: Scalars['String'];
  restaurants?: Maybe<Array<Restaurant>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCountryToTreaty: Country;
  assignRightToRole: Scalars['String'];
  assignRoleToUser: Scalars['String'];
  createCity: City;
  createCountry: Country;
  createHobby: Hobby;
  createMeal: Meal;
  createPerson: Person;
  createRestaurant: Restaurant;
  createRight: Right;
  createRole: Role;
  createTreaty: Treaty;
  createUser: User;
  removeCity?: Maybe<Scalars['Int']>;
  removeCountry?: Maybe<Scalars['Int']>;
  removeCountryFromTreaty: Country;
  removeHobby?: Maybe<Scalars['Int']>;
  removeMeal?: Maybe<Scalars['Int']>;
  removePerson?: Maybe<Scalars['Int']>;
  removeRestaurant?: Maybe<Scalars['Int']>;
  removeRight: Scalars['Int'];
  removeRole: Scalars['Int'];
  removeTreaty: Treaty;
  removeUser: Scalars['Int'];
  revokeAllRolesFromUser: Scalars['String'];
  revokeRightFromRole: Scalars['String'];
  revokeRoleFromUser: Scalars['String'];
  updateCity: City;
  updateCountry: Country;
  updateMeal: Meal;
  updateRestaurant: Restaurant;
  updateRight: Right;
  updateRole: Role;
  updateTreaty: Treaty;
  updateUser: User;
};


export type MutationAddCountryToTreatyArgs = {
  countryId: Scalars['Int'];
  treatyId: Scalars['Int'];
};


export type MutationAssignRightToRoleArgs = {
  rightName: Scalars['String'];
  roleName: Scalars['String'];
};


export type MutationCreateCityArgs = {
  input: CreateCityInput;
};


export type MutationCreateCountryArgs = {
  input: CreateCountryInput;
};


export type MutationCreateHobbyArgs = {
  input: CreateHobbyInput;
};


export type MutationCreateMealArgs = {
  input: CreateMealInput;
};


export type MutationCreatePersonArgs = {
  input: CreatePersonInput;
};


export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};


export type MutationCreateRightArgs = {
  createRightInput: CreateRightInput;
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationCreateTreatyArgs = {
  input: CreateTreatyInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveCityArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCountryArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCountryFromTreatyArgs = {
  countryId: Scalars['Int'];
  treatyId: Scalars['Int'];
};


export type MutationRemoveHobbyArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveMealArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePersonArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveRestaurantArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveRightArgs = {
  id: Scalars['Float'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['Float'];
};


export type MutationRemoveTreatyArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Float'];
};


export type MutationRevokeRightFromRoleArgs = {
  rightName: Scalars['String'];
  roleName: Scalars['String'];
};


export type MutationUpdateCityArgs = {
  input: UpdateCityInput;
};


export type MutationUpdateCountryArgs = {
  input: UpdateCountryInput;
};


export type MutationUpdateMealArgs = {
  input: UpdateMealInput;
};


export type MutationUpdateRestaurantArgs = {
  input: UpdateRestaurantInput;
};


export type MutationUpdateRightArgs = {
  updateRightInput: UpdateRightInput;
};


export type MutationUpdateRoleArgs = {
  updateRoleInput: UpdateRoleInput;
};


export type MutationUpdateTreatyArgs = {
  input: UpdateTreatyInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Person = {
  __typename?: 'Person';
  addresses?: Maybe<Array<Address>>;
  firstName: Scalars['String'];
  hobbies?: Maybe<Array<Hobby>>;
  id: Scalars['Int'];
  lastName: Scalars['String'];
  occupation: Scalars['String'];
};

export enum PriceRange {
  Cheap = 'Cheap',
  Expensive = 'Expensive',
  Luxury = 'Luxury',
  Moderate = 'Moderate'
}

export type Query = {
  __typename?: 'Query';
  cities: Array<City>;
  city: City;
  countries: Array<Country>;
  findOne: Country;
  hobbies: Array<Hobby>;
  hobby: Hobby;
  meal: Meal;
  meals: Array<Meal>;
  person: Person;
  persons: Array<Person>;
  restaurant: Restaurant;
  restaurants: Array<Restaurant>;
  right: Right;
  rights: Array<Right>;
  role: Role;
  roles: Array<Role>;
  treaties: Array<Treaty>;
  treaty: Treaty;
  user: User;
  users: Array<User>;
};


export type QueryCitiesArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryCityArgs = {
  id: Scalars['Int'];
};


export type QueryFindOneArgs = {
  id: Scalars['Int'];
};


export type QueryHobbiesArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryHobbyArgs = {
  id: Scalars['Int'];
};


export type QueryMealArgs = {
  id: Scalars['Int'];
};


export type QueryMealsArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryPersonArgs = {
  id: Scalars['Int'];
};


export type QueryPersonsArgs = {
  firstName?: Maybe<Scalars['String']>;
};


export type QueryRestaurantArgs = {
  id: Scalars['Int'];
};


export type QueryRestaurantsArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryRightArgs = {
  id: Scalars['Float'];
};


export type QueryRightsArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryRoleArgs = {
  id: Scalars['Float'];
};


export type QueryRolesArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryTreatyArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryUsersArgs = {
  userName?: Maybe<Scalars['String']>;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  city: City;
  cityId: Scalars['Float'];
  id: Scalars['Int'];
  meals?: Maybe<Array<Meal>>;
  name: Scalars['String'];
  priceRange?: Maybe<PriceRange>;
};

export type Right = {
  __typename?: 'Right';
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  roles?: Maybe<Array<Role>>;
};

export type Role = {
  __typename?: 'Role';
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  rights?: Maybe<Array<Right>>;
  users?: Maybe<Array<User>>;
};

export type Treaty = {
  __typename?: 'Treaty';
  countries?: Maybe<Array<Country>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UpdateCityInput = {
  countryId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  population?: Maybe<Scalars['Int']>;
};

export type UpdateCountryInput = {
  continent?: Maybe<Continent>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  population?: Maybe<Scalars['Int']>;
};

export type UpdateMealInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateRestaurantInput = {
  cityId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  priceRange?: Maybe<PriceRange>;
};

export type UpdateRightInput = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateTreatyInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  refreshToken: Scalars['String'];
  roles?: Maybe<Array<Role>>;
  userName: Scalars['String'];
};

export enum Core__Purpose {
  /** `EXECUTION` features provide metadata necessary to for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}


export enum Join__Graph {
  Auth = 'AUTH',
  Country = 'COUNTRY',
  Food = 'FOOD',
  People = 'PEOPLE'
}


export type CreateCityMutationVariables = Exact<{
  input: CreateCityInput;
}>;


export type CreateCityMutation = (
  { __typename?: 'Mutation' }
  & { createCity: (
    { __typename?: 'City' }
    & Pick<City, 'id' | 'name' | 'touristic' | 'population'>
  ) }
);

export type CreateCountryMutationVariables = Exact<{
  input: CreateCountryInput;
}>;


export type CreateCountryMutation = (
  { __typename?: 'Mutation' }
  & { createCountry: (
    { __typename?: 'Country' }
    & Pick<Country, 'id' | 'name' | 'continent' | 'population'>
  ) }
);

export type RemoveCountryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveCountryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCountry'>
);

export type RemoveCityMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveCityMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCity'>
);

export type CitiesQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
}>;


export type CitiesQuery = (
  { __typename?: 'Query' }
  & { cities: Array<(
    { __typename?: 'City' }
    & Pick<City, 'id' | 'name'>
    & { persons?: Maybe<Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'firstName' | 'occupation'>
    )>>, restaurants?: Maybe<Array<(
      { __typename?: 'Restaurant' }
      & Pick<Restaurant, 'name' | 'priceRange'>
    )>> }
  )> }
);

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = (
  { __typename?: 'Query' }
  & { countries: Array<(
    { __typename?: 'Country' }
    & Pick<Country, 'id' | 'name' | 'continent'>
  )> }
);


export const CreateCityDocument = gql`
    mutation createCity($input: CreateCityInput!) {
  createCity(input: $input) {
    id
    name
    touristic
    population
  }
}
    `;
export type CreateCityMutationFn = Apollo.MutationFunction<CreateCityMutation, CreateCityMutationVariables>;

/**
 * __useCreateCityMutation__
 *
 * To run a mutation, you first call `useCreateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCityMutation, { data, loading, error }] = useCreateCityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCityMutation, CreateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCityMutation, CreateCityMutationVariables>(CreateCityDocument, options);
      }
export type CreateCityMutationHookResult = ReturnType<typeof useCreateCityMutation>;
export type CreateCityMutationResult = Apollo.MutationResult<CreateCityMutation>;
export type CreateCityMutationOptions = Apollo.BaseMutationOptions<CreateCityMutation, CreateCityMutationVariables>;
export const CreateCountryDocument = gql`
    mutation createCountry($input: CreateCountryInput!) {
  createCountry(input: $input) {
    id
    name
    continent
    population
  }
}
    `;
export type CreateCountryMutationFn = Apollo.MutationFunction<CreateCountryMutation, CreateCountryMutationVariables>;

/**
 * __useCreateCountryMutation__
 *
 * To run a mutation, you first call `useCreateCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCountryMutation, { data, loading, error }] = useCreateCountryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCountryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCountryMutation, CreateCountryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCountryMutation, CreateCountryMutationVariables>(CreateCountryDocument, options);
      }
export type CreateCountryMutationHookResult = ReturnType<typeof useCreateCountryMutation>;
export type CreateCountryMutationResult = Apollo.MutationResult<CreateCountryMutation>;
export type CreateCountryMutationOptions = Apollo.BaseMutationOptions<CreateCountryMutation, CreateCountryMutationVariables>;
export const RemoveCountryDocument = gql`
    mutation removeCountry($id: Int!) {
  removeCountry(id: $id)
}
    `;
export type RemoveCountryMutationFn = Apollo.MutationFunction<RemoveCountryMutation, RemoveCountryMutationVariables>;

/**
 * __useRemoveCountryMutation__
 *
 * To run a mutation, you first call `useRemoveCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCountryMutation, { data, loading, error }] = useRemoveCountryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCountryMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCountryMutation, RemoveCountryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCountryMutation, RemoveCountryMutationVariables>(RemoveCountryDocument, options);
      }
export type RemoveCountryMutationHookResult = ReturnType<typeof useRemoveCountryMutation>;
export type RemoveCountryMutationResult = Apollo.MutationResult<RemoveCountryMutation>;
export type RemoveCountryMutationOptions = Apollo.BaseMutationOptions<RemoveCountryMutation, RemoveCountryMutationVariables>;
export const RemoveCityDocument = gql`
    mutation removeCity($id: Int!) {
  removeCity(id: $id)
}
    `;
export type RemoveCityMutationFn = Apollo.MutationFunction<RemoveCityMutation, RemoveCityMutationVariables>;

/**
 * __useRemoveCityMutation__
 *
 * To run a mutation, you first call `useRemoveCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCityMutation, { data, loading, error }] = useRemoveCityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCityMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCityMutation, RemoveCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCityMutation, RemoveCityMutationVariables>(RemoveCityDocument, options);
      }
export type RemoveCityMutationHookResult = ReturnType<typeof useRemoveCityMutation>;
export type RemoveCityMutationResult = Apollo.MutationResult<RemoveCityMutation>;
export type RemoveCityMutationOptions = Apollo.BaseMutationOptions<RemoveCityMutation, RemoveCityMutationVariables>;
export const CitiesDocument = gql`
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

/**
 * __useCitiesQuery__
 *
 * To run a query within a React component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitiesQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCitiesQuery(baseOptions?: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
      }
export function useCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
        }
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = Apollo.QueryResult<CitiesQuery, CitiesQueryVariables>;
export const CountriesDocument = gql`
    query countries {
  countries {
    id
    name
    continent
  }
}
    `;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountriesQuery(baseOptions?: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
      }
export function useCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
        }
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = Apollo.QueryResult<CountriesQuery, CountriesQueryVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  City: ResolverTypeWrapper<City>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Continent: Continent;
  Country: ResolverTypeWrapper<Country>;
  CreateAddressInput: CreateAddressInput;
  CreateCityInput: CreateCityInput;
  CreateCountryInput: CreateCountryInput;
  CreateHobbyInput: CreateHobbyInput;
  CreateMealInput: CreateMealInput;
  CreatePersonInput: CreatePersonInput;
  CreateRestaurantInput: CreateRestaurantInput;
  CreateRightInput: CreateRightInput;
  CreateRoleInput: CreateRoleInput;
  CreateTreatyInput: CreateTreatyInput;
  CreateUserInput: CreateUserInput;
  Difficulty: Difficulty;
  Hobby: ResolverTypeWrapper<Hobby>;
  Meal: ResolverTypeWrapper<Meal>;
  Mutation: ResolverTypeWrapper<{}>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Person: ResolverTypeWrapper<Person>;
  PriceRange: PriceRange;
  Query: ResolverTypeWrapper<{}>;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  Right: ResolverTypeWrapper<Right>;
  Role: ResolverTypeWrapper<Role>;
  Treaty: ResolverTypeWrapper<Treaty>;
  UpdateCityInput: UpdateCityInput;
  UpdateCountryInput: UpdateCountryInput;
  UpdateMealInput: UpdateMealInput;
  UpdateRestaurantInput: UpdateRestaurantInput;
  UpdateRightInput: UpdateRightInput;
  UpdateRoleInput: UpdateRoleInput;
  UpdateTreatyInput: UpdateTreatyInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  core__Purpose: Core__Purpose;
  join__FieldSet: ResolverTypeWrapper<Scalars['join__FieldSet']>;
  join__Graph: Join__Graph;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  String: Scalars['String'];
  Int: Scalars['Int'];
  City: City;
  Boolean: Scalars['Boolean'];
  Country: Country;
  CreateAddressInput: CreateAddressInput;
  CreateCityInput: CreateCityInput;
  CreateCountryInput: CreateCountryInput;
  CreateHobbyInput: CreateHobbyInput;
  CreateMealInput: CreateMealInput;
  CreatePersonInput: CreatePersonInput;
  CreateRestaurantInput: CreateRestaurantInput;
  CreateRightInput: CreateRightInput;
  CreateRoleInput: CreateRoleInput;
  CreateTreatyInput: CreateTreatyInput;
  CreateUserInput: CreateUserInput;
  Hobby: Hobby;
  Meal: Meal;
  Mutation: {};
  Float: Scalars['Float'];
  Person: Person;
  Query: {};
  Restaurant: Restaurant;
  Right: Right;
  Role: Role;
  Treaty: Treaty;
  UpdateCityInput: UpdateCityInput;
  UpdateCountryInput: UpdateCountryInput;
  UpdateMealInput: UpdateMealInput;
  UpdateRestaurantInput: UpdateRestaurantInput;
  UpdateRightInput: UpdateRightInput;
  UpdateRoleInput: UpdateRoleInput;
  UpdateTreatyInput: UpdateTreatyInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  join__FieldSet: Scalars['join__FieldSet'];
};

export type CoreDirectiveArgs = {   as?: Maybe<Scalars['String']>;
  feature: Scalars['String'];
  for?: Maybe<Core__Purpose>; };

export type CoreDirectiveResolver<Result, Parent, ContextType = any, Args = CoreDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Join__FieldDirectiveArgs = {   graph?: Maybe<Join__Graph>;
  provides?: Maybe<Scalars['join__FieldSet']>;
  requires?: Maybe<Scalars['join__FieldSet']>; };

export type Join__FieldDirectiveResolver<Result, Parent, ContextType = any, Args = Join__FieldDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Join__GraphDirectiveArgs = {   name: Scalars['String'];
  url: Scalars['String']; };

export type Join__GraphDirectiveResolver<Result, Parent, ContextType = any, Args = Join__GraphDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Join__OwnerDirectiveArgs = {   graph: Join__Graph; };

export type Join__OwnerDirectiveResolver<Result, Parent, ContextType = any, Args = Join__OwnerDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Join__TypeDirectiveArgs = {   graph: Join__Graph;
  key?: Maybe<Scalars['join__FieldSet']>; };

export type Join__TypeDirectiveResolver<Result, Parent, ContextType = any, Args = Join__TypeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  city?: Resolver<ResolversTypes['City'], ParentType, ContextType>;
  detail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  personId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CityResolvers<ContextType = any, ParentType extends ResolversParentTypes['City'] = ResolversParentTypes['City']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  persons?: Resolver<Maybe<Array<ResolversTypes['Person']>>, ParentType, ContextType>;
  population?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  restaurants?: Resolver<Maybe<Array<ResolversTypes['Restaurant']>>, ParentType, ContextType>;
  touristic?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  capital?: Resolver<ResolversTypes['City'], ParentType, ContextType>;
  cities?: Resolver<Maybe<Array<ResolversTypes['City']>>, ParentType, ContextType>;
  continent?: Resolver<Maybe<ResolversTypes['Continent']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  population?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  treaties?: Resolver<Maybe<Array<ResolversTypes['Treaty']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HobbyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hobby'] = ResolversParentTypes['Hobby']> = {
  difficulty?: Resolver<Maybe<ResolversTypes['Difficulty']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  persons?: Resolver<Maybe<Array<ResolversTypes['Person']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MealResolvers<ContextType = any, ParentType extends ResolversParentTypes['Meal'] = ResolversParentTypes['Meal']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  restaurants?: Resolver<Maybe<Array<ResolversTypes['Restaurant']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addCountryToTreaty?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationAddCountryToTreatyArgs, 'countryId' | 'treatyId'>>;
  assignRightToRole?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationAssignRightToRoleArgs, 'rightName' | 'roleName'>>;
  assignRoleToUser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationCreateCityArgs, 'input'>>;
  createCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationCreateCountryArgs, 'input'>>;
  createHobby?: Resolver<ResolversTypes['Hobby'], ParentType, ContextType, RequireFields<MutationCreateHobbyArgs, 'input'>>;
  createMeal?: Resolver<ResolversTypes['Meal'], ParentType, ContextType, RequireFields<MutationCreateMealArgs, 'input'>>;
  createPerson?: Resolver<ResolversTypes['Person'], ParentType, ContextType, RequireFields<MutationCreatePersonArgs, 'input'>>;
  createRestaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<MutationCreateRestaurantArgs, 'input'>>;
  createRight?: Resolver<ResolversTypes['Right'], ParentType, ContextType, RequireFields<MutationCreateRightArgs, 'createRightInput'>>;
  createRole?: Resolver<ResolversTypes['Role'], ParentType, ContextType, RequireFields<MutationCreateRoleArgs, 'createRoleInput'>>;
  createTreaty?: Resolver<ResolversTypes['Treaty'], ParentType, ContextType, RequireFields<MutationCreateTreatyArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createUserInput'>>;
  removeCity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveCityArgs, 'id'>>;
  removeCountry?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveCountryArgs, 'id'>>;
  removeCountryFromTreaty?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationRemoveCountryFromTreatyArgs, 'countryId' | 'treatyId'>>;
  removeHobby?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveHobbyArgs, 'id'>>;
  removeMeal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveMealArgs, 'id'>>;
  removePerson?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemovePersonArgs, 'id'>>;
  removeRestaurant?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveRestaurantArgs, 'id'>>;
  removeRight?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationRemoveRightArgs, 'id'>>;
  removeRole?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationRemoveRoleArgs, 'id'>>;
  removeTreaty?: Resolver<ResolversTypes['Treaty'], ParentType, ContextType, RequireFields<MutationRemoveTreatyArgs, 'id'>>;
  removeUser?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationRemoveUserArgs, 'id'>>;
  revokeAllRolesFromUser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revokeRightFromRole?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRevokeRightFromRoleArgs, 'rightName' | 'roleName'>>;
  revokeRoleFromUser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updateCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationUpdateCityArgs, 'input'>>;
  updateCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationUpdateCountryArgs, 'input'>>;
  updateMeal?: Resolver<ResolversTypes['Meal'], ParentType, ContextType, RequireFields<MutationUpdateMealArgs, 'input'>>;
  updateRestaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<MutationUpdateRestaurantArgs, 'input'>>;
  updateRight?: Resolver<ResolversTypes['Right'], ParentType, ContextType, RequireFields<MutationUpdateRightArgs, 'updateRightInput'>>;
  updateRole?: Resolver<ResolversTypes['Role'], ParentType, ContextType, RequireFields<MutationUpdateRoleArgs, 'updateRoleInput'>>;
  updateTreaty?: Resolver<ResolversTypes['Treaty'], ParentType, ContextType, RequireFields<MutationUpdateTreatyArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateUserInput'>>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  addresses?: Resolver<Maybe<Array<ResolversTypes['Address']>>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hobbies?: Resolver<Maybe<Array<ResolversTypes['Hobby']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  occupation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cities?: Resolver<Array<ResolversTypes['City']>, ParentType, ContextType, RequireFields<QueryCitiesArgs, never>>;
  city?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<QueryCityArgs, 'id'>>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
  findOne?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<QueryFindOneArgs, 'id'>>;
  hobbies?: Resolver<Array<ResolversTypes['Hobby']>, ParentType, ContextType, RequireFields<QueryHobbiesArgs, never>>;
  hobby?: Resolver<ResolversTypes['Hobby'], ParentType, ContextType, RequireFields<QueryHobbyArgs, 'id'>>;
  meal?: Resolver<ResolversTypes['Meal'], ParentType, ContextType, RequireFields<QueryMealArgs, 'id'>>;
  meals?: Resolver<Array<ResolversTypes['Meal']>, ParentType, ContextType, RequireFields<QueryMealsArgs, never>>;
  person?: Resolver<ResolversTypes['Person'], ParentType, ContextType, RequireFields<QueryPersonArgs, 'id'>>;
  persons?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryPersonsArgs, never>>;
  restaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<QueryRestaurantArgs, 'id'>>;
  restaurants?: Resolver<Array<ResolversTypes['Restaurant']>, ParentType, ContextType, RequireFields<QueryRestaurantsArgs, never>>;
  right?: Resolver<ResolversTypes['Right'], ParentType, ContextType, RequireFields<QueryRightArgs, 'id'>>;
  rights?: Resolver<Array<ResolversTypes['Right']>, ParentType, ContextType, RequireFields<QueryRightsArgs, never>>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType, RequireFields<QueryRoleArgs, 'id'>>;
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<QueryRolesArgs, never>>;
  treaties?: Resolver<Array<ResolversTypes['Treaty']>, ParentType, ContextType>;
  treaty?: Resolver<ResolversTypes['Treaty'], ParentType, ContextType, RequireFields<QueryTreatyArgs, 'id'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
};

export type RestaurantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant']> = {
  city?: Resolver<ResolversTypes['City'], ParentType, ContextType>;
  cityId?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  meals?: Resolver<Maybe<Array<ResolversTypes['Meal']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priceRange?: Resolver<Maybe<ResolversTypes['PriceRange']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RightResolvers<ContextType = any, ParentType extends ResolversParentTypes['Right'] = ResolversParentTypes['Right']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<ResolversTypes['Role']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rights?: Resolver<Maybe<Array<ResolversTypes['Right']>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TreatyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Treaty'] = ResolversParentTypes['Treaty']> = {
  countries?: Resolver<Maybe<Array<ResolversTypes['Country']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<ResolversTypes['Role']>>, ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Join__FieldSetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['join__FieldSet'], any> {
  name: 'join__FieldSet';
}

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  City?: CityResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  Hobby?: HobbyResolvers<ContextType>;
  Meal?: MealResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  Right?: RightResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Treaty?: TreatyResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  join__FieldSet?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  core?: CoreDirectiveResolver<any, any, ContextType>;
  join__field?: Join__FieldDirectiveResolver<any, any, ContextType>;
  join__graph?: Join__GraphDirectiveResolver<any, any, ContextType>;
  join__owner?: Join__OwnerDirectiveResolver<any, any, ContextType>;
  join__type?: Join__TypeDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;