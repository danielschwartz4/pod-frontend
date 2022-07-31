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
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type CompletedCountInput = {
  allTime: Scalars['Float'];
  week: Scalars['Float'];
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
  addSingleTask: SingleTaskResponse;
  addSingleTasksChunk: SingleTasksResponse;
  changePassword: UserResponse;
  createPod: Pod;
  createRecurringTask: RecurringTaskFieldResponse;
  deleteProject: Scalars['Boolean'];
  deleteRecurringTask: Scalars['Boolean'];
  deleteUser: UserResponse;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  removeProjectFromPod: PodResponse;
  updateCompletedCount: RecurringTaskResponse;
  updateHasCreatedTask: UserResponse;
  updateMessagingSettings: UserResponse;
  updatePhone?: Maybe<UserResponse>;
  updateProjectFriendProposals?: Maybe<ProjectResponse>;
  updateProjectMilestoneDates: ProjectResponse;
  updateProjectMilestones: ProjectResponse;
  updateProjectName: ProjectResponse;
  updateProjectPod: ProjectResponse;
  updateProjectProgress: ProjectResponse;
  updateSingleTaskCompletionStatus: SingleTaskResponse;
  updateSingleTaskNotes: SingleTaskResponse;
  updateTaskFriendProposals?: Maybe<RecurringTaskResponse>;
  updateTaskName: RecurringTaskFieldResponse;
  updateTaskPod: RecurringTaskFieldResponse;
  updateUserFriendRequests?: Maybe<UserResponse>;
};


export type MutationAddProjectInfoArgs = {
  projectOptions: ProjectInput;
};


export type MutationAddProjectToPodArgs = {
  id: Scalars['Float'];
  projectId: Scalars['Float'];
};


export type MutationAddSingleTaskArgs = {
  singleTaskOptions: SingleTaskInput;
};


export type MutationAddSingleTasksChunkArgs = {
  limit: Scalars['Float'];
  recTaskId: Scalars['Float'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePodArgs = {
  cap: Scalars['Float'];
  isPrivate: Scalars['Boolean'];
  sessionType: Scalars['String'];
};


export type MutationCreateRecurringTaskArgs = {
  recurringTaskOptions: RecurringTaskInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteRecurringTaskArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationRemoveProjectFromPodArgs = {
  id: Scalars['Float'];
  projectId: Scalars['Float'];
};


export type MutationUpdateCompletedCountArgs = {
  completedCount: CompletedCountInput;
  id: Scalars['Float'];
};


export type MutationUpdateHasCreatedTaskArgs = {
  hasCreated: Scalars['Boolean'];
};


export type MutationUpdateMessagingSettingsArgs = {
  messagingSettings: Scalars['JSONObject'];
};


export type MutationUpdatePhoneArgs = {
  id: Scalars['Float'];
  phone: Scalars['String'];
};


export type MutationUpdateProjectFriendProposalsArgs = {
  addedFriends: Array<Scalars['String']>;
  deletedFriend: Scalars['String'];
  id: Scalars['Float'];
  isAdding: Scalars['Boolean'];
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


export type MutationUpdateSingleTaskCompletionStatusArgs = {
  id: Scalars['Int'];
  status: Scalars['String'];
};


export type MutationUpdateSingleTaskNotesArgs = {
  id: Scalars['Int'];
  notes: Scalars['String'];
};


export type MutationUpdateTaskFriendProposalsArgs = {
  addedFriends: Array<Scalars['String']>;
  deletedFriend: Scalars['String'];
  id: Scalars['Float'];
  isAdding: Scalars['Boolean'];
};


export type MutationUpdateTaskNameArgs = {
  id: Scalars['Float'];
  taskName: Scalars['String'];
};


export type MutationUpdateTaskPodArgs = {
  id: Scalars['Float'];
  podId: Scalars['Float'];
};


export type MutationUpdateUserFriendRequestsArgs = {
  isAdding: Scalars['Boolean'];
  podId: Scalars['Int'];
  projectId: Scalars['Int'];
  username: Scalars['String'];
};

export type Pod = {
  __typename?: 'Pod';
  cap: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  isPrivate: Scalars['Boolean'];
  projectIds: Array<Scalars['Int']>;
  sessionType: Scalars['String'];
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
  friendProposals?: Maybe<Array<Scalars['String']>>;
  id: Scalars['Int'];
  milestoneDates: Array<Scalars['String']>;
  milestoneProgress: Array<Scalars['Int']>;
  milestones: Array<Scalars['String']>;
  overview: Scalars['String'];
  podId?: Maybe<Scalars['Int']>;
  projectName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId: Scalars['Int'];
};

export type ProjectInfoResponse = {
  __typename?: 'ProjectInfoResponse';
  errors?: Maybe<Array<FieldError>>;
  project?: Maybe<Project>;
};

export type ProjectInput = {
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
  findPublicPod: PodResponse;
  hello: Scalars['String'];
  me?: Maybe<User>;
  pod?: Maybe<PodResponse>;
  podProjects?: Maybe<Array<Project>>;
  podTasks?: Maybe<Array<RecurringTask>>;
  podUsers?: Maybe<Array<User>>;
  pods: Array<Pod>;
  project?: Maybe<ProjectResponse>;
  projects?: Maybe<Array<Project>>;
  recentPodSingleTasks?: Maybe<SingleTasksResponse>;
  recurringTask?: Maybe<RecurringTaskFieldResponse>;
  recurringTasks?: Maybe<Array<RecurringTask>>;
  sendEmails?: Maybe<Scalars['String']>;
  singleTask?: Maybe<SingleTaskResponse>;
  singleTasks?: Maybe<SingleTasksResponse>;
};


export type QueryFindPublicPodArgs = {
  cap: Scalars['Float'];
  projectId: Scalars['Float'];
  sessionType: Scalars['String'];
};


export type QueryPodArgs = {
  id: Scalars['Float'];
};


export type QueryPodProjectsArgs = {
  podId: Scalars['Int'];
};


export type QueryPodTasksArgs = {
  podId: Scalars['Int'];
};


export type QueryPodUsersArgs = {
  ids: Array<Scalars['Int']>;
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};


export type QueryRecentPodSingleTasksArgs = {
  taskIds: Array<Scalars['Int']>;
};


export type QueryRecurringTaskArgs = {
  id: Scalars['Int'];
};


export type QuerySendEmailsArgs = {
  message: Scalars['String'];
  subject: Scalars['String'];
  userIds: Array<Scalars['Int']>;
};


export type QuerySingleTaskArgs = {
  id: Scalars['Int'];
};


export type QuerySingleTasksArgs = {
  taskId: Scalars['Int'];
};

export type RecurringTask = {
  __typename?: 'RecurringTask';
  completedCount: Scalars['JSONObject'];
  createdAt: Scalars['DateTime'];
  cursorDate?: Maybe<Scalars['DateTime']>;
  days: Scalars['JSONObject'];
  endOptions: Scalars['JSONObject'];
  friendProposals?: Maybe<Array<Scalars['String']>>;
  id: Scalars['Int'];
  overview: Scalars['String'];
  podId?: Maybe<Scalars['Int']>;
  singleTasks?: Maybe<Array<SingleTask>>;
  startDate: Scalars['DateTime'];
  taskName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId: Scalars['Int'];
};

export type RecurringTaskFieldResponse = {
  __typename?: 'RecurringTaskFieldResponse';
  errors?: Maybe<Array<FieldError>>;
  task?: Maybe<RecurringTask>;
};

export type RecurringTaskInput = {
  days?: InputMaybe<Scalars['JSONObject']>;
  endOptions?: InputMaybe<Scalars['JSONObject']>;
  overview: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  taskName: Scalars['String'];
  userId: Scalars['Float'];
};

export type RecurringTaskResponse = {
  __typename?: 'RecurringTaskResponse';
  errors?: Maybe<Scalars['String']>;
  task?: Maybe<RecurringTask>;
};

export type SingleTask = {
  __typename?: 'SingleTask';
  actionDate?: Maybe<Scalars['DateTime']>;
  actionDay?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  recurringTask?: Maybe<RecurringTask>;
  status: Scalars['String'];
  taskId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId: Scalars['Int'];
};

export type SingleTaskInput = {
  actionDate?: InputMaybe<Scalars['DateTime']>;
  actionDay?: InputMaybe<Scalars['Float']>;
  notes: Scalars['String'];
  status: Scalars['String'];
  taskId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type SingleTaskResponse = {
  __typename?: 'SingleTaskResponse';
  errors?: Maybe<Scalars['String']>;
  singleTask?: Maybe<SingleTask>;
};

export type SingleTasksResponse = {
  __typename?: 'SingleTasksResponse';
  errors?: Maybe<Scalars['String']>;
  singleTasks?: Maybe<Array<SingleTask>>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  friendRequests?: Maybe<Array<Scalars['JSONObject']>>;
  hasCreatedTask: Scalars['Boolean'];
  id: Scalars['Int'];
  messagingSettings?: Maybe<Scalars['JSONObject']>;
  phone?: Maybe<Scalars['String']>;
  projects?: Maybe<Array<Project>>;
  recurringTasks: Array<RecurringTask>;
  singleTasks: Array<SingleTask>;
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

export type RegularPodFragment = { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, isPrivate: boolean, sessionType: string, userIds: Array<number> };

export type RegularProjectFragment = { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals?: Array<string> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null };

export type RegularRecurringTaskFragment = { __typename?: 'RecurringTask', userId: number, id: number, days: any, endOptions: any, startDate: any, createdAt: any, updatedAt: any, overview: string, podId?: number | null, taskName: string, cursorDate?: any | null, friendProposals?: Array<string> | null, completedCount: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null };

export type RegularSingleTaskFragment = { __typename?: 'SingleTask', actionDate?: any | null, actionDay?: number | null, status: string, id: number, notes?: string | null, userId: number, taskId: number, updatedAt: any, createdAt: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null };

export type RegularUserFragment = { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean };

export type AddProjectToPodMutationVariables = Exact<{
  projectId: Scalars['Float'];
  addProjectToPodId: Scalars['Float'];
}>;


export type AddProjectToPodMutation = { __typename?: 'Mutation', addProjectToPod: { __typename?: 'PodResponse', errors?: string | null, pod?: { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, isPrivate: boolean, sessionType: string, userIds: Array<number> } | null } };

export type CreatePodMutationVariables = Exact<{
  isPrivate: Scalars['Boolean'];
  cap: Scalars['Float'];
  sessionType: Scalars['String'];
}>;


export type CreatePodMutation = { __typename?: 'Mutation', createPod: { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, isPrivate: boolean, sessionType: string, userIds: Array<number> } };

export type RemoveProjectFromPodMutationVariables = Exact<{
  projectId: Scalars['Float'];
  removeProjectFromPodId: Scalars['Float'];
}>;


export type RemoveProjectFromPodMutation = { __typename?: 'Mutation', removeProjectFromPod: { __typename?: 'PodResponse', errors?: string | null, pod?: { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, isPrivate: boolean, sessionType: string, userIds: Array<number> } | null } };

export type AddProjectInfoMutationVariables = Exact<{
  projectOptions: ProjectInput;
}>;


export type AddProjectInfoMutation = { __typename?: 'Mutation', addProjectInfo: { __typename?: 'ProjectInfoResponse', project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals?: Array<string> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type DeleteProjectMutationVariables = Exact<{
  deleteProjectId: Scalars['Float'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type UpdateProjectFriendProposalsMutationVariables = Exact<{
  updateProjectFriendProposalsId: Scalars['Float'];
  isAdding: Scalars['Boolean'];
  addedFriends: Array<Scalars['String']> | Scalars['String'];
  deletedFriend: Scalars['String'];
}>;


export type UpdateProjectFriendProposalsMutation = { __typename?: 'Mutation', updateProjectFriendProposals?: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals?: Array<string> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } | null };

export type UpdateProjectMilestoneDatesMutationVariables = Exact<{
  milestoneDates: Array<Scalars['String']> | Scalars['String'];
  updateProjectMilestoneDatesId: Scalars['Float'];
}>;


export type UpdateProjectMilestoneDatesMutation = { __typename?: 'Mutation', updateProjectMilestoneDates: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals?: Array<string> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type UpdateProjectMilestonesMutationVariables = Exact<{
  milestones: Array<Scalars['String']> | Scalars['String'];
  updateProjectMilestonesId: Scalars['Float'];
}>;


export type UpdateProjectMilestonesMutation = { __typename?: 'Mutation', updateProjectMilestones: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals?: Array<string> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type UpdateProjectNameMutationVariables = Exact<{
  projectName: Scalars['String'];
  updateProjectNameId: Scalars['Float'];
}>;


export type UpdateProjectNameMutation = { __typename?: 'Mutation', updateProjectName: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals?: Array<string> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type UpdateProjectPodMutationVariables = Exact<{
  podId: Scalars['Float'];
  updateProjectPodId: Scalars['Float'];
}>;


export type UpdateProjectPodMutation = { __typename?: 'Mutation', updateProjectPod: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals?: Array<string> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type UpdateProjectProgressMutationVariables = Exact<{
  milestoneProgress: Array<Scalars['Int']> | Scalars['Int'];
  updateProjectProgressId: Scalars['Float'];
}>;


export type UpdateProjectProgressMutation = { __typename?: 'Mutation', updateProjectProgress: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals?: Array<string> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type CreateRecurringTaskMutationVariables = Exact<{
  recurringTaskOptions: RecurringTaskInput;
}>;


export type CreateRecurringTaskMutation = { __typename?: 'Mutation', createRecurringTask: { __typename?: 'RecurringTaskFieldResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, task?: { __typename?: 'RecurringTask', userId: number, id: number, days: any, endOptions: any, startDate: any, createdAt: any, updatedAt: any, overview: string, podId?: number | null, taskName: string, cursorDate?: any | null, friendProposals?: Array<string> | null, completedCount: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type DeleteRecurringTaskMutationVariables = Exact<{
  deleteRecurringTaskId: Scalars['Float'];
}>;


export type DeleteRecurringTaskMutation = { __typename?: 'Mutation', deleteRecurringTask: boolean };

export type UpdateCompletedCountMutationVariables = Exact<{
  completedCount: CompletedCountInput;
  updateCompletedCountId: Scalars['Float'];
}>;


export type UpdateCompletedCountMutation = { __typename?: 'Mutation', updateCompletedCount: { __typename?: 'RecurringTaskResponse', errors?: string | null, task?: { __typename?: 'RecurringTask', userId: number, id: number, days: any, endOptions: any, startDate: any, createdAt: any, updatedAt: any, overview: string, podId?: number | null, taskName: string, cursorDate?: any | null, friendProposals?: Array<string> | null, completedCount: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type UpdateTaskFriendProposalsMutationVariables = Exact<{
  updateTaskFriendProposalsId: Scalars['Float'];
  isAdding: Scalars['Boolean'];
  addedFriends: Array<Scalars['String']> | Scalars['String'];
  deletedFriend: Scalars['String'];
}>;


export type UpdateTaskFriendProposalsMutation = { __typename?: 'Mutation', updateTaskFriendProposals?: { __typename?: 'RecurringTaskResponse', errors?: string | null, task?: { __typename?: 'RecurringTask', userId: number, id: number, days: any, endOptions: any, startDate: any, createdAt: any, updatedAt: any, overview: string, podId?: number | null, taskName: string, cursorDate?: any | null, friendProposals?: Array<string> | null, completedCount: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } | null };

export type UpdateTaskNameMutationVariables = Exact<{
  taskName: Scalars['String'];
  updateTaskNameId: Scalars['Float'];
}>;


export type UpdateTaskNameMutation = { __typename?: 'Mutation', updateTaskName: { __typename?: 'RecurringTaskFieldResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, task?: { __typename?: 'RecurringTask', userId: number, id: number, days: any, endOptions: any, startDate: any, createdAt: any, updatedAt: any, overview: string, podId?: number | null, taskName: string, cursorDate?: any | null, friendProposals?: Array<string> | null, completedCount: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type UpdateTaskPodMutationVariables = Exact<{
  podId: Scalars['Float'];
  updateRecurringTaskPodId: Scalars['Float'];
}>;


export type UpdateTaskPodMutation = { __typename?: 'Mutation', updateTaskPod: { __typename?: 'RecurringTaskFieldResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, task?: { __typename?: 'RecurringTask', userId: number, id: number, days: any, endOptions: any, startDate: any, createdAt: any, updatedAt: any, overview: string, podId?: number | null, taskName: string, cursorDate?: any | null, friendProposals?: Array<string> | null, completedCount: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type AddSingleTaskMutationVariables = Exact<{
  singleTaskOptions: SingleTaskInput;
}>;


export type AddSingleTaskMutation = { __typename?: 'Mutation', addSingleTask: { __typename?: 'SingleTaskResponse', errors?: string | null, singleTask?: { __typename?: 'SingleTask', actionDate?: any | null, actionDay?: number | null, status: string, id: number, notes?: string | null, userId: number, taskId: number, updatedAt: any, createdAt: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type AddSingleTasksChunkMutationVariables = Exact<{
  limit: Scalars['Float'];
  recTaskId: Scalars['Float'];
}>;


export type AddSingleTasksChunkMutation = { __typename?: 'Mutation', addSingleTasksChunk: { __typename?: 'SingleTasksResponse', errors?: string | null, singleTasks?: Array<{ __typename?: 'SingleTask', actionDate?: any | null, actionDay?: number | null, status: string, id: number, notes?: string | null, userId: number, taskId: number, updatedAt: any, createdAt: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null }> | null } };

export type UpdateSingleTaskNotesMutationVariables = Exact<{
  updateSingleTaskNotesId: Scalars['Int'];
  notes: Scalars['String'];
}>;


export type UpdateSingleTaskNotesMutation = { __typename?: 'Mutation', updateSingleTaskNotes: { __typename?: 'SingleTaskResponse', errors?: string | null, singleTask?: { __typename?: 'SingleTask', actionDate?: any | null, actionDay?: number | null, status: string, id: number, notes?: string | null, userId: number, taskId: number, updatedAt: any, createdAt: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type UpdateSingleTaskCompletionStatusMutationVariables = Exact<{
  updateSingleTaskCompletionStatusId: Scalars['Int'];
  status: Scalars['String'];
}>;


export type UpdateSingleTaskCompletionStatusMutation = { __typename?: 'Mutation', updateSingleTaskCompletionStatus: { __typename?: 'SingleTaskResponse', errors?: string | null, singleTask?: { __typename?: 'SingleTask', actionDate?: any | null, actionDay?: number | null, status: string, id: number, notes?: string | null, userId: number, taskId: number, updatedAt: any, createdAt: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } };

export type UpdatePhoneMutationVariables = Exact<{
  phone: Scalars['String'];
  updatePhoneId: Scalars['Float'];
}>;


export type UpdatePhoneMutation = { __typename?: 'Mutation', updatePhone?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type UpdateHasCreatedTaskMutationVariables = Exact<{
  hasCreated: Scalars['Boolean'];
}>;


export type UpdateHasCreatedTaskMutation = { __typename?: 'Mutation', updateHasCreatedTask: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } };

export type UpdateMessagingSettingsMutationVariables = Exact<{
  messagingSettings: Scalars['JSONObject'];
}>;


export type UpdateMessagingSettingsMutation = { __typename?: 'Mutation', updateMessagingSettings: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } };

export type UpdateUserFriendRequestsMutationVariables = Exact<{
  username: Scalars['String'];
  projectId: Scalars['Int'];
  podId: Scalars['Int'];
  isAdding: Scalars['Boolean'];
}>;


export type UpdateUserFriendRequestsMutation = { __typename?: 'Mutation', updateUserFriendRequests?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null };

export type FindPublicPodQueryVariables = Exact<{
  projectId: Scalars['Float'];
  cap: Scalars['Float'];
  sessionType: Scalars['String'];
}>;


export type FindPublicPodQuery = { __typename?: 'Query', findPublicPod: { __typename?: 'PodResponse', errors?: string | null, pod?: { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, isPrivate: boolean, sessionType: string, userIds: Array<number> } | null } };

export type PodQueryVariables = Exact<{
  podId: Scalars['Float'];
}>;


export type PodQuery = { __typename?: 'Query', pod?: { __typename?: 'PodResponse', errors?: string | null, pod?: { __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, isPrivate: boolean, sessionType: string, userIds: Array<number> } | null } | null };

export type PodProjectsQueryVariables = Exact<{
  podId: Scalars['Int'];
}>;


export type PodProjectsQuery = { __typename?: 'Query', podProjects?: Array<{ __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals?: Array<string> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null }> | null };

export type PodUsersQueryVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type PodUsersQuery = { __typename?: 'Query', podUsers?: Array<{ __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean }> | null };

export type PodsQueryVariables = Exact<{ [key: string]: never; }>;


export type PodsQuery = { __typename?: 'Query', pods: Array<{ __typename?: 'Pod', id: number, cap: number, projectIds: Array<number>, updatedAt: any, createdAt: any, isPrivate: boolean, sessionType: string, userIds: Array<number> }> };

export type ProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'ProjectResponse', errors?: string | null, project?: { __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals?: Array<string> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } | null };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', userId: number, id: number, milestoneDates: Array<string>, milestones: Array<string>, milestoneProgress: Array<number>, createdAt: any, updatedAt: any, overview: string, podId?: number | null, projectName: string, friendProposals?: Array<string> | null, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null }> | null };

export type PodTasksQueryVariables = Exact<{
  podId: Scalars['Int'];
}>;


export type PodTasksQuery = { __typename?: 'Query', podTasks?: Array<{ __typename?: 'RecurringTask', userId: number, id: number, days: any, endOptions: any, startDate: any, createdAt: any, updatedAt: any, overview: string, podId?: number | null, taskName: string, cursorDate?: any | null, friendProposals?: Array<string> | null, completedCount: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null }> | null };

export type RecurringTaskQueryVariables = Exact<{
  recurringTaskId: Scalars['Int'];
}>;


export type RecurringTaskQuery = { __typename?: 'Query', recurringTask?: { __typename?: 'RecurringTaskFieldResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, task?: { __typename?: 'RecurringTask', userId: number, id: number, days: any, endOptions: any, startDate: any, createdAt: any, updatedAt: any, overview: string, podId?: number | null, taskName: string, cursorDate?: any | null, friendProposals?: Array<string> | null, completedCount: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } | null };

export type RecurringTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type RecurringTasksQuery = { __typename?: 'Query', recurringTasks?: Array<{ __typename?: 'RecurringTask', userId: number, id: number, days: any, endOptions: any, startDate: any, createdAt: any, updatedAt: any, overview: string, podId?: number | null, taskName: string, cursorDate?: any | null, friendProposals?: Array<string> | null, completedCount: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null }> | null };

export type RecentPodSingleTasksQueryVariables = Exact<{
  taskIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type RecentPodSingleTasksQuery = { __typename?: 'Query', recentPodSingleTasks?: { __typename?: 'SingleTasksResponse', errors?: string | null, singleTasks?: Array<{ __typename?: 'SingleTask', actionDate?: any | null, actionDay?: number | null, status: string, id: number, notes?: string | null, userId: number, taskId: number, updatedAt: any, createdAt: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null }> | null } | null };

export type SingleTaskQueryVariables = Exact<{
  singleTaskId: Scalars['Int'];
}>;


export type SingleTaskQuery = { __typename?: 'Query', singleTask?: { __typename?: 'SingleTaskResponse', errors?: string | null, singleTask?: { __typename?: 'SingleTask', actionDate?: any | null, actionDay?: number | null, status: string, id: number, notes?: string | null, userId: number, taskId: number, updatedAt: any, createdAt: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null } | null } | null };

export type SingleTasksQueryVariables = Exact<{
  taskId: Scalars['Int'];
}>;


export type SingleTasksQuery = { __typename?: 'Query', singleTasks?: { __typename?: 'SingleTasksResponse', errors?: string | null, singleTasks?: Array<{ __typename?: 'SingleTask', actionDate?: any | null, actionDay?: number | null, status: string, id: number, notes?: string | null, userId: number, taskId: number, updatedAt: any, createdAt: any, user?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null }> | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', createdAt: any, email: string, phone?: string | null, id: number, updatedAt: any, username: string, friendRequests?: Array<any> | null, avatar?: number | null, messagingSettings?: any | null, hasCreatedTask: boolean } | null };

export type SendEmailsQueryVariables = Exact<{
  subject: Scalars['String'];
  message: Scalars['String'];
  userIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type SendEmailsQuery = { __typename?: 'Query', sendEmails?: string | null };

export const RegularPodFragmentDoc = gql`
    fragment RegularPod on Pod {
  id
  cap
  projectIds
  updatedAt
  createdAt
  isPrivate
  sessionType
  userIds
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
  avatar
  messagingSettings
  hasCreatedTask
}
    `;
export const RegularProjectFragmentDoc = gql`
    fragment RegularProject on Project {
  userId
  id
  milestoneDates
  milestones
  milestoneProgress
  createdAt
  updatedAt
  overview
  podId
  projectName
  friendProposals
  user {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularRecurringTaskFragmentDoc = gql`
    fragment RegularRecurringTask on RecurringTask {
  userId
  id
  days
  endOptions
  startDate
  endOptions
  createdAt
  updatedAt
  overview
  podId
  taskName
  cursorDate
  friendProposals
  completedCount
  user {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularSingleTaskFragmentDoc = gql`
    fragment RegularSingleTask on SingleTask {
  actionDate
  actionDay
  status
  id
  notes
  userId
  taskId
  updatedAt
  createdAt
  user {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
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
    mutation CreatePod($isPrivate: Boolean!, $cap: Float!, $sessionType: String!) {
  createPod(isPrivate: $isPrivate, cap: $cap, sessionType: $sessionType) {
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
 *      isPrivate: // value for 'isPrivate'
 *      cap: // value for 'cap'
 *      sessionType: // value for 'sessionType'
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
export const UpdateProjectFriendProposalsDocument = gql`
    mutation UpdateProjectFriendProposals($updateProjectFriendProposalsId: Float!, $isAdding: Boolean!, $addedFriends: [String!]!, $deletedFriend: String!) {
  updateProjectFriendProposals(
    id: $updateProjectFriendProposalsId
    isAdding: $isAdding
    deletedFriend: $deletedFriend
    addedFriends: $addedFriends
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
 *      updateProjectFriendProposalsId: // value for 'updateProjectFriendProposalsId'
 *      isAdding: // value for 'isAdding'
 *      addedFriends: // value for 'addedFriends'
 *      deletedFriend: // value for 'deletedFriend'
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
export const CreateRecurringTaskDocument = gql`
    mutation CreateRecurringTask($recurringTaskOptions: RecurringTaskInput!) {
  createRecurringTask(recurringTaskOptions: $recurringTaskOptions) {
    errors {
      field
      message
    }
    task {
      ...RegularRecurringTask
    }
  }
}
    ${RegularRecurringTaskFragmentDoc}`;
export type CreateRecurringTaskMutationFn = Apollo.MutationFunction<CreateRecurringTaskMutation, CreateRecurringTaskMutationVariables>;

/**
 * __useCreateRecurringTaskMutation__
 *
 * To run a mutation, you first call `useCreateRecurringTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecurringTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecurringTaskMutation, { data, loading, error }] = useCreateRecurringTaskMutation({
 *   variables: {
 *      recurringTaskOptions: // value for 'recurringTaskOptions'
 *   },
 * });
 */
export function useCreateRecurringTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateRecurringTaskMutation, CreateRecurringTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRecurringTaskMutation, CreateRecurringTaskMutationVariables>(CreateRecurringTaskDocument, options);
      }
export type CreateRecurringTaskMutationHookResult = ReturnType<typeof useCreateRecurringTaskMutation>;
export type CreateRecurringTaskMutationResult = Apollo.MutationResult<CreateRecurringTaskMutation>;
export type CreateRecurringTaskMutationOptions = Apollo.BaseMutationOptions<CreateRecurringTaskMutation, CreateRecurringTaskMutationVariables>;
export const DeleteRecurringTaskDocument = gql`
    mutation DeleteRecurringTask($deleteRecurringTaskId: Float!) {
  deleteRecurringTask(id: $deleteRecurringTaskId)
}
    `;
export type DeleteRecurringTaskMutationFn = Apollo.MutationFunction<DeleteRecurringTaskMutation, DeleteRecurringTaskMutationVariables>;

/**
 * __useDeleteRecurringTaskMutation__
 *
 * To run a mutation, you first call `useDeleteRecurringTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecurringTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecurringTaskMutation, { data, loading, error }] = useDeleteRecurringTaskMutation({
 *   variables: {
 *      deleteRecurringTaskId: // value for 'deleteRecurringTaskId'
 *   },
 * });
 */
export function useDeleteRecurringTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRecurringTaskMutation, DeleteRecurringTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRecurringTaskMutation, DeleteRecurringTaskMutationVariables>(DeleteRecurringTaskDocument, options);
      }
export type DeleteRecurringTaskMutationHookResult = ReturnType<typeof useDeleteRecurringTaskMutation>;
export type DeleteRecurringTaskMutationResult = Apollo.MutationResult<DeleteRecurringTaskMutation>;
export type DeleteRecurringTaskMutationOptions = Apollo.BaseMutationOptions<DeleteRecurringTaskMutation, DeleteRecurringTaskMutationVariables>;
export const UpdateCompletedCountDocument = gql`
    mutation UpdateCompletedCount($completedCount: CompletedCountInput!, $updateCompletedCountId: Float!) {
  updateCompletedCount(
    completedCount: $completedCount
    id: $updateCompletedCountId
  ) {
    errors
    task {
      ...RegularRecurringTask
    }
  }
}
    ${RegularRecurringTaskFragmentDoc}`;
export type UpdateCompletedCountMutationFn = Apollo.MutationFunction<UpdateCompletedCountMutation, UpdateCompletedCountMutationVariables>;

/**
 * __useUpdateCompletedCountMutation__
 *
 * To run a mutation, you first call `useUpdateCompletedCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompletedCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompletedCountMutation, { data, loading, error }] = useUpdateCompletedCountMutation({
 *   variables: {
 *      completedCount: // value for 'completedCount'
 *      updateCompletedCountId: // value for 'updateCompletedCountId'
 *   },
 * });
 */
export function useUpdateCompletedCountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompletedCountMutation, UpdateCompletedCountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompletedCountMutation, UpdateCompletedCountMutationVariables>(UpdateCompletedCountDocument, options);
      }
export type UpdateCompletedCountMutationHookResult = ReturnType<typeof useUpdateCompletedCountMutation>;
export type UpdateCompletedCountMutationResult = Apollo.MutationResult<UpdateCompletedCountMutation>;
export type UpdateCompletedCountMutationOptions = Apollo.BaseMutationOptions<UpdateCompletedCountMutation, UpdateCompletedCountMutationVariables>;
export const UpdateTaskFriendProposalsDocument = gql`
    mutation UpdateTaskFriendProposals($updateTaskFriendProposalsId: Float!, $isAdding: Boolean!, $addedFriends: [String!]!, $deletedFriend: String!) {
  updateTaskFriendProposals(
    id: $updateTaskFriendProposalsId
    isAdding: $isAdding
    deletedFriend: $deletedFriend
    addedFriends: $addedFriends
  ) {
    errors
    task {
      ...RegularRecurringTask
    }
  }
}
    ${RegularRecurringTaskFragmentDoc}`;
export type UpdateTaskFriendProposalsMutationFn = Apollo.MutationFunction<UpdateTaskFriendProposalsMutation, UpdateTaskFriendProposalsMutationVariables>;

/**
 * __useUpdateTaskFriendProposalsMutation__
 *
 * To run a mutation, you first call `useUpdateTaskFriendProposalsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskFriendProposalsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskFriendProposalsMutation, { data, loading, error }] = useUpdateTaskFriendProposalsMutation({
 *   variables: {
 *      updateTaskFriendProposalsId: // value for 'updateTaskFriendProposalsId'
 *      isAdding: // value for 'isAdding'
 *      addedFriends: // value for 'addedFriends'
 *      deletedFriend: // value for 'deletedFriend'
 *   },
 * });
 */
export function useUpdateTaskFriendProposalsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskFriendProposalsMutation, UpdateTaskFriendProposalsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskFriendProposalsMutation, UpdateTaskFriendProposalsMutationVariables>(UpdateTaskFriendProposalsDocument, options);
      }
export type UpdateTaskFriendProposalsMutationHookResult = ReturnType<typeof useUpdateTaskFriendProposalsMutation>;
export type UpdateTaskFriendProposalsMutationResult = Apollo.MutationResult<UpdateTaskFriendProposalsMutation>;
export type UpdateTaskFriendProposalsMutationOptions = Apollo.BaseMutationOptions<UpdateTaskFriendProposalsMutation, UpdateTaskFriendProposalsMutationVariables>;
export const UpdateTaskNameDocument = gql`
    mutation UpdateTaskName($taskName: String!, $updateTaskNameId: Float!) {
  updateTaskName(taskName: $taskName, id: $updateTaskNameId) {
    errors {
      field
      message
    }
    task {
      ...RegularRecurringTask
    }
  }
}
    ${RegularRecurringTaskFragmentDoc}`;
export type UpdateTaskNameMutationFn = Apollo.MutationFunction<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>;

/**
 * __useUpdateTaskNameMutation__
 *
 * To run a mutation, you first call `useUpdateTaskNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskNameMutation, { data, loading, error }] = useUpdateTaskNameMutation({
 *   variables: {
 *      taskName: // value for 'taskName'
 *      updateTaskNameId: // value for 'updateTaskNameId'
 *   },
 * });
 */
export function useUpdateTaskNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>(UpdateTaskNameDocument, options);
      }
export type UpdateTaskNameMutationHookResult = ReturnType<typeof useUpdateTaskNameMutation>;
export type UpdateTaskNameMutationResult = Apollo.MutationResult<UpdateTaskNameMutation>;
export type UpdateTaskNameMutationOptions = Apollo.BaseMutationOptions<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>;
export const UpdateTaskPodDocument = gql`
    mutation UpdateTaskPod($podId: Float!, $updateRecurringTaskPodId: Float!) {
  updateTaskPod(podId: $podId, id: $updateRecurringTaskPodId) {
    errors {
      field
      message
    }
    task {
      ...RegularRecurringTask
    }
  }
}
    ${RegularRecurringTaskFragmentDoc}`;
export type UpdateTaskPodMutationFn = Apollo.MutationFunction<UpdateTaskPodMutation, UpdateTaskPodMutationVariables>;

/**
 * __useUpdateTaskPodMutation__
 *
 * To run a mutation, you first call `useUpdateTaskPodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskPodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskPodMutation, { data, loading, error }] = useUpdateTaskPodMutation({
 *   variables: {
 *      podId: // value for 'podId'
 *      updateRecurringTaskPodId: // value for 'updateRecurringTaskPodId'
 *   },
 * });
 */
export function useUpdateTaskPodMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskPodMutation, UpdateTaskPodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskPodMutation, UpdateTaskPodMutationVariables>(UpdateTaskPodDocument, options);
      }
export type UpdateTaskPodMutationHookResult = ReturnType<typeof useUpdateTaskPodMutation>;
export type UpdateTaskPodMutationResult = Apollo.MutationResult<UpdateTaskPodMutation>;
export type UpdateTaskPodMutationOptions = Apollo.BaseMutationOptions<UpdateTaskPodMutation, UpdateTaskPodMutationVariables>;
export const AddSingleTaskDocument = gql`
    mutation AddSingleTask($singleTaskOptions: SingleTaskInput!) {
  addSingleTask(singleTaskOptions: $singleTaskOptions) {
    errors
    singleTask {
      ...RegularSingleTask
    }
  }
}
    ${RegularSingleTaskFragmentDoc}`;
export type AddSingleTaskMutationFn = Apollo.MutationFunction<AddSingleTaskMutation, AddSingleTaskMutationVariables>;

/**
 * __useAddSingleTaskMutation__
 *
 * To run a mutation, you first call `useAddSingleTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSingleTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSingleTaskMutation, { data, loading, error }] = useAddSingleTaskMutation({
 *   variables: {
 *      singleTaskOptions: // value for 'singleTaskOptions'
 *   },
 * });
 */
export function useAddSingleTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddSingleTaskMutation, AddSingleTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSingleTaskMutation, AddSingleTaskMutationVariables>(AddSingleTaskDocument, options);
      }
export type AddSingleTaskMutationHookResult = ReturnType<typeof useAddSingleTaskMutation>;
export type AddSingleTaskMutationResult = Apollo.MutationResult<AddSingleTaskMutation>;
export type AddSingleTaskMutationOptions = Apollo.BaseMutationOptions<AddSingleTaskMutation, AddSingleTaskMutationVariables>;
export const AddSingleTasksChunkDocument = gql`
    mutation AddSingleTasksChunk($limit: Float!, $recTaskId: Float!) {
  addSingleTasksChunk(limit: $limit, recTaskId: $recTaskId) {
    errors
    singleTasks {
      ...RegularSingleTask
    }
  }
}
    ${RegularSingleTaskFragmentDoc}`;
export type AddSingleTasksChunkMutationFn = Apollo.MutationFunction<AddSingleTasksChunkMutation, AddSingleTasksChunkMutationVariables>;

/**
 * __useAddSingleTasksChunkMutation__
 *
 * To run a mutation, you first call `useAddSingleTasksChunkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSingleTasksChunkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSingleTasksChunkMutation, { data, loading, error }] = useAddSingleTasksChunkMutation({
 *   variables: {
 *      limit: // value for 'limit'
 *      recTaskId: // value for 'recTaskId'
 *   },
 * });
 */
export function useAddSingleTasksChunkMutation(baseOptions?: Apollo.MutationHookOptions<AddSingleTasksChunkMutation, AddSingleTasksChunkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSingleTasksChunkMutation, AddSingleTasksChunkMutationVariables>(AddSingleTasksChunkDocument, options);
      }
export type AddSingleTasksChunkMutationHookResult = ReturnType<typeof useAddSingleTasksChunkMutation>;
export type AddSingleTasksChunkMutationResult = Apollo.MutationResult<AddSingleTasksChunkMutation>;
export type AddSingleTasksChunkMutationOptions = Apollo.BaseMutationOptions<AddSingleTasksChunkMutation, AddSingleTasksChunkMutationVariables>;
export const UpdateSingleTaskNotesDocument = gql`
    mutation UpdateSingleTaskNotes($updateSingleTaskNotesId: Int!, $notes: String!) {
  updateSingleTaskNotes(id: $updateSingleTaskNotesId, notes: $notes) {
    errors
    singleTask {
      ...RegularSingleTask
    }
  }
}
    ${RegularSingleTaskFragmentDoc}`;
export type UpdateSingleTaskNotesMutationFn = Apollo.MutationFunction<UpdateSingleTaskNotesMutation, UpdateSingleTaskNotesMutationVariables>;

/**
 * __useUpdateSingleTaskNotesMutation__
 *
 * To run a mutation, you first call `useUpdateSingleTaskNotesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSingleTaskNotesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSingleTaskNotesMutation, { data, loading, error }] = useUpdateSingleTaskNotesMutation({
 *   variables: {
 *      updateSingleTaskNotesId: // value for 'updateSingleTaskNotesId'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useUpdateSingleTaskNotesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSingleTaskNotesMutation, UpdateSingleTaskNotesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSingleTaskNotesMutation, UpdateSingleTaskNotesMutationVariables>(UpdateSingleTaskNotesDocument, options);
      }
export type UpdateSingleTaskNotesMutationHookResult = ReturnType<typeof useUpdateSingleTaskNotesMutation>;
export type UpdateSingleTaskNotesMutationResult = Apollo.MutationResult<UpdateSingleTaskNotesMutation>;
export type UpdateSingleTaskNotesMutationOptions = Apollo.BaseMutationOptions<UpdateSingleTaskNotesMutation, UpdateSingleTaskNotesMutationVariables>;
export const UpdateSingleTaskCompletionStatusDocument = gql`
    mutation UpdateSingleTaskCompletionStatus($updateSingleTaskCompletionStatusId: Int!, $status: String!) {
  updateSingleTaskCompletionStatus(
    id: $updateSingleTaskCompletionStatusId
    status: $status
  ) {
    errors
    singleTask {
      ...RegularSingleTask
    }
  }
}
    ${RegularSingleTaskFragmentDoc}`;
export type UpdateSingleTaskCompletionStatusMutationFn = Apollo.MutationFunction<UpdateSingleTaskCompletionStatusMutation, UpdateSingleTaskCompletionStatusMutationVariables>;

/**
 * __useUpdateSingleTaskCompletionStatusMutation__
 *
 * To run a mutation, you first call `useUpdateSingleTaskCompletionStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSingleTaskCompletionStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSingleTaskCompletionStatusMutation, { data, loading, error }] = useUpdateSingleTaskCompletionStatusMutation({
 *   variables: {
 *      updateSingleTaskCompletionStatusId: // value for 'updateSingleTaskCompletionStatusId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateSingleTaskCompletionStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSingleTaskCompletionStatusMutation, UpdateSingleTaskCompletionStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSingleTaskCompletionStatusMutation, UpdateSingleTaskCompletionStatusMutationVariables>(UpdateSingleTaskCompletionStatusDocument, options);
      }
export type UpdateSingleTaskCompletionStatusMutationHookResult = ReturnType<typeof useUpdateSingleTaskCompletionStatusMutation>;
export type UpdateSingleTaskCompletionStatusMutationResult = Apollo.MutationResult<UpdateSingleTaskCompletionStatusMutation>;
export type UpdateSingleTaskCompletionStatusMutationOptions = Apollo.BaseMutationOptions<UpdateSingleTaskCompletionStatusMutation, UpdateSingleTaskCompletionStatusMutationVariables>;
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
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
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
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser {
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
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const UpdateHasCreatedTaskDocument = gql`
    mutation UpdateHasCreatedTask($hasCreated: Boolean!) {
  updateHasCreatedTask(hasCreated: $hasCreated) {
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
export type UpdateHasCreatedTaskMutationFn = Apollo.MutationFunction<UpdateHasCreatedTaskMutation, UpdateHasCreatedTaskMutationVariables>;

/**
 * __useUpdateHasCreatedTaskMutation__
 *
 * To run a mutation, you first call `useUpdateHasCreatedTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHasCreatedTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHasCreatedTaskMutation, { data, loading, error }] = useUpdateHasCreatedTaskMutation({
 *   variables: {
 *      hasCreated: // value for 'hasCreated'
 *   },
 * });
 */
export function useUpdateHasCreatedTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHasCreatedTaskMutation, UpdateHasCreatedTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHasCreatedTaskMutation, UpdateHasCreatedTaskMutationVariables>(UpdateHasCreatedTaskDocument, options);
      }
export type UpdateHasCreatedTaskMutationHookResult = ReturnType<typeof useUpdateHasCreatedTaskMutation>;
export type UpdateHasCreatedTaskMutationResult = Apollo.MutationResult<UpdateHasCreatedTaskMutation>;
export type UpdateHasCreatedTaskMutationOptions = Apollo.BaseMutationOptions<UpdateHasCreatedTaskMutation, UpdateHasCreatedTaskMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
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
 *      email: // value for 'email'
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
export const UpdateMessagingSettingsDocument = gql`
    mutation UpdateMessagingSettings($messagingSettings: JSONObject!) {
  updateMessagingSettings(messagingSettings: $messagingSettings) {
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
export type UpdateMessagingSettingsMutationFn = Apollo.MutationFunction<UpdateMessagingSettingsMutation, UpdateMessagingSettingsMutationVariables>;

/**
 * __useUpdateMessagingSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateMessagingSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessagingSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessagingSettingsMutation, { data, loading, error }] = useUpdateMessagingSettingsMutation({
 *   variables: {
 *      messagingSettings: // value for 'messagingSettings'
 *   },
 * });
 */
export function useUpdateMessagingSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMessagingSettingsMutation, UpdateMessagingSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMessagingSettingsMutation, UpdateMessagingSettingsMutationVariables>(UpdateMessagingSettingsDocument, options);
      }
export type UpdateMessagingSettingsMutationHookResult = ReturnType<typeof useUpdateMessagingSettingsMutation>;
export type UpdateMessagingSettingsMutationResult = Apollo.MutationResult<UpdateMessagingSettingsMutation>;
export type UpdateMessagingSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateMessagingSettingsMutation, UpdateMessagingSettingsMutationVariables>;
export const UpdateUserFriendRequestsDocument = gql`
    mutation UpdateUserFriendRequests($username: String!, $projectId: Int!, $podId: Int!, $isAdding: Boolean!) {
  updateUserFriendRequests(
    username: $username
    projectId: $projectId
    podId: $podId
    isAdding: $isAdding
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
 *      username: // value for 'username'
 *      projectId: // value for 'projectId'
 *      podId: // value for 'podId'
 *      isAdding: // value for 'isAdding'
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
export const FindPublicPodDocument = gql`
    query FindPublicPod($projectId: Float!, $cap: Float!, $sessionType: String!) {
  findPublicPod(projectId: $projectId, cap: $cap, sessionType: $sessionType) {
    errors
    pod {
      ...RegularPod
    }
  }
}
    ${RegularPodFragmentDoc}`;

/**
 * __useFindPublicPodQuery__
 *
 * To run a query within a React component, call `useFindPublicPodQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPublicPodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPublicPodQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      cap: // value for 'cap'
 *      sessionType: // value for 'sessionType'
 *   },
 * });
 */
export function useFindPublicPodQuery(baseOptions: Apollo.QueryHookOptions<FindPublicPodQuery, FindPublicPodQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPublicPodQuery, FindPublicPodQueryVariables>(FindPublicPodDocument, options);
      }
export function useFindPublicPodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPublicPodQuery, FindPublicPodQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPublicPodQuery, FindPublicPodQueryVariables>(FindPublicPodDocument, options);
        }
export type FindPublicPodQueryHookResult = ReturnType<typeof useFindPublicPodQuery>;
export type FindPublicPodLazyQueryHookResult = ReturnType<typeof useFindPublicPodLazyQuery>;
export type FindPublicPodQueryResult = Apollo.QueryResult<FindPublicPodQuery, FindPublicPodQueryVariables>;
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
export const PodTasksDocument = gql`
    query PodTasks($podId: Int!) {
  podTasks(podId: $podId) {
    ...RegularRecurringTask
  }
}
    ${RegularRecurringTaskFragmentDoc}`;

/**
 * __usePodTasksQuery__
 *
 * To run a query within a React component, call `usePodTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `usePodTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePodTasksQuery({
 *   variables: {
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function usePodTasksQuery(baseOptions: Apollo.QueryHookOptions<PodTasksQuery, PodTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PodTasksQuery, PodTasksQueryVariables>(PodTasksDocument, options);
      }
export function usePodTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PodTasksQuery, PodTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PodTasksQuery, PodTasksQueryVariables>(PodTasksDocument, options);
        }
export type PodTasksQueryHookResult = ReturnType<typeof usePodTasksQuery>;
export type PodTasksLazyQueryHookResult = ReturnType<typeof usePodTasksLazyQuery>;
export type PodTasksQueryResult = Apollo.QueryResult<PodTasksQuery, PodTasksQueryVariables>;
export const RecurringTaskDocument = gql`
    query RecurringTask($recurringTaskId: Int!) {
  recurringTask(id: $recurringTaskId) {
    errors {
      field
      message
    }
    task {
      ...RegularRecurringTask
    }
  }
}
    ${RegularRecurringTaskFragmentDoc}`;

/**
 * __useRecurringTaskQuery__
 *
 * To run a query within a React component, call `useRecurringTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecurringTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecurringTaskQuery({
 *   variables: {
 *      recurringTaskId: // value for 'recurringTaskId'
 *   },
 * });
 */
export function useRecurringTaskQuery(baseOptions: Apollo.QueryHookOptions<RecurringTaskQuery, RecurringTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecurringTaskQuery, RecurringTaskQueryVariables>(RecurringTaskDocument, options);
      }
export function useRecurringTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecurringTaskQuery, RecurringTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecurringTaskQuery, RecurringTaskQueryVariables>(RecurringTaskDocument, options);
        }
export type RecurringTaskQueryHookResult = ReturnType<typeof useRecurringTaskQuery>;
export type RecurringTaskLazyQueryHookResult = ReturnType<typeof useRecurringTaskLazyQuery>;
export type RecurringTaskQueryResult = Apollo.QueryResult<RecurringTaskQuery, RecurringTaskQueryVariables>;
export const RecurringTasksDocument = gql`
    query RecurringTasks {
  recurringTasks {
    ...RegularRecurringTask
  }
}
    ${RegularRecurringTaskFragmentDoc}`;

/**
 * __useRecurringTasksQuery__
 *
 * To run a query within a React component, call `useRecurringTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecurringTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecurringTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecurringTasksQuery(baseOptions?: Apollo.QueryHookOptions<RecurringTasksQuery, RecurringTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecurringTasksQuery, RecurringTasksQueryVariables>(RecurringTasksDocument, options);
      }
export function useRecurringTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecurringTasksQuery, RecurringTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecurringTasksQuery, RecurringTasksQueryVariables>(RecurringTasksDocument, options);
        }
export type RecurringTasksQueryHookResult = ReturnType<typeof useRecurringTasksQuery>;
export type RecurringTasksLazyQueryHookResult = ReturnType<typeof useRecurringTasksLazyQuery>;
export type RecurringTasksQueryResult = Apollo.QueryResult<RecurringTasksQuery, RecurringTasksQueryVariables>;
export const RecentPodSingleTasksDocument = gql`
    query RecentPodSingleTasks($taskIds: [Int!]!) {
  recentPodSingleTasks(taskIds: $taskIds) {
    errors
    singleTasks {
      ...RegularSingleTask
    }
  }
}
    ${RegularSingleTaskFragmentDoc}`;

/**
 * __useRecentPodSingleTasksQuery__
 *
 * To run a query within a React component, call `useRecentPodSingleTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentPodSingleTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentPodSingleTasksQuery({
 *   variables: {
 *      taskIds: // value for 'taskIds'
 *   },
 * });
 */
export function useRecentPodSingleTasksQuery(baseOptions: Apollo.QueryHookOptions<RecentPodSingleTasksQuery, RecentPodSingleTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentPodSingleTasksQuery, RecentPodSingleTasksQueryVariables>(RecentPodSingleTasksDocument, options);
      }
export function useRecentPodSingleTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentPodSingleTasksQuery, RecentPodSingleTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentPodSingleTasksQuery, RecentPodSingleTasksQueryVariables>(RecentPodSingleTasksDocument, options);
        }
export type RecentPodSingleTasksQueryHookResult = ReturnType<typeof useRecentPodSingleTasksQuery>;
export type RecentPodSingleTasksLazyQueryHookResult = ReturnType<typeof useRecentPodSingleTasksLazyQuery>;
export type RecentPodSingleTasksQueryResult = Apollo.QueryResult<RecentPodSingleTasksQuery, RecentPodSingleTasksQueryVariables>;
export const SingleTaskDocument = gql`
    query SingleTask($singleTaskId: Int!) {
  singleTask(id: $singleTaskId) {
    errors
    singleTask {
      ...RegularSingleTask
    }
  }
}
    ${RegularSingleTaskFragmentDoc}`;

/**
 * __useSingleTaskQuery__
 *
 * To run a query within a React component, call `useSingleTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleTaskQuery({
 *   variables: {
 *      singleTaskId: // value for 'singleTaskId'
 *   },
 * });
 */
export function useSingleTaskQuery(baseOptions: Apollo.QueryHookOptions<SingleTaskQuery, SingleTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleTaskQuery, SingleTaskQueryVariables>(SingleTaskDocument, options);
      }
export function useSingleTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleTaskQuery, SingleTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleTaskQuery, SingleTaskQueryVariables>(SingleTaskDocument, options);
        }
export type SingleTaskQueryHookResult = ReturnType<typeof useSingleTaskQuery>;
export type SingleTaskLazyQueryHookResult = ReturnType<typeof useSingleTaskLazyQuery>;
export type SingleTaskQueryResult = Apollo.QueryResult<SingleTaskQuery, SingleTaskQueryVariables>;
export const SingleTasksDocument = gql`
    query SingleTasks($taskId: Int!) {
  singleTasks(taskId: $taskId) {
    errors
    singleTasks {
      ...RegularSingleTask
    }
  }
}
    ${RegularSingleTaskFragmentDoc}`;

/**
 * __useSingleTasksQuery__
 *
 * To run a query within a React component, call `useSingleTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleTasksQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useSingleTasksQuery(baseOptions: Apollo.QueryHookOptions<SingleTasksQuery, SingleTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleTasksQuery, SingleTasksQueryVariables>(SingleTasksDocument, options);
      }
export function useSingleTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleTasksQuery, SingleTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleTasksQuery, SingleTasksQueryVariables>(SingleTasksDocument, options);
        }
export type SingleTasksQueryHookResult = ReturnType<typeof useSingleTasksQuery>;
export type SingleTasksLazyQueryHookResult = ReturnType<typeof useSingleTasksLazyQuery>;
export type SingleTasksQueryResult = Apollo.QueryResult<SingleTasksQuery, SingleTasksQueryVariables>;
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
export const SendEmailsDocument = gql`
    query SendEmails($subject: String!, $message: String!, $userIds: [Int!]!) {
  sendEmails(subject: $subject, message: $message, userIds: $userIds)
}
    `;

/**
 * __useSendEmailsQuery__
 *
 * To run a query within a React component, call `useSendEmailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSendEmailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSendEmailsQuery({
 *   variables: {
 *      subject: // value for 'subject'
 *      message: // value for 'message'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useSendEmailsQuery(baseOptions: Apollo.QueryHookOptions<SendEmailsQuery, SendEmailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SendEmailsQuery, SendEmailsQueryVariables>(SendEmailsDocument, options);
      }
export function useSendEmailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SendEmailsQuery, SendEmailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SendEmailsQuery, SendEmailsQueryVariables>(SendEmailsDocument, options);
        }
export type SendEmailsQueryHookResult = ReturnType<typeof useSendEmailsQuery>;
export type SendEmailsLazyQueryHookResult = ReturnType<typeof useSendEmailsLazyQuery>;
export type SendEmailsQueryResult = Apollo.QueryResult<SendEmailsQuery, SendEmailsQueryVariables>;