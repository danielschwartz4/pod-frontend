import {
  Box,
  Button,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { Layout } from "../../components/Layout";
import { MyPod } from "../../components/MyPod/MyPod";
import FlowChartMain from "../../components/MyProject/FlowChartMain";
import { MyProjectNotes } from "../../components/MyProjectNotes/MyProjectNotes";
import { Warning } from "../../components/Warning";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";
import NextLink from "next/link";
import router from "next/router";
import { SmsForm } from "../../components/SmsForm";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  useIsAuth();

  const { data: projectData, loading } = useGetProjectFromUrl();

  if (projectData?.project?.errors) {
    return <Warning />;
  }

  return (
    <Box h={"100vh"} bg={"#4c5e81"} m={-2}>
      <Layout isProfile>
        <Button
          bg={"#7e9cd6"}
          mt={8}
          cursor={"pointer"}
          onClick={() => router.push("/profile")}
        >
          my projects
        </Button>
        <SmsForm></SmsForm>
        <Tabs
          mt={"8"}
          isFitted
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
            <Tab _selected={{ color: "white", bg: "#1a202c" }}>
              My project notes
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel
              outlineColor={"black"}
              h={"600px"}
              w={"900px"}
              outlineOffset={-16}
            >
              {!loading ? (
                <FlowChartMain
                  milestoneProgress={
                    projectData?.project?.project?.milestoneProgress
                  }
                  milestones={projectData?.project?.project?.milestones}
                  milestoneDates={projectData?.project?.project?.milestoneDates}
                />
              ) : null}
            </TabPanel>
            <TabPanel>
              <MyPod></MyPod>
            </TabPanel>
            <TabPanel>
              <MyProjectNotes></MyProjectNotes>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </Box>
  );
};

export default Home;
