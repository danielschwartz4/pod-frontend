import {
  MutationFunctionOptions,
  DefaultContext,
  ApolloCache,
  FetchResult,
} from "@apollo/client";
import {
  AddProjectToPodMutation,
  CreatePodMutation,
  Exact,
  RemoveProjectFromPodMutation,
  UpdateProjectFriendProposalsMutation,
  UpdateProjectPodMutation,
  UpdateTaskPodMutation,
  UpdateUserFriendRequestsMutation,
} from "../generated/graphql";
import { SessionType } from "./types";

export type CreatePodMutationType = (
  options?: MutationFunctionOptions<
    CreatePodMutation,
    Exact<{
      isPrivate: boolean;
      cap: number;
      sessionType: SessionType;
    }>,
    DefaultContext,
    ApolloCache<any>
  >
) => Promise<
  FetchResult<CreatePodMutation, Record<string, any>, Record<string, any>>
>;

export type UpdateProjectPodMutationType = (
  options?: MutationFunctionOptions<
    UpdateProjectPodMutation,
    Exact<{
      podId: number;
      updateProjectPodId: number;
    }>,
    DefaultContext,
    ApolloCache<any>
  >
) => Promise<
  FetchResult<
    UpdateProjectPodMutation,
    Record<string, any>,
    Record<string, any>
  >
>;

export type UpdateTaskPodMutationType = (
  options?: MutationFunctionOptions<
    UpdateTaskPodMutation,
    Exact<{
      podId: number;
      updateRecurringTaskPodId: number;
    }>,
    DefaultContext,
    ApolloCache<any>
  >
) => Promise<
  FetchResult<UpdateTaskPodMutation, Record<string, any>, Record<string, any>>
>;

export type AddProjectToPodMutationType = (
  options?: MutationFunctionOptions<
    AddProjectToPodMutation,
    Exact<{
      addProjectToPodId: number;
      projectId: number;
    }>,
    DefaultContext,
    ApolloCache<any>
  >
) => Promise<
  FetchResult<AddProjectToPodMutation, Record<string, any>, Record<string, any>>
>;

export type UpdateProjectFriendProposalsMutationType = (
  options?: MutationFunctionOptions<
    UpdateProjectFriendProposalsMutation,
    Exact<{
      updateProjectFriendProposalsId: number;
      isAdding: boolean;
      addedFriends: string[];
      deletedFriend: string;
    }>,
    DefaultContext,
    ApolloCache<any>
  >
) => Promise<
  FetchResult<
    UpdateProjectFriendProposalsMutation,
    Record<string, any>,
    Record<string, any>
  >
>;

export type UpdateUserFriendRequestsMutationType = (
  options?: MutationFunctionOptions<
    UpdateUserFriendRequestsMutation,
    Exact<{
      username: string;
      projectId: number;
      podId: number;
      isAdding: boolean;
    }>,
    DefaultContext,
    ApolloCache<any>
  >
) => Promise<
  FetchResult<
    UpdateUserFriendRequestsMutation,
    Record<string, any>,
    Record<string, any>
  >
>;

export type RemoveProjectFromPodMutationType = (
  options?: MutationFunctionOptions<
    RemoveProjectFromPodMutation,
    Exact<{
      removeProjectFromPodId: number;
      projectId: number;
    }>,
    DefaultContext,
    ApolloCache<any>
  >
) => Promise<
  FetchResult<
    RemoveProjectFromPodMutation,
    Record<string, any>,
    Record<string, any>
  >
>;
