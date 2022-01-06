import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  logIn?: Maybe<User>;
  signUp?: Maybe<User>;
};

export type MutationLogInArgs = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type MutationSignUpArgs = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserSignUpInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;

export type MutationMutation = {
  __typename?: 'Mutation';
  logIn?:
    | {
        __typename?: 'User';
        username?: string | null | undefined;
        id?: number | null | undefined;
      }
    | null
    | undefined;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: 'Query';
  currentUser: {
    __typename?: 'User';
    username?: string | null | undefined;
    id?: number | null | undefined;
  };
};

export const MutationDocument = `
    mutation Mutation($username: String, $password: String) {
  logIn(username: $username, password: $password) {
    username
    id
  }
}
    `;
export const useMutationMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    MutationMutation,
    TError,
    MutationMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<MutationMutation, TError, MutationMutationVariables, TContext>(
    'Mutation',
    (variables?: MutationMutationVariables) =>
      fetcher<MutationMutation, MutationMutationVariables>(
        client,
        MutationDocument,
        variables,
        headers
      )(),
    options
  );
export const CurrentUserDocument = `
    query CurrentUser {
  currentUser {
    username
    id
  }
}
    `;
export const useCurrentUserQuery = <TData = CurrentUserQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: CurrentUserQueryVariables,
  options?: UseQueryOptions<CurrentUserQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<CurrentUserQuery, TError, TData>(
    variables === undefined ? ['CurrentUser'] : ['CurrentUser', variables],
    fetcher<CurrentUserQuery, CurrentUserQueryVariables>(
      client,
      CurrentUserDocument,
      variables,
      headers
    ),
    options
  );
