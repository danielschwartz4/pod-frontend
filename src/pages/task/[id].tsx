import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  TabPanel,
  TabPanels,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DashTabs from "../../components/Dash/DashTabs";
import DashWrapper from "../../components/Dash/DashWrapper";
import { Layout } from "../../components/Layout";
import { RecurringTaskProgress } from "../../components/MyRecurringTask/RecurringTaskProgress";
import { MyPod } from "../../components/MyTaskPod/MyPod";
import {
  useMeQuery,
  usePodQuery,
  usePodTasksQuery,
  useSingleTasksQuery,
} from "../../generated/graphql";
import { useGetTaskFromUrl } from "../../utils/useGetTaskFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";

interface TaskHomeProps {}

const TaskHome: React.FC<TaskHomeProps> = ({}) => {
  useIsAuth();

  const [changeTab, useChangeTab] = useState<string>("task");
  const [keepMounted, setKeepMounted] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const TEMP_BOOL = true;

  const { data: meData } = useMeQuery({});

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

  return (
    <Layout>
      <DashWrapper>
        <Flex w={{ base: "100%", md: "800px", lg: "1024px" }}>
          <Box mt={"28px"} ml={4} mr={0}>
            <Button>ExitTaskComponent</Button>
          </Box>

          {showAlert ? (
            <Alert
              w={{ base: "55%", md: "75%", lg: "80%" }}
              ml={"auto"}
              mt={"auto"}
              h={"24px"}
              borderRadius={6}
              status="success"
              variant={"solid"}
            >
              <AlertIcon />
              Congrats! Your pod has been alerted!
            </Alert>
          ) : (
            <></>
          )}
        </Flex>
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
