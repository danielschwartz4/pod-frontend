import {
  Box,
  Flex,
  Heading,
  TabPanel,
  TabPanels,
  Text,
  ToastPositionWithLogical,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DashTabs from "../../components/Dash/DashTabs";
import DashWrapper from "../../components/Dash/DashWrapper";
import { Layout } from "../../components/Layout";
import { RecurringTaskProgress } from "../../components/MyRecurringTask/RecurringTaskProgress";
import { MyPod } from "../../components/MyTaskPod/MyPod";
import {
  SingleTask,
  useMeQuery,
  usePodQuery,
  usePodTasksQuery,
  useRecentPodSingleTasksQuery,
  useSingleTasksQuery,
} from "../../generated/graphql";
import { NotePopup, randNotesSplurge } from "../../utils/randNotesSplurge";
import { useGetTaskFromUrl } from "../../utils/useGetTaskFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";
import { timer } from "../../utils/delay";

interface TaskHomeProps {}

const TaskHome: React.FC<TaskHomeProps> = ({}) => {
  useIsAuth();

  const [changeTab, useChangeTab] = useState<string>("task");
  const [keepMounted, setKeepMounted] = useState(true);
  const TEMP_BOOL = true;

  const { data: meData } = useMeQuery({});

  const toast = useToast();

  const {
    data: myTaskData,
    loading: taskDataLoading,
    refetch: refetchTask,
  } = useGetTaskFromUrl();

  const { data: podData } = usePodQuery({
    variables: { podId: myTaskData?.recurringTask?.task?.podId },
  });

  const {
    data: tasksData,
    loading: tasksDataLoading,
    refetch: refetchTasks,
  } = usePodTasksQuery({
    variables: { podId: podData?.pod?.pod?.id },
  });

  const {
    data: singleTasksData,
    refetch: refetchSingleTasks,
    loading: singleTasksDataLoading,
  } = useSingleTasksQuery({
    variables: {
      taskId: myTaskData?.recurringTask?.task?.id,
    },
  });

  const { data: recentPodSingleTasksData } = useRecentPodSingleTasksQuery({
    variables: {
      taskIds: singleTasksData?.singleTasks?.singleTasks.map((task) => task.id),
    },
  });

  async function notesToastHandler(popup: NotePopup) {
    toast({
      title: popup.title,
      description: popup.description,
      position: popup.position as ToastPositionWithLogical,
      duration: null,
      isClosable: true,
      // render: () => (
      //   <VStack height={20} bg={popup.color} borderRadius={8}>
      //     <Box>
      //       <Flex>
      //         <Box>
      //           <Heading mx={"auto"} size={"sm"}>
      //             {popup.title}
      //           </Heading>
      //           <Text mx={"auto"} pb={2}>
      //             {popup.description}
      //           </Text>
      //         </Box>
      //       </Flex>
      //     </Box>
      //   </VStack>
      // ),
    });
    await timer(3000);
  }

  useEffect(() => {
    if (
      tasksData?.podTasks &&
      tasksData?.podTasks?.length > 1 &&
      !tasksDataLoading
    ) {
      const popups = randNotesSplurge(
        recentPodSingleTasksData?.recentPodSingleTasks
          ?.singleTasks as SingleTask[],
        tasksData?.podTasks?.length
      );
      popups?.forEach(async (popup) => {
        notesToastHandler(popup);
      });
    }
  });

  return (
    <Layout>
      <DashWrapper>
        <Flex w={{ base: "100%", md: "800px", lg: "1024px" }}></Flex>
        <DashTabs
          type="task"
          keepMounted={keepMounted}
          useChangeTab={useChangeTab}
          setKeepMounted={setKeepMounted}
        >
          <TabPanels>
            <TabPanel h={"600px"} minH={"600px"} outlineOffset={-16}>
              {TEMP_BOOL ? (
                <Box>
                  {!taskDataLoading && !singleTasksDataLoading ? (
                    <RecurringTaskProgress
                      singleTasksData={singleTasksData}
                      myTaskData={myTaskData}
                    />
                  ) : (
                    <Text>Loading...</Text>
                  )}
                </Box>
              ) : (
                <Box>Loading...</Box>
              )}
            </TabPanel>

            <TabPanel minH={"600px"}>
              <MyPod
                podData={podData}
                meData={meData}
                tasksData={tasksData}
                taskDataLoading={taskDataLoading}
                tasksDataLoading={tasksDataLoading}
                myTaskData={myTaskData}
                refetchTask={refetchTask}
                refetchTasks={refetchTasks}
              />
            </TabPanel>
          </TabPanels>
        </DashTabs>
      </DashWrapper>
    </Layout>
  );
};

export default TaskHome;
