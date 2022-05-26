import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from "@apollo/client";
import React from "react";
import {
  AddProjectToPodMutation,
  CreatePodMutation,
  Exact,
  FindPublicPodQuery,
  PodQuery,
  ProjectQuery,
  RemoveProjectFromPodMutation,
  UpdateProjectPodMutation,
} from "../../generated/graphql";

// ! Make it so you can't add duplicate project or user ids to same pod
export const joinPod = async (
  cap: number,
  availablePodsData: FindPublicPodQuery,
  projectData: ProjectQuery,
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>,
  createPod: (
    options?: MutationFunctionOptions<
      CreatePodMutation,
      Exact<{
        cap: number;
        isPrivate: boolean;
      }>,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<
    FetchResult<CreatePodMutation, Record<string, any>, Record<string, any>>
  >,
  updateProjectPod: (
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
  >,
  addProjectToPod: (
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
    FetchResult<
      AddProjectToPodMutation,
      Record<string, any>,
      Record<string, any>
    >
  >
) => {
  if (availablePodsData?.findPublicPod?.errors) {
    const pod = await createPod({
      variables: {
        cap: cap,
        isPrivate: false,
      },
    });
    await updateProjectPod({
      variables: {
        podId: pod?.data?.createPod?.id,
        updateProjectPodId: projectData?.project?.project.id,
      },
    });
    await addProjectToPod({
      variables: {
        addProjectToPodId: pod?.data?.createPod?.id,
        projectId: projectData?.project?.project.id,
      },
    });
  } else {
    const pod = availablePodsData?.findPublicPod?.pod;
    await addProjectToPod({
      variables: {
        addProjectToPodId: pod?.id,
        projectId: projectData?.project?.project.id,
      },
    });
    await updateProjectPod({
      variables: {
        podId: pod.id,
        updateProjectPodId: projectData?.project?.project.id,
      },
    });
  }
  setPodJoined(true);
};

export const exitPod = async (
  projectData: ProjectQuery,
  podData: PodQuery,
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>,
  removeProjectFromPod: (
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
  >,
  updateProjectPod: (
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
  >
) => {
  await updateProjectPod({
    variables: {
      podId: 0,
      updateProjectPodId: projectData?.project?.project.id,
    },
  });
  await removeProjectFromPod({
    variables: {
      removeProjectFromPodId: podData?.pod.pod.id,
      projectId: projectData?.project?.project.id,
    },
  });
  setPodJoined(false);
};
