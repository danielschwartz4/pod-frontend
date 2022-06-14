import {
  PodQuery,
  RecurringTaskQuery,
  UpdateTaskPodMutation,
} from "../../generated/graphql";
import {
  RemoveProjectFromPodMutationType,
  UpdateTaskPodMutationType,
} from "../../types/mutationTypes";

export const joinPod = async () => {
  return;
};

export const exitPod = async (
  myTaskData: RecurringTaskQuery,
  podData: PodQuery,
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>,
  removeProjectFromPod: RemoveProjectFromPodMutationType,
  updateTaskPod: UpdateTaskPodMutationType
) => {
  // TODO updateTaskPod
  await updateTaskPod({
    variables: {
      podId: 0,
      updateRecurringTaskPodId: myTaskData?.recurringTask?.task?.id,
    },
  });
  await removeProjectFromPod({
    variables: {
      removeProjectFromPodId: podData?.pod.pod.id,
      projectId: myTaskData?.recurringTask?.task?.id,
    },
  });
  setPodJoined(false);
};
