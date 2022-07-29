import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { MainDash } from "../../components/MyRecurringTask/MainDash";
import { MyPod } from "../../components/MyTaskPod/MyPod";
import Tour from "../../components/Tour";
import {
  useMeQuery,
  usePodQuery,
  usePodTasksQuery,
  useRecentPodSingleTasksQuery,
  useSingleTasksQuery,
} from "../../generated/graphql";
import { PageView } from "../../libs/tracking";
import { useGetTaskFromUrl } from "../../utils/useGetTaskFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";

interface TaskHomeProps {}

const TaskHome: React.FC<TaskHomeProps> = ({}) => {
  useEffect(() => PageView(), []);
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

  const { data: podData, loading: podDataLoading } = usePodQuery({
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

  return (
    <>
      <Tour />
      <Layout withHelpPopover={true}>
        <Box minH={"100vh"} h={"100%"} mt={{ base: 0, sm: 16 }}>
          <Box minH={"400px"}>
            {!taskDataLoading && !singleTasksDataLoading ? (
              <MainDash
                recentPodSingleTasksData={recentPodSingleTasksData}
                singleTasksData={singleTasksData}
                myTaskData={myTaskData}
                refetchSingleTasks={refetchSingleTasks}
              />
            ) : (
              <Flex mt={16}>
                <Text mx={"auto"} textColor={"gainsboro"}>
                  Dashboard loading...
                </Text>
              </Flex>
            )}
          </Box>

          <Box mt={16}>
            {!podDataLoading ? (
              <MyPod
                podData={podData}
                meData={meData}
                tasksData={tasksData}
                taskDataLoading={taskDataLoading}
                tasksDataLoading={tasksDataLoading}
                myTaskData={myTaskData}
                refetchTask={refetchTask}
                refetchTasks={refetchTasks}
                recentPodSingleTasksData={recentPodSingleTasksData}
              />
            ) : (
              <Flex mt={16}>
                <Text mx={"auto"} textColor={"gainsboro"}>
                  Pods loading...
                </Text>
              </Flex>
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default TaskHome;
