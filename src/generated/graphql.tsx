import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProjectInfo: ProjectInfoResponse;
  addProjectToPod: PodResponse;
  createPod: Pod;
  deleteProject: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  removeProjectFromPod: PodResponse;
  updatePhone?: Maybe<UserResponse>;
  updateProjectFriendProposals: ProjectResponse;
  updateProjectGroupSize: ProjectResponse;
  updateProjectMilestoneDates: ProjectResponse;
  updateProjectMilestones: ProjectResponse;
  updateProjectName: ProjectResponse;
  updateProjectPod: ProjectResponse;
  updateProjectProgress: ProjectResponse;
  updateUserFriendRequests: UserResponse;
};


export type MutationAddProjectInfoArgs = {
  projectOptions: ProjectInput;
};


export type MutationAddProjectToPodArgs = {
  id: Scalars['Float'];
  projectId: Scalars['Float'];
};


export type MutationCreatePodArgs = {
  cap: Scalars['Float'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationRemoveProjectFromPodArgs = {
  id: Scalars['Float'];
  projectId: Scalars['Float'];
};


export type MutationUpdatePhoneArgs = {
  id: Scalars['Float'];
  phone: Scalars['String'];
};


export type MutationUpdateProjectFriendProposalsArgs = {
  friendProposals: Array<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationUpdateProjectGroupSizeArgs = {
  groupSize: Scalars['Float'];
  id: Scalars['Float'];
};


export type MutationUpdateProjectMilestoneDatesArgs = {
  id: Scalars['Float'];
  milestoneDates: Array<Scalars['String']>;
};


export type MutationUpdateProjectMilestonesArgs = {
  id: Scalars['Float'];
  milestones: Array<Scalars['String']>;
};


export type MutationUpdateProjectNameArgs = {
  id: Scalars['Float'];
  projectName: Scalars['String'];
};


export type MutationUpdateProjectPodArgs = {
  id: Scalars['Float'];
  podId: Scalars['Float'];
};


export type MutationUpdateProjectProgressArgs = {
  id: Scalars['Float'];
  milestoneProgress: Array<Scalars['Int']>;
};


export type MutationUpdateUserFriendRequestsArgs = {
  friendRequests: Array<Scalars['String']>;
  id: Scalars['Float'];
};

export type Pod = {
  __typename?: 'Pod';
  cap: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  projectIds: Array<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  userIds: Array<Scalars['Int']>;
};

export type PodResponse = {
  __typename?: 'PodResponse';
  errors?: Maybe<Scalars['String']>;
  pod?: Maybe<Pod>;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTime'];
  friendProposals: Array<Scalars['String']>;
  groupSize: Scalars['Int'];
  id: Scalars['Int'];
  milestoneDates: Array<Scalars['String']>;
  milestoneProgress: Array<Scalars['Int']>;
  milestones: Array<Scalars['String']>;
  overview: Scalars['String'];
  podId?: Maybe<Scalars['Int']>;
  projectName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['Int'];
};

export type ProjectInfoResponse = {
  __typename?: 'ProjectInfoResponse';
  errors?: Maybe<Array<FieldError>>;
  project?: Maybe<Project>;
};

export type ProjectInput = {
  groupSize: Scalars['Float'];
  milestoneDates: Array<Scalars['String']>;
  milestoneProgress: Array<Scalars['Int']>;
  milestones: Array<Scalars['String']>;
  overview: Scalars['String'];
  projectName: Scalars['String'];
  userId: Scalars['Float'];
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
};

export type Query = {
  __typename?: 'Query';
  findPod: PodResponse;
  hello: Scalars['String'];
  me?: Maybe<User>;
  pod?: Maybe<PodResponse>;
  podProjects?: Maybe<Array<Project>>;
  podUsers?: Maybe<Array<User>>;
  pods: Array<Pod>;
  project?: Maybe<ProjectResponse>;
  projects?: Maybe<Array<Project>>;
};


export type QueryFindPodArgs = {
  cap: Scalars['Float'];
  projectId: Scalars['Float'];
};


export type QueryPodArgs = {
  id: Scalars['Float'];
};


export type QueryPodProjectsArgs = {
  podId: Scalars['Int'];
};


export type QueryPodUsersArgs = {
  ids: Array<Scalars['Int']>;
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  friendRequests: Array<Scalars['String']>;
  id: Scalars['Int'];
  phone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularPodFragment = { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, userIds: Array<number> };

export type RegularProjectFragment = { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> };

export type RegularUserFragment = { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests: Array<string> };

export type UpdatePhoneMutationVariables = Exact<{
  phone: Scalars['String'];
  updatePhoneId: Scalars['Float'];
}>;


export type UpdatePhoneMutation = { __typename?: 'Mutation', updatePhone?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests: Array<string> } | null } | null };

export type AddProjectInfoMutationVariables = Exact<{
  projectOptions: ProjectInput;
}>;


export type AddProjectInfoMutation = { __typename?: 'Mutation', addProjectInfo: { __typename?: 'ProjectInfoResponse', project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> } | null } };

export type AddProjectToPodMutationVariables = Exact<{
  projectId: Scalars['Float'];
  addProjectToPodId: Scalars['Float'];
}>;


export type AddProjectToPodMutation = { __typename?: 'Mutation', addProjectToPod: { __typename?: 'PodResponse', errors?: string | null, pod?: { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, userIds: Array<number> } | null } };

export type CreatePodMutationVariables = Exact<{
  cap: Scalars['Float'];
}>;


export type CreatePodMutation = { __typename?: 'Mutation', createPod: { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, userIds: Array<number> } };

export type DeleteProjectMutationVariables = Exact<{
  deleteProjectId: Scalars['Float'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests: Array<string> } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests: Array<string> } | null } };

export type RemoveProjectFromPodMutationVariables = Exact<{
  projectId: Scalars['Float'];
  removeProjectFromPodId: Scalars['Float'];
}>;


export type RemoveProjectFromPodMutation = { __typename?: 'Mutation', removeProjectFromPod: { __typename?: 'PodResponse', errors?: string | null, pod?: { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, userIds: Array<number> } | null } };

export type UpdateProjectFriendProposalsMutationVariables = Exact<{
  friendProposals: Array<Scalars['String']> | Scalars['String'];
  updateProjectFriendProposalsId: Scalars['Float'];
}>;


export type UpdateProjectFriendProposalsMutation = { __typename?: 'Mutation', updateProjectFriendProposals: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> } | null } };

export type UpdateProjectGroupSizeMutationVariables = Exact<{
  groupSize: Scalars['Float'];
  updateProjectGroupSizeId: Scalars['Float'];
}>;


export type UpdateProjectGroupSizeMutation = { __typename?: 'Mutation', updateProjectGroupSize: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> } | null } };

export type UpdateProjectMilestoneDatesMutationVariables = Exact<{
  milestoneDates: Array<Scalars['String']> | Scalars['String'];
  updateProjectMilestoneDatesId: Scalars['Float'];
}>;


export type UpdateProjectMilestoneDatesMutation = { __typename?: 'Mutation', updateProjectMilestoneDates: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> } | null } };

export type UpdateProjectMilestonesMutationVariables = Exact<{
  milestones: Array<Scalars['String']> | Scalars['String'];
  updateProjectMilestonesId: Scalars['Float'];
}>;


export type UpdateProjectMilestonesMutation = { __typename?: 'Mutation', updateProjectMilestones: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> } | null } };

export type UpdateProjectNameMutationVariables = Exact<{
  projectName: Scalars['String'];
  updateProjectNameId: Scalars['Float'];
}>;


export type UpdateProjectNameMutation = { __typename?: 'Mutation', updateProjectName: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> } | null } };

export type UpdateProjectPodMutationVariables = Exact<{
  podId: Scalars['Float'];
  updateProjectPodId: Scalars['Float'];
}>;


export type UpdateProjectPodMutation = { __typename?: 'Mutation', updateProjectPod: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> } | null } };

export type UpdateProjectProgressMutationVariables = Exact<{
  milestoneProgress: Array<Scalars['Int']> | Scalars['Int'];
  updateProjectProgressId: Scalars['Float'];
}>;


export type UpdateProjectProgressMutation = { __typename?: 'Mutation', updateProjectProgress: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> } | null } };

export type UpdateUserFriendRequestsMutationVariables = Exact<{
  friendRequests: Array<Scalars['String']> | Scalars['String'];
  updateUserFriendRequestsId: Scalars['Float'];
}>;


export type UpdateUserFriendRequestsMutation = { __typename?: 'Mutation', updateUserFriendRequests: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests: Array<string> } | null } };

export type FindPodQueryVariables = Exact<{
  projectId: Scalars['Float'];
  cap: Scalars['Float'];
}>;


export type FindPodQuery = { __typename?: 'Query', findPod: { __typename?: 'PodResponse', errors?: string | null, pod?: { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, userIds: Array<number> } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests: Array<string> } | null };

export type PodQueryVariables = Exact<{
  podId: Scalars['Float'];
}>;


export type PodQuery = { __typename?: 'Query', pod?: { __typename?: 'PodResponse', errors?: string | null, pod?: { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, userIds: Array<number> } | null } | null };

export type PodProjectsQueryVariables = Exact<{
  podId: Scalars['Int'];
}>;


export type PodProjectsQuery = { __typename?: 'Query', podProjects?: Array<{ __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> }> | null };

export type PodsQueryVariables = Exact<{ [key: string]: never; }>;


export type PodsQuery = { __typename?: 'Query', pods: Array<{ __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, userIds: Array<number> }> };

export type ProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> } | null } | null };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, groupSize: number, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals: Array<string> }> | null };

export type PodUsersQueryVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type PodUsersQuery = { __typename?: 'Query', podUsers?: Array<{ __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests: Array<string> }> | null };

export const RegularPodFragmentDoc = gql`
    fragment RegularPod on Pod {
  id
  cap
  projectIds
  updatedAt
  createdAt
  userIds
}
    `;
export const RegularProjectFragmentDoc = gql`
    fragment RegularProject on Project {
  userId
  id
  milestoneDates
  milestones
  milestoneProgress
  groupSize
  createdAt
  updatedAt
  overview
  podId
  projectName
  friendProposals
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  createdAt
  email
  phone
  id
  updatedAt
  username
  friendRequests
}
    `;
export const UpdatePhoneDocument = gql`
    mutation UpdatePhone($phone: String!, $updatePhoneId: Float!) {
  updatePhone(phone: $phone, id: $updatePhoneId) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type UpdatePhoneMutationFn = Apollo.MutationFunction<UpdatePhoneMutation, UpdatePhoneMutationVariables>;

/**
 * __useUpdatePhoneMutation__
 *
 * To run a mutation, you first call `useUpdatePhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePhoneMutation, { data, loading, error }] = useUpdatePhoneMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *      updatePhoneId: // value for 'updatePhoneId'
 *   },
 * });
 */
export function useUpdatePhoneMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePhoneMutation, UpdatePhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePhoneMutation, UpdatePhoneMutationVariables>(UpdatePhoneDocument, options);
      }
export type UpdatePhoneMutationHookResult = ReturnType<typeof useUpdatePhoneMutation>;
export type UpdatePhoneMutationResult = Apollo.MutationResult<UpdatePhoneMutation>;
export type UpdatePhoneMutationOptions = Apollo.BaseMutationOptions<UpdatePhoneMutation, UpdatePhoneMutationVariables>;
export const AddProjectInfoDocument = gql`
    mutation AddProjectInfo($projectOptions: ProjectInput!) {
  addProjectInfo(projectOptions: $projectOptions) {
    project {
      ...RegularProject
    }
  }
}
    ${RegularProjectFragmentDoc}`;
export type AddProjectInfoMutationFn = Apollo.MutationFunction<AddProjectInfoMutation, AddProjectInfoMutationVariables>;

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
export function useAddProjectInfoMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectInfoMutation, AddProjectInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectInfoMutation, AddProjectInfoMutationVariables>(AddProjectInfoDocument, options);
      }
export type AddProjectInfoMutationHookResult = ReturnType<typeof useAddProjectInfoMutation>;
export type AddProjectInfoMutationResult = Apollo.MutationResult<AddProjectInfoMutation>;
export type AddProjectInfoMutationOptions = Apollo.BaseMutationOptions<AddProjectInfoMutation, AddProjectInfoMutationVariables>;
export const AddProjectToPodDocument = gql`
    mutation AddProjectToPod($projectId: Float!, $addProjectToPodId: Float!) {
  addProjectToPod(projectId: $projectId, id: $addProjectToPodId) {
    errors
    pod {
      ...RegularPod
    }
  }
}
    ${RegularPodFragmentDoc}`;
export type AddProjectToPodMutationFn = Apollo.MutationFunction<AddProjectToPodMutation, AddProjectToPodMutationVariables>;

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
export function useAddProjectToPodMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectToPodMutation, AddProjectToPodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectToPodMutation, AddProjectToPodMutationVariables>(AddProjectToPodDocument, options);
      }
export type AddProjectToPodMutationHookResult = ReturnType<typeof useAddProjectToPodMutation>;
export type AddProjectToPodMutationResult = Apollo.MutationResult<AddProjectToPodMutation>;
export type AddProjectToPodMutationOptions = Apollo.BaseMutationOptions<AddProjectToPodMutation, AddProjectToPodMutationVariables>;
export const CreatePodDocument = gql`
    mutation CreatePod($cap: Float!) {
  createPod(cap: $cap) {
    ...RegularPod
  }
}
    ${RegularPodFragmentDoc}`;
export type CreatePodMutationFn = Apollo.MutationFunction<CreatePodMutation, CreatePodMutationVariables>;

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
export function useCreatePodMutation(baseOptions?: Apollo.MutationHookOptions<CreatePodMutation, CreatePodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePodMutation, CreatePodMutationVariables>(CreatePodDocument, options);
      }
export type CreatePodMutationHookResult = ReturnType<typeof useCreatePodMutation>;
export type CreatePodMutationResult = Apollo.MutationResult<CreatePodMutation>;
export type CreatePodMutationOptions = Apollo.BaseMutationOptions<CreatePodMutation, CreatePodMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($deleteProjectId: Float!) {
  deleteProject(id: $deleteProjectId)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      deleteProjectId: // value for 'deleteProjectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $usernameOrEmail: String!) {
  login(password: $password, usernameOrEmail: $usernameOrEmail) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveProjectFromPodDocument = gql`
    mutation RemoveProjectFromPod($projectId: Float!, $removeProjectFromPodId: Float!) {
  removeProjectFromPod(projectId: $projectId, id: $removeProjectFromPodId) {
    errors
    pod {
      ...RegularPod
    }
  }
}
    ${RegularPodFragmentDoc}`;
export type RemoveProjectFromPodMutationFn = Apollo.MutationFunction<RemoveProjectFromPodMutation, RemoveProjectFromPodMutationVariables>;

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
export function useRemoveProjectFromPodMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProjectFromPodMutation, RemoveProjectFromPodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProjectFromPodMutation, RemoveProjectFromPodMutationVariables>(RemoveProjectFromPodDocument, options);
      }
export type RemoveProjectFromPodMutationHookResult = ReturnType<typeof useRemoveProjectFromPodMutation>;
export type RemoveProjectFromPodMutationResult = Apollo.MutationResult<RemoveProjectFromPodMutation>;
export type RemoveProjectFromPodMutationOptions = Apollo.BaseMutationOptions<RemoveProjectFromPodMutation, RemoveProjectFromPodMutationVariables>;
export const UpdateProjectFriendProposalsDocument = gql`
    mutation UpdateProjectFriendProposals($friendProposals: [String!]!, $updateProjectFriendProposalsId: Float!) {
  updateProjectFriendProposals(
    friendProposals: $friendProposals
    id: $updateProjectFriendProposalsId
  ) {
    errors
    project {
      ...RegularProject
    }
  }
}
    ${RegularProjectFragmentDoc}`;
export type UpdateProjectFriendProposalsMutationFn = Apollo.MutationFunction<UpdateProjectFriendProposalsMutation, UpdateProjectFriendProposalsMutationVariables>;

/**
 * __useUpdateProjectFriendProposalsMutation__
 *
 * To run a mutation, you first call `useUpdateProjectFriendProposalsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectFriendProposalsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectFriendProposalsMutation, { data, loading, error }] = useUpdateProjectFriendProposalsMutation({
 *   variables: {
 *      friendProposals: // value for 'friendProposals'
 *      updateProjectFriendProposalsId: // value for 'updateProjectFriendProposalsId'
 *   },
 * });
 */
export function useUpdateProjectFriendProposalsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectFriendProposalsMutation, UpdateProjectFriendProposalsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectFriendProposalsMutation, UpdateProjectFriendProposalsMutationVariables>(UpdateProjectFriendProposalsDocument, options);
      }
export type UpdateProjectFriendProposalsMutationHookResult = ReturnType<typeof useUpdateProjectFriendProposalsMutation>;
export type UpdateProjectFriendProposalsMutationResult = Apollo.MutationResult<UpdateProjectFriendProposalsMutation>;
export type UpdateProjectFriendProposalsMutationOptions = Apollo.BaseMutationOptions<UpdateProjectFriendProposalsMutation, UpdateProjectFriendProposalsMutationVariables>;
export const UpdateProjectGroupSizeDocument = gql`
    mutation UpdateProjectGroupSize($groupSize: Float!, $updateProjectGroupSizeId: Float!) {
  updateProjectGroupSize(groupSize: $groupSize, id: $updateProjectGroupSizeId) {
    errors
    project {
      ...RegularProject
    }
  }
}
    ${RegularProjectFragmentDoc}`;
export type UpdateProjectGroupSizeMutationFn = Apollo.MutationFunction<UpdateProjectGroupSizeMutation, UpdateProjectGroupSizeMutationVariables>;

/**
 * __useUpdateProjectGroupSizeMutation__
 *
 * To run a mutation, you first call `useUpdateProjectGroupSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectGroupSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectGroupSizeMutation, { data, loading, error }] = useUpdateProjectGroupSizeMutation({
 *   variables: {
 *      groupSize: // value for 'groupSize'
 *      updateProjectGroupSizeId: // value for 'updateProjectGroupSizeId'
 *   },
 * });
 */
export function useUpdateProjectGroupSizeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectGroupSizeMutation, UpdateProjectGroupSizeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectGroupSizeMutation, UpdateProjectGroupSizeMutationVariables>(UpdateProjectGroupSizeDocument, options);
      }
export type UpdateProjectGroupSizeMutationHookResult = ReturnType<typeof useUpdateProjectGroupSizeMutation>;
export type UpdateProjectGroupSizeMutationResult = Apollo.MutationResult<UpdateProjectGroupSizeMutation>;
export type UpdateProjectGroupSizeMutationOptions = Apollo.BaseMutationOptions<UpdateProjectGroupSizeMutation, UpdateProjectGroupSizeMutationVariables>;
export const UpdateProjectMilestoneDatesDocument = gql`
    mutation UpdateProjectMilestoneDates($milestoneDates: [String!]!, $updateProjectMilestoneDatesId: Float!) {
  updateProjectMilestoneDates(
    milestoneDates: $milestoneDates
    id: $updateProjectMilestoneDatesId
  ) {
    errors
    project {
      ...RegularProject
    }
  }
}
    ${RegularProjectFragmentDoc}`;
export type UpdateProjectMilestoneDatesMutationFn = Apollo.MutationFunction<UpdateProjectMilestoneDatesMutation, UpdateProjectMilestoneDatesMutationVariables>;

/**
 * __useUpdateProjectMilestoneDatesMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMilestoneDatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMilestoneDatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMilestoneDatesMutation, { data, loading, error }] = useUpdateProjectMilestoneDatesMutation({
 *   variables: {
 *      milestoneDates: // value for 'milestoneDates'
 *      updateProjectMilestoneDatesId: // value for 'updateProjectMilestoneDatesId'
 *   },
 * });
 */
export function useUpdateProjectMilestoneDatesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMilestoneDatesMutation, UpdateProjectMilestoneDatesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMilestoneDatesMutation, UpdateProjectMilestoneDatesMutationVariables>(UpdateProjectMilestoneDatesDocument, options);
      }
export type UpdateProjectMilestoneDatesMutationHookResult = ReturnType<typeof useUpdateProjectMilestoneDatesMutation>;
export type UpdateProjectMilestoneDatesMutationResult = Apollo.MutationResult<UpdateProjectMilestoneDatesMutation>;
export type UpdateProjectMilestoneDatesMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMilestoneDatesMutation, UpdateProjectMilestoneDatesMutationVariables>;
export const UpdateProjectMilestonesDocument = gql`
    mutation UpdateProjectMilestones($milestones: [String!]!, $updateProjectMilestonesId: Float!) {
  updateProjectMilestones(milestones: $milestones, id: $updateProjectMilestonesId) {
    errors
    project {
      ...RegularProject
    }
  }
}
    ${RegularProjectFragmentDoc}`;
export type UpdateProjectMilestonesMutationFn = Apollo.MutationFunction<UpdateProjectMilestonesMutation, UpdateProjectMilestonesMutationVariables>;

/**
 * __useUpdateProjectMilestonesMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMilestonesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMilestonesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMilestonesMutation, { data, loading, error }] = useUpdateProjectMilestonesMutation({
 *   variables: {
 *      milestones: // value for 'milestones'
 *      updateProjectMilestonesId: // value for 'updateProjectMilestonesId'
 *   },
 * });
 */
export function useUpdateProjectMilestonesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMilestonesMutation, UpdateProjectMilestonesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMilestonesMutation, UpdateProjectMilestonesMutationVariables>(UpdateProjectMilestonesDocument, options);
      }
export type UpdateProjectMilestonesMutationHookResult = ReturnType<typeof useUpdateProjectMilestonesMutation>;
export type UpdateProjectMilestonesMutationResult = Apollo.MutationResult<UpdateProjectMilestonesMutation>;
export type UpdateProjectMilestonesMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMilestonesMutation, UpdateProjectMilestonesMutationVariables>;
export const UpdateProjectNameDocument = gql`
    mutation UpdateProjectName($projectName: String!, $updateProjectNameId: Float!) {
  updateProjectName(projectName: $projectName, id: $updateProjectNameId) {
    errors
    project {
      ...RegularProject
    }
  }
}
    ${RegularProjectFragmentDoc}`;
export type UpdateProjectNameMutationFn = Apollo.MutationFunction<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>;

/**
 * __useUpdateProjectNameMutation__
 *
 * To run a mutation, you first call `useUpdateProjectNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectNameMutation, { data, loading, error }] = useUpdateProjectNameMutation({
 *   variables: {
 *      projectName: // value for 'projectName'
 *      updateProjectNameId: // value for 'updateProjectNameId'
 *   },
 * });
 */
export function useUpdateProjectNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>(UpdateProjectNameDocument, options);
      }
export type UpdateProjectNameMutationHookResult = ReturnType<typeof useUpdateProjectNameMutation>;
export type UpdateProjectNameMutationResult = Apollo.MutationResult<UpdateProjectNameMutation>;
export type UpdateProjectNameMutationOptions = Apollo.BaseMutationOptions<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>;
export const UpdateProjectPodDocument = gql`
    mutation UpdateProjectPod($podId: Float!, $updateProjectPodId: Float!) {
  updateProjectPod(podId: $podId, id: $updateProjectPodId) {
    errors
    project {
      ...RegularProject
    }
  }
}
    ${RegularProjectFragmentDoc}`;
export type UpdateProjectPodMutationFn = Apollo.MutationFunction<UpdateProjectPodMutation, UpdateProjectPodMutationVariables>;

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
export function useUpdateProjectPodMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectPodMutation, UpdateProjectPodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectPodMutation, UpdateProjectPodMutationVariables>(UpdateProjectPodDocument, options);
      }
export type UpdateProjectPodMutationHookResult = ReturnType<typeof useUpdateProjectPodMutation>;
export type UpdateProjectPodMutationResult = Apollo.MutationResult<UpdateProjectPodMutation>;
export type UpdateProjectPodMutationOptions = Apollo.BaseMutationOptions<UpdateProjectPodMutation, UpdateProjectPodMutationVariables>;
export const UpdateProjectProgressDocument = gql`
    mutation UpdateProjectProgress($milestoneProgress: [Int!]!, $updateProjectProgressId: Float!) {
  updateProjectProgress(
    milestoneProgress: $milestoneProgress
    id: $updateProjectProgressId
  ) {
    errors
    project {
      ...RegularProject
    }
  }
}
    ${RegularProjectFragmentDoc}`;
export type UpdateProjectProgressMutationFn = Apollo.MutationFunction<UpdateProjectProgressMutation, UpdateProjectProgressMutationVariables>;

/**
 * __useUpdateProjectProgressMutation__
 *
 * To run a mutation, you first call `useUpdateProjectProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectProgressMutation, { data, loading, error }] = useUpdateProjectProgressMutation({
 *   variables: {
 *      milestoneProgress: // value for 'milestoneProgress'
 *      updateProjectProgressId: // value for 'updateProjectProgressId'
 *   },
 * });
 */
export function useUpdateProjectProgressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectProgressMutation, UpdateProjectProgressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectProgressMutation, UpdateProjectProgressMutationVariables>(UpdateProjectProgressDocument, options);
      }
export type UpdateProjectProgressMutationHookResult = ReturnType<typeof useUpdateProjectProgressMutation>;
export type UpdateProjectProgressMutationResult = Apollo.MutationResult<UpdateProjectProgressMutation>;
export type UpdateProjectProgressMutationOptions = Apollo.BaseMutationOptions<UpdateProjectProgressMutation, UpdateProjectProgressMutationVariables>;
export const UpdateUserFriendRequestsDocument = gql`
    mutation UpdateUserFriendRequests($friendRequests: [String!]!, $updateUserFriendRequestsId: Float!) {
  updateUserFriendRequests(
    friendRequests: $friendRequests
    id: $updateUserFriendRequestsId
  ) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type UpdateUserFriendRequestsMutationFn = Apollo.MutationFunction<UpdateUserFriendRequestsMutation, UpdateUserFriendRequestsMutationVariables>;

/**
 * __useUpdateUserFriendRequestsMutation__
 *
 * To run a mutation, you first call `useUpdateUserFriendRequestsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserFriendRequestsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserFriendRequestsMutation, { data, loading, error }] = useUpdateUserFriendRequestsMutation({
 *   variables: {
 *      friendRequests: // value for 'friendRequests'
 *      updateUserFriendRequestsId: // value for 'updateUserFriendRequestsId'
 *   },
 * });
 */
export function useUpdateUserFriendRequestsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserFriendRequestsMutation, UpdateUserFriendRequestsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserFriendRequestsMutation, UpdateUserFriendRequestsMutationVariables>(UpdateUserFriendRequestsDocument, options);
      }
export type UpdateUserFriendRequestsMutationHookResult = ReturnType<typeof useUpdateUserFriendRequestsMutation>;
export type UpdateUserFriendRequestsMutationResult = Apollo.MutationResult<UpdateUserFriendRequestsMutation>;
export type UpdateUserFriendRequestsMutationOptions = Apollo.BaseMutationOptions<UpdateUserFriendRequestsMutation, UpdateUserFriendRequestsMutationVariables>;
export const FindPodDocument = gql`
    query FindPod($projectId: Float!, $cap: Float!) {
  findPod(projectId: $projectId, cap: $cap) {
    errors
    pod {
      ...RegularPod
    }
  }
}
    ${RegularPodFragmentDoc}`;

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
export function useFindPodQuery(baseOptions: Apollo.QueryHookOptions<FindPodQuery, FindPodQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPodQuery, FindPodQueryVariables>(FindPodDocument, options);
      }
export function useFindPodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPodQuery, FindPodQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPodQuery, FindPodQueryVariables>(FindPodDocument, options);
        }
export type FindPodQueryHookResult = ReturnType<typeof useFindPodQuery>;
export type FindPodLazyQueryHookResult = ReturnType<typeof useFindPodLazyQuery>;
export type FindPodQueryResult = Apollo.QueryResult<FindPodQuery, FindPodQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
      ...RegularPod
    }
  }
}
    ${RegularPodFragmentDoc}`;

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
export function usePodQuery(baseOptions: Apollo.QueryHookOptions<PodQuery, PodQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PodQuery, PodQueryVariables>(PodDocument, options);
      }
export function usePodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PodQuery, PodQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PodQuery, PodQueryVariables>(PodDocument, options);
        }
export type PodQueryHookResult = ReturnType<typeof usePodQuery>;
export type PodLazyQueryHookResult = ReturnType<typeof usePodLazyQuery>;
export type PodQueryResult = Apollo.QueryResult<PodQuery, PodQueryVariables>;
export const PodProjectsDocument = gql`
    query PodProjects($podId: Int!) {
  podProjects(podId: $podId) {
    ...RegularProject
  }
}
    ${RegularProjectFragmentDoc}`;

/**
 * __usePodProjectsQuery__
 *
 * To run a query within a React component, call `usePodProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePodProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePodProjectsQuery({
 *   variables: {
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function usePodProjectsQuery(baseOptions: Apollo.QueryHookOptions<PodProjectsQuery, PodProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PodProjectsQuery, PodProjectsQueryVariables>(PodProjectsDocument, options);
      }
export function usePodProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PodProjectsQuery, PodProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PodProjectsQuery, PodProjectsQueryVariables>(PodProjectsDocument, options);
        }
export type PodProjectsQueryHookResult = ReturnType<typeof usePodProjectsQuery>;
export type PodProjectsLazyQueryHookResult = ReturnType<typeof usePodProjectsLazyQuery>;
export type PodProjectsQueryResult = Apollo.QueryResult<PodProjectsQuery, PodProjectsQueryVariables>;
export const PodsDocument = gql`
    query Pods {
  pods {
    ...RegularPod
  }
}
    ${RegularPodFragmentDoc}`;

/**
 * __usePodsQuery__
 *
 * To run a query within a React component, call `usePodsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePodsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePodsQuery(baseOptions?: Apollo.QueryHookOptions<PodsQuery, PodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PodsQuery, PodsQueryVariables>(PodsDocument, options);
      }
export function usePodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PodsQuery, PodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PodsQuery, PodsQueryVariables>(PodsDocument, options);
        }
export type PodsQueryHookResult = ReturnType<typeof usePodsQuery>;
export type PodsLazyQueryHookResult = ReturnType<typeof usePodsLazyQuery>;
export type PodsQueryResult = Apollo.QueryResult<PodsQuery, PodsQueryVariables>;
export const ProjectDocument = gql`
    query Project($id: Int!) {
  project(id: $id) {
    errors
    project {
      ...RegularProject
    }
  }
}
    ${RegularProjectFragmentDoc}`;

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
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectsDocument = gql`
    query Projects {
  projects {
    ...RegularProject
  }
}
    ${RegularProjectFragmentDoc}`;

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
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const PodUsersDocument = gql`
    query PodUsers($ids: [Int!]!) {
  podUsers(ids: $ids) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __usePodUsersQuery__
 *
 * To run a query within a React component, call `usePodUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePodUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePodUsersQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function usePodUsersQuery(baseOptions: Apollo.QueryHookOptions<PodUsersQuery, PodUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PodUsersQuery, PodUsersQueryVariables>(PodUsersDocument, options);
      }
export function usePodUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PodUsersQuery, PodUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PodUsersQuery, PodUsersQueryVariables>(PodUsersDocument, options);
        }
export type PodUsersQueryHookResult = ReturnType<typeof usePodUsersQuery>;
export type PodUsersLazyQueryHookResult = ReturnType<typeof usePodUsersLazyQuery>;
export type PodUsersQueryResult = Apollo.QueryResult<PodUsersQuery, PodUsersQueryVariables>;