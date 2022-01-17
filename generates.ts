import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type DataPost = {
  __typename?: 'DataPost';
  author?: Maybe<User>;
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  file_?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  title?: Maybe<Scalars['String']>;
};

export type Film = {
  __typename?: 'Film';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Lube = {
  __typename?: 'Lube';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Id>;
  logIn?: Maybe<User>;
  logOut?: Maybe<User>;
  signUp?: Maybe<User>;
};


export type MutationCreatePostArgs = {
  post?: InputMaybe<PostInput>;
};


export type MutationLogInArgs = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationSignUpArgs = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  description?: Maybe<Scalars['String']>;
  file_?: Maybe<Scalars['String']>;
  film?: Maybe<Scalars['String']>;
  lube?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type PostInput = {
  description?: InputMaybe<Scalars['String']>;
  file_?: InputMaybe<Scalars['String']>;
  film?: InputMaybe<Scalars['String']>;
  lube?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  getFilms?: Maybe<Array<Maybe<Film>>>;
  getLubes?: Maybe<Array<Maybe<Lube>>>;
  getPosts?: Maybe<Array<Maybe<DataPost>>>;
  test?: Maybe<Scalars['String']>;
  tester?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  film?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lube?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Id = {
  __typename?: 'id';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type UserSignUpInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type GetFilmsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilmsQuery = { __typename?: 'Query', getFilms?: Array<{ __typename?: 'Film', id?: number | null | undefined, name?: string | null | undefined } | null | undefined> | null | undefined };

export type GetLubesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLubesQuery = { __typename?: 'Query', getLubes?: Array<{ __typename?: 'Lube', id?: number | null | undefined, name?: string | null | undefined } | null | undefined> | null | undefined };

export type LogInMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn?: { __typename?: 'User', username?: string | null | undefined, id?: string | null | undefined } | null | undefined };

export type SignUpMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp?: { __typename?: 'User', username?: string | null | undefined, id?: string | null | undefined } | null | undefined };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut?: { __typename?: 'User', id?: string | null | undefined, username?: string | null | undefined } | null | undefined };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', username?: string | null | undefined, id?: string | null | undefined } };

export type CreatePostMutationVariables = Exact<{
  post?: InputMaybe<PostInput>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'id', id?: string | null | undefined, title?: string | null | undefined } | null | undefined };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts?: Array<{ __typename?: 'DataPost', id?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, file_?: string | null | undefined, createdAt?: any | null | undefined, tags?: Array<{ __typename?: 'Tag', type?: string | null | undefined, lube?: string | null | undefined, film?: string | null | undefined } | null | undefined> | null | undefined, author?: { __typename?: 'User', username?: string | null | undefined, id?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };


export const GetFilmsDocument = `
    query GetFilms {
  getFilms {
    id
    name
  }
}
    `;
export const useGetFilmsQuery = <
      TData = GetFilmsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetFilmsQueryVariables,
      options?: UseQueryOptions<GetFilmsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetFilmsQuery, TError, TData>(
      variables === undefined ? ['GetFilms'] : ['GetFilms', variables],
      fetcher<GetFilmsQuery, GetFilmsQueryVariables>(client, GetFilmsDocument, variables, headers),
      options
    );
export const GetLubesDocument = `
    query GetLubes {
  getLubes {
    id
    name
  }
}
    `;
export const useGetLubesQuery = <
      TData = GetLubesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetLubesQueryVariables,
      options?: UseQueryOptions<GetLubesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetLubesQuery, TError, TData>(
      variables === undefined ? ['GetLubes'] : ['GetLubes', variables],
      fetcher<GetLubesQuery, GetLubesQueryVariables>(client, GetLubesDocument, variables, headers),
      options
    );
export const LogInDocument = `
    mutation LogIn($username: String, $password: String) {
  logIn(username: $username, password: $password) {
    username
    id
  }
}
    `;
export const useLogInMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogInMutation, TError, LogInMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogInMutation, TError, LogInMutationVariables, TContext>(
      'LogIn',
      (variables?: LogInMutationVariables) => fetcher<LogInMutation, LogInMutationVariables>(client, LogInDocument, variables, headers)(),
      options
    );
export const SignUpDocument = `
    mutation SignUp($username: String, $password: String) {
  signUp(username: $username, password: $password) {
    username
    id
  }
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      'SignUp',
      (variables?: SignUpMutationVariables) => fetcher<SignUpMutation, SignUpMutationVariables>(client, SignUpDocument, variables, headers)(),
      options
    );
export const LogOutDocument = `
    mutation LogOut {
  logOut {
    id
    username
  }
}
    `;
export const useLogOutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogOutMutation, TError, LogOutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogOutMutation, TError, LogOutMutationVariables, TContext>(
      'LogOut',
      (variables?: LogOutMutationVariables) => fetcher<LogOutMutation, LogOutMutationVariables>(client, LogOutDocument, variables, headers)(),
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
export const useCurrentUserQuery = <
      TData = CurrentUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CurrentUserQueryVariables,
      options?: UseQueryOptions<CurrentUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CurrentUserQuery, TError, TData>(
      variables === undefined ? ['CurrentUser'] : ['CurrentUser', variables],
      fetcher<CurrentUserQuery, CurrentUserQueryVariables>(client, CurrentUserDocument, variables, headers),
      options
    );
export const CreatePostDocument = `
    mutation CreatePost($post: PostInput) {
  createPost(post: $post) {
    id
    title
  }
}
    `;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      'CreatePost',
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
      options
    );
export const GetPostsDocument = `
    query GetPosts {
  getPosts {
    id
    title
    description
    file_
    tags {
      type
      lube
      film
    }
    createdAt
    author {
      username
      id
    }
  }
}
    `;
export const useGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetPostsQueryVariables,
      options?: UseQueryOptions<GetPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostsQuery, TError, TData>(
      variables === undefined ? ['GetPosts'] : ['GetPosts', variables],
      fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, variables, headers),
      options
    );