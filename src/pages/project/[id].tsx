import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { MyPod } from "../../components/MyPod/MyPod";
import AddNewMilestone from "../../components/MyProject/AddNewMilestone";
import FlowChartMain from "../../components/MyProject/FlowChartMain";
import { Warning } from "../../components/Warning";
import { delayAlert } from "../../utils/delay";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  useIsAuth();

  const {
    data: projectData,
    loading,
    refetch: refetchProject,
  } = useGetProjectFromUrl();

  const [showAlert, setShowAlert] = useState(false);

  const [keepMounted, setKeepMounted] = useState(true);

  function handleKeepMounted() {
    setKeepMounted(!keepMounted);
  }

  if (!projectData) {
    return null;
  }

  if (projectData?.project?.errors) {
    return <Warning />;
  }

  if (showAlert == true) {
    delayAlert(4000, setShowAlert, false);
  }

  return (
    <Layout isProfile>
      <VStack>
        <Button onClick={() => refetchProject}>Click me</Button>
        <Flex w={{ base: "425px", md: "800px", lg: "1024px" }}>
          {/* !! Maybe keep EnterNewMilestone in because we want to order milestones by date and it would be easier that way*/}
          <AddNewMilestone
            milestones={projectData?.project?.project?.milestones}
            milestoneDates={projectData?.project?.project?.milestoneDates}
            milestoneProgress={projectData?.project?.project?.milestoneProgress}
            projectId={projectData?.project?.project?.id}
          />
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
        <Tabs
          border={"1px solid #7e9cd6"}
          borderRadius={"lg"}
          mt={"8"}
          mx={"auto"}
          w={{ base: "425px", md: "800px", lg: "1024px" }}
          isFitted={true}
          variant="enclosed"
          align={"center"}
          defaultIndex={0}
          // ? Made isLazy so tab rerenders flow since flow only appears correctly upon rendering
          isLazy
          lazyBehavior={keepMounted ? "keepMounted" : "unmount"}
        >
          <TabList mb="1em">
            <Tab
              onClick={() => setKeepMounted(true)}
              _selected={{ color: "white", bg: "#1a202c" }}
            >
              My project
            </Tab>
            <Tab
              onClick={() => setKeepMounted(true)}
              _selected={{ color: "white", bg: "#1a202c" }}
            >
              My pod
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel h={"600px"} outlineOffset={-16}>
              {!loading ? (
                <FlowChartMain
                  milestoneProgress={
                    projectData?.project?.project?.milestoneProgress
                  }
                  milestones={projectData?.project?.project?.milestones}
                  milestoneDates={projectData?.project?.project?.milestoneDates}
                  setShowAlert={setShowAlert}
                  refetchProject={refetchProject}
                  showAlert={showAlert}
                  setKeepMounted={setKeepMounted}
                />
              ) : (
                <Box>Loading...</Box>
              )}
            </TabPanel>
            <TabPanel>
              <MyPod></MyPod>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Layout>
  );
};

export default Home;
