import {
  Box,
  Divider,
  Flex,
  TabPanel,
  TabPanels,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useMemo, useState, useEffect } from "react";
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
import { PageView } from "../../libs/tracking";

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
      position: "bottom",
      status: "info",
      duration: null,
      isClosable: true,
    });
  }

  useMemo(() => {
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
  }, [recentPodSingleTasksData]);

  return (
    <Layout withHelpPopover={true}>
      <Box mt={{ base: 0, sm: 16 }}>
        <Box>
          {!taskDataLoading && !singleTasksDataLoading ? (
            <RecurringTaskProgress
              singleTasksData={singleTasksData}
              myTaskData={myTaskData}
              refetchSingleTasks={refetchSingleTasks}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </Box>
        <Flex mt={-8} mb={"8"}>
          <Box alignItems={"center"} display={"flex"} mx={"auto"}>
            <Divider color={"gray.400"} width={"30vw"} />
            <Text fontFamily={"ubuntu"} mx={4} textColor={"#FFDC93"}>
              Your pod
            </Text>
            <Divider color={"gray.400"} width={"30vw"} />
          </Box>
        </Flex>
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
      </Box>
    </Layout>
  );
};

export default TaskHome;
