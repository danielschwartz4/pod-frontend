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
} from "@chakra-ui/react";
import router from "next/router";
import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { MyPod } from "../../components/MyPod/MyPod";
import FlowChartMain from "../../components/MyProject/FlowChartMain";
import EnterNewMilestone from "../../components/MyProject/EnterNewMilestone";
import { Warning } from "../../components/Warning";
import { delayAlert } from "../../utils/delay";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";
import AddNewMilestone from "../../components/MyProject/AddNewMilestone";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  useIsAuth();

  const { data: projectData, loading } = useGetProjectFromUrl();

  const [showAlert, setShowAlert] = useState(false);

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
      <Box m={12} h={"100%"}>
        <Flex>
          {/* !! Maybe keep EnterNewMilestone in because we want to order milestones by date and it would be easier that way*/}
          <AddNewMilestone
            milestones={projectData?.project?.project?.milestones}
            milestoneDates={projectData?.project?.project?.milestoneDates}
            milestoneProgress={projectData?.project?.project?.milestoneProgress}
            projectId={projectData?.project?.project?.id}
          />
          {showAlert ? (
            <Alert
              w={"75%"}
              // h={"20%"}
              ml={"auto"}
              mt={"auto"}
              mr={12}
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
          lazyBehavior="keepMounted"
        >
          <TabList mb="1em">
            <Tab _selected={{ color: "white", bg: "#1a202c" }}>My project</Tab>
            <Tab _selected={{ color: "white", bg: "#1a202c" }}>My pod</Tab>
            {/* <Tab _selected={{ color: "white", bg: "#1a202c" }}>
              My project notes
            </Tab> */}
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
                  showAlert={showAlert}
                />
              ) : (
                <Box>Loading...</Box>
              )}
            </TabPanel>
            <TabPanel>
              <MyPod></MyPod>
            </TabPanel>
            {/* <TabPanel>
              <MyProjectNotes></MyProjectNotes>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default Home;
