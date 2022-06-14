import {
  FindPublicPodQuery,
  PodQuery,
  RecurringTaskQuery,
  UpdateTaskPodMutation,
} from "../../generated/graphql";
import {
  AddProjectToPodMutationType,
  CreatePodMutationType,
  RemoveProjectFromPodMutationType,
  UpdateTaskPodMutationType,
} from "../../types/mutationTypes";

interface joinExitArgs {
  myTaskData: RecurringTaskQuery;
  podData: PodQuery;
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>;
  updateTaskPod: UpdateTaskPodMutationType;
}

interface ExitArgs extends joinExitArgs {
  removeProjectFromPod: RemoveProjectFromPodMutationType;
}

interface JoinArgs extends joinExitArgs {
  createPod: CreatePodMutationType;
  addProjectToPod: AddProjectToPodMutationType;
  // TODO make the find pods query only work if session types are the same
  availablePodsData: FindPublicPodQuery;
  cap: number;
}

export const joinPod = async (
  podSize: number,
  availablePodsData: FindPublicPodQuery,
  myTaskData: RecurringTaskQuery,
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>,
  createPod: CreatePodMutationType,
  updateTaskPod: UpdateTaskPodMutationType,
  addProjectToPod: AddProjectToPodMutationType
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
      projectId: myTaskData?.recurringTask?.task?.id,
    },
  });
  await updateTaskPod({
    variables: {
      podId:
        createdPod != null ? createdPod?.data?.createPod?.id : foundPod?.id,
      updateRecurringTaskPodId: myTaskData?.recurringTask?.task?.id,
    },
  });

  setPodJoined(true);
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
