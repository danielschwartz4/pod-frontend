import React from "react";
import {
  FindPublicPodQuery,
  PodQuery,
  RecurringTaskQuery,
} from "../../generated/graphql";
import {
  AddProjectToPodMutationType,
  CreatePodMutationType,
  RemoveProjectFromPodMutationType,
  UpdateTaskPodMutationType,
} from "../../types/mutationTypes";

export const joinPod = async (
  podSize: number,
  availablePodsData: FindPublicPodQuery,
  // myTaskData: RecurringTaskQuery,
  taskId: number,
  createPod: CreatePodMutationType,
  updateTaskPod: UpdateTaskPodMutationType,
  addProjectToPod: AddProjectToPodMutationType,
  setPodJoined?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let createdPod = null;
  let foundPod = null;

  if (availablePodsData?.findPublicPod?.errors) {
    createdPod = await createPod({
      variables: {
        cap: podSize,
        isPrivate: false,
        sessionType: "task",
      },
    });
  } else {
    foundPod = availablePodsData?.findPublicPod?.pod;
  }

  await addProjectToPod({
    variables: {
      addProjectToPodId:
        createdPod != null ? createdPod?.data?.createPod?.id : foundPod?.id,
      // projectId: myTaskData?.recurringTask?.task?.id,
      projectId: taskId,
    },
  });
  await updateTaskPod({
    variables: {
      podId:
        createdPod != null ? createdPod?.data?.createPod?.id : foundPod?.id,
      // updateRecurringTaskPodId: myTaskData?.recurringTask?.task?.id,
      updateRecurringTaskPodId: taskId,
    },
  });
  console.log("SETPODJOINED", setPodJoined);
  if (setPodJoined) {
    setPodJoined(true);
  }
  if (createdPod) {
    console.log("createdPod");
    console.log(createdPod);
    return createdPod;
  } else {
    console.log("foundPod");
    console.log(foundPod);
    return foundPod;
  }
};

export const exitPod = async (
  removeProjectFromPod: RemoveProjectFromPodMutationType,
  myTaskData: RecurringTaskQuery,
  podData: PodQuery,
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>,
  updateTaskPod: UpdateTaskPodMutationType
) => {
  await updateTaskPod({
    variables: {
      podId: 0,
      updateRecurringTaskPodId: myTaskData?.recurringTask?.task?.id,
    },
  });
  await removeProjectFromPod({
    variables: {
      removeProjectFromPodId: podData?.pod?.pod?.id,
      projectId: myTaskData?.recurringTask?.task?.id,
    },
  });
  setPodJoined(false);
};
