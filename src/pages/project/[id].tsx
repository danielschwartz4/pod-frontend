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
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { MyPod } from "../../components/MyPod/MyPod";
import FlowChartMain from "../../components/MyProject/FlowChartMain";
import { MyProjectNotes } from "../../components/MyProjectNotes/MyProjectNotes";
import { Warning } from "../../components/Warning";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";
import { delayAlert } from "../../utils/delay";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  useIsAuth();

  const { data: projectData, loading } = useGetProjectFromUrl();

  const [showAlert, setShowAlert] = useState(false);

  if (projectData?.project?.errors) {
    return <Warning />;
  }

  if (showAlert == true) {
    delayAlert(4000, setShowAlert, false);
  }

  // sm 830px
  // md 1024px

  return (
    <Box
      // h={"100vh"}
      h={"100%"}
      // w={{ sm: "sm:fit-content", lg: "lg:fit-content" }}

      bg={"#4c5e81"}
    >
      <Layout isProfile>
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
          ) : null}
        </Flex>
        <Tabs
          mt={"8"}
          mx={"auto"}
          w={{ base: "425px", md: "800px", lg: "1024px" }}
          isFitted={true}
          variant="enclosed"
          align={"center"}
          defaultIndex={1}
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
            <TabPanel outlineColor={"black"} h={"600px"} outlineOffset={-16}>
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
              ) : null}
            </TabPanel>
            <TabPanel>
              <MyPod></MyPod>
            </TabPanel>
            {/* <TabPanel>
              <MyProjectNotes></MyProjectNotes>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Layout>
    </Box>
  );
};

export default Home;
