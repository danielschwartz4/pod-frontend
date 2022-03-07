import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addProjectInfo: ProjectInfoResponse;
  addProjectToPod: PodResponse;
  createPod: Pod;
  login: UserResponse;
  logout: Scalars["Boolean"];
  register: UserResponse;
  removeProjectFromPod: PodResponse;
  updateProjectPod: ProjectResponse;
};

export type MutationAddProjectInfoArgs = {
  projectOptions: ProjectInput;
};

export type MutationAddProjectToPodArgs = {
  id: Scalars["Float"];
  projectId: Scalars["Float"];
};

export type MutationCreatePodArgs = {
  cap: Scalars["Float"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  usernameOrEmail: Scalars["String"];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationRemoveProjectFromPodArgs = {
  id: Scalars["Float"];
  projectId: Scalars["Float"];
};

export type MutationUpdateProjectPodArgs = {
  id: Scalars["Float"];
  podId: Scalars["Float"];
};

export type Pod = {
  __typename?: "Pod";
  cap: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  id: Scalars["Int"];
  projectIds: Array<Scalars["Int"]>;
  updatedAt: Scalars["DateTime"];
  userIds: Array<Scalars["Int"]>;
};

export type PodResponse = {
  __typename?: "PodResponse";
  errors?: Maybe<Scalars["String"]>;
  pod?: Maybe<Pod>;
};

export type Project = {
  __typename?: "Project";
  createdAt: Scalars["DateTime"];
  groupSize: Scalars["Int"];
  id: Scalars["Int"];
  milestoneDates: Array<Scalars["String"]>;
  milestones: Array<Scalars["String"]>;
  overview: Scalars["String"];
  podId?: Maybe<Scalars["Int"]>;
  projectName: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  userId: Scalars["Int"];
};

export type ProjectInfoResponse = {
  __typename?: "ProjectInfoResponse";
  errors?: Maybe<Array<FieldError>>;
  project?: Maybe<Project>;
};

export type ProjectInput = {
  groupSize: Scalars["Float"];
  milestoneDates: Array<Scalars["String"]>;
  milestones: Array<Scalars["String"]>;
  overview: Scalars["String"];
  projectName: Scalars["String"];
  userId: Scalars["Float"];
};

export type ProjectResponse = {
  __typename?: "ProjectResponse";
  errors?: Maybe<Scalars["String"]>;
  project?: Maybe<Project>;
};

export type Query = {
  __typename?: "Query";
  findPod: PodResponse;
  hello: Scalars["String"];
  heyo: Scalars["String"];
  me?: Maybe<User>;
  pod?: Maybe<PodResponse>;
  project?: Maybe<ProjectResponse>;
  projects?: Maybe<Array<Project>>;
};

export type QueryFindPodArgs = {
  cap: Scalars["Float"];
  projectId: Scalars["Float"];
};

export type QueryPodArgs = {
  id: Scalars["Float"];
};

export type QueryProjectArgs = {
  id: Scalars["Int"];
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["Int"];
  updatedAt: Scalars["DateTime"];
  username: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type AddProjectInfoMutationVariables = Exact<{
  projectOptions: ProjectInput;
}>;

export type AddProjectInfoMutation = {
  __typename?: "Mutation";
  addProjectInfo: {
    __typename?: "ProjectInfoResponse";
    project?: {
      __typename?: "Project";
      id: number;
      createdAt: any;
      updatedAt: any;
      milestoneDates: Array<string>;
      milestones: Array<string>;
      overview: string;
      podId?: number | null;
      userId: number;
      groupSize: number;
    } | null;
  };
};

export type AddProjectToPodMutationVariables = Exact<{
  projectId: Scalars["Float"];
  addProjectToPodId: Scalars["Float"];
}>;

export type AddProjectToPodMutation = {
  __typename?: "Mutation";
  addProjectToPod: {
    __typename?: "PodResponse";
    errors?: string | null;
    pod?: {
      __typename?: "Pod";
      id: number;
      cap: number;
      projectIds: Array<number>;
      updatedAt: any;
      createdAt: any;
      userIds: Array<number>;
    } | null;
  };
};

export type CreatePodMutationVariables = Exact<{
  cap: Scalars["Float"];
}>;

export type CreatePodMutation = {
  __typename?: "Mutation";
  createPod: {
    __typename?: "Pod";
    cap: number;
    projectIds: Array<number>;
    createdAt: any;
    updatedAt: any;
    id: number;
    userIds: Array<number>;
  };
};

export type LoginMutationVariables = Exact<{
  password: Scalars["String"];
  usernameOrEmail: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      createdAt: any;
      email: string;
      id: number;
      updatedAt: any;
      username: string;
    } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      createdAt: any;
      email: string;
      id: number;
      updatedAt: any;
      username: string;
    } | null;
  };
};

export type RemoveProjectFromPodMutationVariables = Exact<{
  projectId: Scalars["Float"];
  removeProjectFromPodId: Scalars["Float"];
}>;

export type RemoveProjectFromPodMutation = {
  __typename?: "Mutation";
  removeProjectFromPod: {
    __typename?: "PodResponse";
    errors?: string | null;
    pod?: {
      __typename?: "Pod";
      id: number;
      cap: number;
      projectIds: Array<number>;
      updatedAt: any;
      createdAt: any;
      userIds: Array<number>;
    } | null;
  };
};

export type UpdateProjectPodMutationVariables = Exact<{
  podId: Scalars["Float"];
  updateProjectPodId: Scalars["Float"];
}>;

export type UpdateProjectPodMutation = {
  __typename?: "Mutation";
  updateProjectPod: {
    __typename?: "ProjectResponse";
    errors?: string | null;
    project?: {
      __typename?: "Project";
      userId: number;
      id: number;
      milestoneDates: Array<string>;
      milestones: Array<string>;
      groupSize: number;
      createdAt: any;
      updatedAt: any;
      overview: string;
      podId?: number | null;
      projectName: string;
    } | null;
  };
};

export type FindPodQueryVariables = Exact<{
  projectId: Scalars["Float"];
  cap: Scalars["Float"];
}>;

export type FindPodQuery = {
  __typename?: "Query";
  findPod: {
    __typename?: "PodResponse";
    errors?: string | null;
    pod?: {
      __typename?: "Pod";
      id: number;
      cap: number;
      projectIds: Array<number>;
      updatedAt: any;
      createdAt: any;
      userIds: Array<number>;
    } | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    createdAt: any;
    email: string;
    id: number;
    updatedAt: any;
    username: string;
  } | null;
};

export type PodQueryVariables = Exact<{
  podId: Scalars["Float"];
}>;

export type PodQuery = {
  __typename?: "Query";
  pod?: {
    __typename?: "PodResponse";
    errors?: string | null;
    pod?: {
      __typename?: "Pod";
      cap: number;
      id: number;
      projectIds: Array<number>;
      createdAt: any;
      updatedAt: any;
      userIds: Array<number>;
    } | null;
  } | null;
};

export type ProjectQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type ProjectQuery = {
  __typename?: "Query";
  project?: {
    __typename?: "ProjectResponse";
    errors?: string | null;
    project?: {
      __typename?: "Project";
      userId: number;
      id: number;
      milestoneDates: Array<string>;
      milestones: Array<string>;
      groupSize: number;
      createdAt: any;
      updatedAt: any;
      overview: string;
      podId?: number | null;
      projectName: string;
    } | null;
  } | null;
};

export type ProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type ProjectsQuery = {
  __typename?: "Query";
  projects?: Array<{
    __typename?: "Project";
    userId: number;
    id: number;
    milestoneDates: Array<string>;
    milestones: Array<string>;
    groupSize: number;
    createdAt: any;
    updatedAt: any;
    overview: string;
    podId?: number | null;
    projectName: string;
  }> | null;
};

export const AddProjectInfoDocument = gql`
  mutation AddProjectInfo($projectOptions: ProjectInput!) {
    addProjectInfo(projectOptions: $projectOptions) {
      project {
        id
        createdAt
        updatedAt
        milestoneDates
        milestones
        overview
        podId
        userId
        groupSize
      }
    }
  }
`;
export type AddProjectInfoMutationFn = Apollo.MutationFunction<
  AddProjectInfoMutation,
  AddProjectInfoMutationVariables
>;

/**
 * __useAddProjectInfoMutation__
 *
 * To run a mutation, you first call `useAddProjectInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectInfoMutation, { data, loading, error }] = useAddProjectInfoMutation({
 *   variables: {
 *      projectOptions: // value for 'projectOptions'
 *   },
 * });
 */
export function useAddProjectInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProjectInfoMutation,
    AddProjectInfoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddProjectInfoMutation,
    AddProjectInfoMutationVariables
  >(AddProjectInfoDocument, options);
}
export type AddProjectInfoMutationHookResult = ReturnType<
  typeof useAddProjectInfoMutation
>;
export type AddProjectInfoMutationResult =
  Apollo.MutationResult<AddProjectInfoMutation>;
export type AddProjectInfoMutationOptions = Apollo.BaseMutationOptions<
  AddProjectInfoMutation,
  AddProjectInfoMutationVariables
>;
export const AddProjectToPodDocument = gql`
  mutation AddProjectToPod($projectId: Float!, $addProjectToPodId: Float!) {
    addProjectToPod(projectId: $projectId, id: $addProjectToPodId) {
      errors
      pod {
        id
        cap
        projectIds
        updatedAt
        createdAt
        userIds
      }
    }
  }
`;
export type AddProjectToPodMutationFn = Apollo.MutationFunction<
  AddProjectToPodMutation,
  AddProjectToPodMutationVariables
>;

/**
 * __useAddProjectToPodMutation__
 *
 * To run a mutation, you first call `useAddProjectToPodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectToPodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectToPodMutation, { data, loading, error }] = useAddProjectToPodMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      addProjectToPodId: // value for 'addProjectToPodId'
 *   },
 * });
 */
export function useAddProjectToPodMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProjectToPodMutation,
    AddProjectToPodMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddProjectToPodMutation,
    AddProjectToPodMutationVariables
  >(AddProjectToPodDocument, options);
}
export type AddProjectToPodMutationHookResult = ReturnType<
  typeof useAddProjectToPodMutation
>;
export type AddProjectToPodMutationResult =
  Apollo.MutationResult<AddProjectToPodMutation>;
export type AddProjectToPodMutationOptions = Apollo.BaseMutationOptions<
  AddProjectToPodMutation,
  AddProjectToPodMutationVariables
>;
export const CreatePodDocument = gql`
  mutation CreatePod($cap: Float!) {
    createPod(cap: $cap) {
      cap
      projectIds
      createdAt
      updatedAt
      id
      userIds
    }
  }
`;
export type CreatePodMutationFn = Apollo.MutationFunction<
  CreatePodMutation,
  CreatePodMutationVariables
>;

/**
 * __useCreatePodMutation__
 *
 * To run a mutation, you first call `useCreatePodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPodMutation, { data, loading, error }] = useCreatePodMutation({
 *   variables: {
 *      cap: // value for 'cap'
 *   },
 * });
 */
export function useCreatePodMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePodMutation,
    CreatePodMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePodMutation, CreatePodMutationVariables>(
    CreatePodDocument,
    options
  );
}
export type CreatePodMutationHookResult = ReturnType<
  typeof useCreatePodMutation
>;
export type CreatePodMutationResult = Apollo.MutationResult<CreatePodMutation>;
export type CreatePodMutationOptions = Apollo.BaseMutationOptions<
  CreatePodMutation,
  CreatePodMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($password: String!, $usernameOrEmail: String!) {
    login(password: $password, usernameOrEmail: $usernameOrEmail) {
      errors {
        field
        message
      }
      user {
        createdAt
        email
        id
        updatedAt
        username
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      user {
        createdAt
        email
        id
        updatedAt
        username
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const RemoveProjectFromPodDocument = gql`
  mutation RemoveProjectFromPod(
    $projectId: Float!
    $removeProjectFromPodId: Float!
  ) {
    removeProjectFromPod(projectId: $projectId, id: $removeProjectFromPodId) {
      errors
      pod {
        id
        cap
        projectIds
        updatedAt
        createdAt
        userIds
      }
    }
  }
`;
export type RemoveProjectFromPodMutationFn = Apollo.MutationFunction<
  RemoveProjectFromPodMutation,
  RemoveProjectFromPodMutationVariables
>;

/**
 * __useRemoveProjectFromPodMutation__
 *
 * To run a mutation, you first call `useRemoveProjectFromPodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectFromPodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectFromPodMutation, { data, loading, error }] = useRemoveProjectFromPodMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      removeProjectFromPodId: // value for 'removeProjectFromPodId'
 *   },
 * });
 */
export function useRemoveProjectFromPodMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProjectFromPodMutation,
    RemoveProjectFromPodMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveProjectFromPodMutation,
    RemoveProjectFromPodMutationVariables
  >(RemoveProjectFromPodDocument, options);
}
export type RemoveProjectFromPodMutationHookResult = ReturnType<
  typeof useRemoveProjectFromPodMutation
>;
export type RemoveProjectFromPodMutationResult =
  Apollo.MutationResult<RemoveProjectFromPodMutation>;
export type RemoveProjectFromPodMutationOptions = Apollo.BaseMutationOptions<
  RemoveProjectFromPodMutation,
  RemoveProjectFromPodMutationVariables
>;
export const UpdateProjectPodDocument = gql`
  mutation UpdateProjectPod($podId: Float!, $updateProjectPodId: Float!) {
    updateProjectPod(podId: $podId, id: $updateProjectPodId) {
      errors
      project {
        userId
        id
        milestoneDates
        milestones
        groupSize
        createdAt
        updatedAt
        overview
        podId
        projectName
      }
    }
  }
`;
export type UpdateProjectPodMutationFn = Apollo.MutationFunction<
  UpdateProjectPodMutation,
  UpdateProjectPodMutationVariables
>;

/**
 * __useUpdateProjectPodMutation__
 *
 * To run a mutation, you first call `useUpdateProjectPodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectPodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectPodMutation, { data, loading, error }] = useUpdateProjectPodMutation({
 *   variables: {
 *      podId: // value for 'podId'
 *      updateProjectPodId: // value for 'updateProjectPodId'
 *   },
 * });
 */
export function useUpdateProjectPodMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProjectPodMutation,
    UpdateProjectPodMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProjectPodMutation,
    UpdateProjectPodMutationVariables
  >(UpdateProjectPodDocument, options);
}
export type UpdateProjectPodMutationHookResult = ReturnType<
  typeof useUpdateProjectPodMutation
>;
export type UpdateProjectPodMutationResult =
  Apollo.MutationResult<UpdateProjectPodMutation>;
export type UpdateProjectPodMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectPodMutation,
  UpdateProjectPodMutationVariables
>;
export const FindPodDocument = gql`
  query FindPod($projectId: Float!, $cap: Float!) {
    findPod(projectId: $projectId, cap: $cap) {
      errors
      pod {
        id
        cap
        projectIds
        updatedAt
        createdAt
        userIds
      }
    }
  }
`;

/**
 * __useFindPodQuery__
 *
 * To run a query within a React component, call `useFindPodQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPodQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      cap: // value for 'cap'
 *   },
 * });
 */
export function useFindPodQuery(
  baseOptions: Apollo.QueryHookOptions<FindPodQuery, FindPodQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindPodQuery, FindPodQueryVariables>(
    FindPodDocument,
    options
  );
}
export function useFindPodLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindPodQuery, FindPodQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindPodQuery, FindPodQueryVariables>(
    FindPodDocument,
    options
  );
}
export type FindPodQueryHookResult = ReturnType<typeof useFindPodQuery>;
export type FindPodLazyQueryHookResult = ReturnType<typeof useFindPodLazyQuery>;
export type FindPodQueryResult = Apollo.QueryResult<
  FindPodQuery,
  FindPodQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      createdAt
      email
      id
      updatedAt
      username
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PodDocument = gql`
  query Pod($podId: Float!) {
    pod(id: $podId) {
      errors
      pod {
        cap
        id
        projectIds
        createdAt
        updatedAt
        userIds
      }
    }
  }
`;

/**
 * __usePodQuery__
 *
 * To run a query within a React component, call `usePodQuery` and pass it any options that fit your needs.
 * When your component renders, `usePodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePodQuery({
 *   variables: {
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function usePodQuery(
  baseOptions: Apollo.QueryHookOptions<PodQuery, PodQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PodQuery, PodQueryVariables>(PodDocument, options);
}
export function usePodLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PodQuery, PodQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PodQuery, PodQueryVariables>(PodDocument, options);
}
export type PodQueryHookResult = ReturnType<typeof usePodQuery>;
export type PodLazyQueryHookResult = ReturnType<typeof usePodLazyQuery>;
export type PodQueryResult = Apollo.QueryResult<PodQuery, PodQueryVariables>;
export const ProjectDocument = gql`
  query Project($id: Int!) {
    project(id: $id) {
      errors
      project {
        userId
        id
        milestoneDates
        milestones
        groupSize
        createdAt
        updatedAt
        overview
        podId
        projectName
      }
    }
  }
`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(
    ProjectDocument,
    options
  );
}
export function useProjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(
    ProjectDocument,
    options
  );
}
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<
  ProjectQuery,
  ProjectQueryVariables
>;
export const ProjectsDocument = gql`
  query Projects {
    projects {
      userId
      id
      milestoneDates
      milestones
      groupSize
      createdAt
      updatedAt
      overview
      podId
      projectName
    }
  }
`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options
  );
}
export function useProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsQuery,
    ProjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options
  );
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<
  typeof useProjectsLazyQuery
>;
export type ProjectsQueryResult = Apollo.QueryResult<
  ProjectsQuery,
  ProjectsQueryVariables
>;
