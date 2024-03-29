import { ApolloQueryResult } from "@apollo/client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Exact,
  MeQuery,
  PodQuery,
  PodTasksQuery,
  RecentPodSingleTasksQuery,
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
import { Event } from "../../libs/tracking";
import { sendMessage } from "../../utils/messaging/sendMessage";
import { useIsAuth } from "../../utils/usIsAuth";
import { COUNTRIES } from "../Inputs/countries";
import { PhoneNumber } from "../Inputs/PhoneNumber";
import { HelpTaskPopover } from "../Nav/HelpTaskPopover";
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
  recentPodSingleTasksData?: RecentPodSingleTasksQuery;
}

export const MyPod: React.FC<MyPodProps> = ({
  tasksDataLoading,
  taskDataLoading,
  meData,
  tasksData,
  myTaskData,
  podData,
  refetchTask,
  recentPodSingleTasksData,
  children,
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

  const [phone, setPhone] = useState(null);

  const { data: availablePodsData } = useFindPublicPodQuery({
    variables: {
      cap: podSize,
      projectId: myTaskData?.recurringTask?.task?.id,
      sessionType: "task",
      taskType: myTaskData?.recurringTask?.task?.taskType,
    },
  });

  const [podJoined, setPodJoined] = useState(
    myTaskData?.recurringTask?.task?.podId != 0
  );

  const [_podTasks, setPodTasks] = useState<PodTasksQuery>(tasksData);
  console.log(_podTasks);

  useEffect(() => {
    refetchTask();
    setPodTasks(tasksData);
  }, [tasksData, podJoined]);

  return (
    <Box h={"100%"} display={"flex"} justifyContent={"center"}>
      {tasksDataLoading || taskDataLoading ? (
        <></>
      ) : podJoined && _podTasks ? (
        <Box width={"90%"}>
          <PodCreated
            podCap={podData?.pod?.pod?.cap}
            meData={meData}
            tasksData={_podTasks}
            recentPodSingleTasksData={recentPodSingleTasksData}
          />
          <PodNavBar
            hasExit={true}
            myTaskData={myTaskData}
            podData={podData}
            removeProjectFromPod={removeProjectFromPod}
            updateTaskPod={updateTaskPod}
            setPodJoined={setPodJoined}
          />
        </Box>
      ) : (
        <>
          <PodNavBar
            hasExit={false}
            myTaskData={myTaskData}
            podData={podData}
            removeProjectFromPod={removeProjectFromPod}
            updateTaskPod={updateTaskPod}
            setPodJoined={setPodJoined}
          />
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
                    Event("Desktop", "Join a random pod MyPod.tsx", "Join!");
                    if (phone) {
                      await updatePhone({
                        variables: {
                          updatePhoneId:
                            myTaskData?.recurringTask?.task?.userId,
                          phone: phone,
                        },
                      });
                    }
                    const pod: PodQuery["pod"]["pod"] = await joinPod(
                      podSize,
                      availablePodsData,
                      myTaskData?.recurringTask?.task?.id,
                      myTaskData?.recurringTask?.task?.taskType,
                      createPod,
                      updateTaskPod,
                      addProjectToPod,
                      setPodJoined
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
                    process.env.NODE_ENV === "production"
                      ? sendMessage({
                          to: "+12173817277",
                          body: `${meData?.me?.username}'s task has joined a pod! text/email them
                        Email: ${meData?.me?.email},
                        Phone: ${meData?.me?.phone}`,
                        })
                      : null;
                  }}
                >
                  Join!
                </Button>
              </>
            ) : null}
          </PodNotCreated>
        </>
      )}
    </Box>
  );
};

interface ExitProps {
  hasExit: boolean;
  removeProjectFromPod;
  myTaskData;
  podData;
  setPodJoined;
  updateTaskPod;
}

export const PodNavBar: React.FC<ExitProps> = (props) => {
  return (
    <Flex justifyContent={"flex-end"}>
      <Box alignItems={"center"} display={"flex"}>
        {props.hasExit ? (
          <>
            <Button
              mt={10}
              border={"1px"}
              borderColor={"gray.700"}
              bgColor={"black"}
              color={"#F26D51"}
              cursor={"pointer"}
              fontWeight={"normal"}
              _hover={{ bg: "gray.700" }}
              onClick={async () => {
                await exitPod(
                  props.removeProjectFromPod,
                  props.myTaskData,
                  props.podData,
                  props.setPodJoined,
                  props.updateTaskPod
                );
              }}
            >
              Leave pod
            </Button>
          </>
        ) : (
          <Flex w={"100vw"}>
            <Box mx={"auto"} display={"flex"} alignItems={"center"}>
              <Text fontFamily={"ubuntu"} textColor={"#FFDC93"}>
                Create a pod
              </Text>
              <HelpTaskPopover placement="top">
                <Button
                  ml={4}
                  border={"none"}
                  bgColor={"#FFDC93"}
                  color={"gray.800"}
                  cursor={"pointer"}
                  onClick={() =>
                    Event("Desktop", "How it works button MyPod.tsx", "Help")
                  }
                >
                  How it works
                </Button>
              </HelpTaskPopover>
            </Box>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
