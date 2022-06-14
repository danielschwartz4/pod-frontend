import React from "react";
import {
  FindPublicPodQuery,
  PodQuery,
  ProjectQuery,
} from "../../generated/graphql";
import {
  AddProjectToPodMutationType,
  CreatePodMutationType,
  RemoveProjectFromPodMutationType,
  UpdateProjectPodMutationType,
} from "../../types/mutationTypes";

export const joinPod = async (
  podSize: number,
  availablePodsData: FindPublicPodQuery,
  projectData: ProjectQuery,
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>,
  createPod: CreatePodMutationType,
  updateProjectPod: UpdateProjectPodMutationType,
  addProjectToPod: AddProjectToPodMutationType
) => {
  let createdPod = null;
  let foundPod = null;
  if (availablePodsData?.findPublicPod?.errors) {
    createdPod = await createPod({
      variables: {
        cap: podSize,
        isPrivate: false,
        sessionType: "project",
      },
    });
  } else {
    foundPod = availablePodsData?.findPublicPod?.pod;
  }
  await addProjectToPod({
    variables: {
      addProjectToPodId:
        createdPod != null ? createdPod?.data?.createPod?.id : foundPod?.id,
      projectId: projectData?.project?.project.id,
    },
  });
  await updateProjectPod({
    variables: {
      podId:
        createdPod != null ? createdPod?.data?.createPod?.id : foundPod?.id,
      updateProjectPodId: projectData?.project?.project.id,
    },
  });
  setPodJoined(true);
};

export const exitPod = async (
  projectData: ProjectQuery,
  podData: PodQuery,
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>,
  removeProjectFromPod: RemoveProjectFromPodMutationType,
  updateProjectPod: UpdateProjectPodMutationType
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
