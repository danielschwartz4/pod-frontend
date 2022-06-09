import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DashTabs from "../../components/Dash/DashTabs";
import DashWrapper from "../../components/Dash/DashWrapper";
import { Layout } from "../../components/Layout";
import { RecurringTaskProgress } from "../../components/MyRecurringTask/RecurringTaskProgress";
import { useMeQuery } from "../../generated/graphql";
import { useGetTaskFromUrl } from "../../utils/useGetTaskFromUrl";

interface TaskHomeProps {}

const TaskHome: React.FC<TaskHomeProps> = ({}) => {
  const [changeTab, useChangeTab] = useState<string>("task");
  const [keepMounted, setKeepMounted] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const TEMP_BOOL = true;

  const { data: meData } = useMeQuery({});

  const {
    data: taskData,
    loading: taskDataLoading,
    refetch: refetchTask,
  } = useGetTaskFromUrl();

  console.log(taskData);

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
                  <RecurringTaskProgress />
                </Box>
              ) : (
                <Box>Loading...</Box>
              )}
            </TabPanel>

            <TabPanel minH={"600px"}>
              // TODO Pod (refactor)
              <Box>TODO pod</Box>v
            </TabPanel>
          </TabPanels>
        </DashTabs>
      </DashWrapper>
    </Layout>
  );
};

export default TaskHome;
