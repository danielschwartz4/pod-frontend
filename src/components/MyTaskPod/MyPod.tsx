import { ApolloQueryResult } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Exact,
  MeQuery,
  PodQuery,
  PodTasksQuery,
  RecurringTaskQuery,
  useAddProjectToPodMutation,
  useCreatePodMutation,
  useFindPublicPodQuery,
  useRemoveProjectFromPodMutation,
  useSendEmailsLazyQuery,
  useUpdatePhoneMutation,
  useUpdateTaskPodMutation,
  useUpdateUserFriendRequestsMutation,
} from "../../generated/graphql";
import { sendMessage } from "../../utils/messaging/sendMessage";
import { useIsAuth } from "../../utils/usIsAuth";
import { COUNTRIES } from "../Inputs/countries";
import { PhoneNumber } from "../Inputs/PhoneNumber";
import { exitPod, joinPod } from "./JoinExit";
import { PodCreated } from "./PodCreated";
import { PodNotCreated } from "./PodNotCreated";

interface MyPodProps {
  tasksDataLoading: boolean;
  taskDataLoading: boolean;
  meData: MeQuery;
  tasksData: PodTasksQuery;
  myTaskData: RecurringTaskQuery;
  podData: PodQuery;
  refetchTask: (
    variables?: Partial<
      Exact<{
        recurringTaskId: number;
      }>
    >
  ) => Promise<ApolloQueryResult<RecurringTaskQuery>>;
  refetchTasks: (
    variables?: Partial<
      Exact<{
        podId: number;
      }>
    >
  ) => Promise<ApolloQueryResult<PodTasksQuery>>;
}

export const MyPod: React.FC<MyPodProps> = ({
  tasksDataLoading,
  taskDataLoading,
  meData,
  tasksData,
  myTaskData,
  podData,
  refetchTask,
  refetchTasks,
}) => {
  useIsAuth();
  const countryOptions = COUNTRIES.map(({ name, iso }) => ({
    label: name,
    value: iso,
  }));

  const [updateTaskPod] = useUpdateTaskPodMutation();
  const [removeProjectFromPod] = useRemoveProjectFromPodMutation();
  const [updatePhone] = useUpdatePhoneMutation();
  const [createPod] = useCreatePodMutation();
  const [addProjectToPod] = useAddProjectToPodMutation();
  const [updateUserFriendRequests] = useUpdateUserFriendRequestsMutation();
  const [sendEmails, {}] = useSendEmailsLazyQuery();

  const [podSize, setPodSize] = useState(null);
  const [podJoined, setPodJoined] = useState(
    myTaskData?.recurringTask?.task?.podId != 0
  );

  const [phone, setPhone] = useState(null);

  const { data: availablePodsData } = useFindPublicPodQuery({
    variables: {
      cap: podSize,
      projectId: myTaskData?.recurringTask?.task?.id,
      sessionType: "task",
    },
  });

  const [_podTasks, setPodTasks] = useState<PodTasksQuery>(tasksData);

  // We refetch all tasks since the podTasks are changed and we update the state
  useEffect(() => {
    // Refetch task to update podJoined state
    refetchTask();
    // Refetch tasks to update _podTasks state
    // refetchTasks();
    setPodTasks(tasksData);
  }, [tasksData, podJoined]);

  return (
    <Box h={"100%"} w={"100%"}>
      {tasksDataLoading || taskDataLoading ? (
        <Box color={"gainsboro"}>loading...</Box>
      ) : podJoined && _podTasks ? (
        <div>
          <PodCreated
            podCap={podData?.pod?.pod?.cap}
            meData={meData}
            tasksData={_podTasks}
          />
          <Box mt={"2em"}>
            <Button
              cursor={"pointer"}
              bgColor="gainsboro"
              onClick={async () =>
                await exitPod(
                  removeProjectFromPod,
                  myTaskData,
                  podData,
                  setPodJoined,
                  updateTaskPod
                )
              }
            >
              exit pod
            </Button>
          </Box>
        </div>
      ) : (
        <PodNotCreated
          updateTaskPod={updateTaskPod}
          createPod={createPod}
          myTaskData={myTaskData}
          availablePodsData={availablePodsData}
          addProjectToPod={addProjectToPod}
          setPodSize={setPodSize}
          podSize={podSize}
          setPodJoined={setPodJoined}
          meData={meData}
          updateUserFriendRequests={updateUserFriendRequests}
        >
          {podSize != null ? (
            <>
              {meData?.me?.phone == null ? (
                <PhoneNumber
                  country="US"
                  options={countryOptions}
                  placeholder="Enter phone number"
                  setPhone={setPhone}
                />
              ) : null}
              <Button
                w={"100px"}
                mt={"8"}
                ml={2}
                bgColor="gainsboro"
                cursor={"pointer"}
                onClick={async () => {
                  if (phone) {
                    await updatePhone({
                      variables: {
                        updatePhoneId: myTaskData?.recurringTask?.task?.userId,
                        phone: phone,
                      },
                    });
                  }
                  const pod: PodQuery["pod"]["pod"] = await joinPod(
                    podSize,
                    availablePodsData,
                    myTaskData,
                    setPodJoined,
                    createPod,
                    updateTaskPod,
                    addProjectToPod
                  );
                  // !! send SMS AND EMAIL message to all users that someone joined their pod
                  sendEmails({
                    variables: {
                      message: "log into link ",
                      subject:
                        "someone joined your pod! Check out their progress <a href='url'>here</a>",
                      userIds: pod?.userIds,
                    },
                  });

                  // Just sending myself a message
                  sendMessage({
                    to: "+12173817277",
                    body: `${meData?.me?.username}'s task has joined a pod! text/email them 
                        Email: ${meData?.me?.email}, 
                        Phone: ${meData?.me?.phone}`,
                  });
                }}
              >
                Join!
              </Button>
            </>
          ) : null}
        </PodNotCreated>
      )}
    </Box>
  );
};
