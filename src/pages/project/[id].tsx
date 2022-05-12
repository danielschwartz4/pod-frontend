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
import NewMilestone from "../../components/MyProject/NewMilestone";
import { Warning } from "../../components/Warning";
import { delayAlert } from "../../utils/delay";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";

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
      <Box m={4} h={"100%"}>
        <Flex alignItems={"center"}>
          <Button
            bg={"#7e9cd6"}
            cursor={"pointer"}
            onClick={() => router.push("/profile")}
          >
            my projects
          </Button>
          {showAlert ? (
            <Alert w={"80%"} ml={"auto"} status="success" variant={"solid"}>
              <AlertIcon />
              Congrats! Your pod has been alerted!
            </Alert>
          ) : (
            <NewMilestone
              milestones={projectData?.project?.project?.milestones}
              milestoneDates={projectData?.project?.project?.milestoneDates}
              milestoneProgress={
                projectData?.project?.project?.milestoneProgress
              }
              projectId={projectData?.project?.project?.id}
            />
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
