import {
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
import FlowChart from "../../components/MyProject/FlowChart";
import { MyProjectNotes } from "../../components/MyProjectNotes/MyProjectNotes";
import { Warning } from "../../components/Warning";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";
import NextLink from "next/link";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  useIsAuth();

  const { data: projectData } = useGetProjectFromUrl();

  if (projectData?.project?.errors) {
    return <Warning />;
  }

  return (
    <Layout isProfile>
      <NextLink href="/profile">
        <Link mr={2}>my projects</Link>
      </NextLink>
      <Tabs
        mt={"8em"}
        isFitted
        variant="enclosed"
        align={"center"}
        // !! WHY DOES THIS NOT SHOW UP WHEN INDEX IS 1
        defaultIndex={1}
        // ? Made isLazy so tab rerenders flow since flow only appears correctly upon rendering
        isLazy
        lazyBehavior="keepMounted"
      >
        <TabList mb="1em">
          <Tab _selected={{ color: "white", bg: "green" }}>My project</Tab>
          <Tab _selected={{ color: "white", bg: "green" }}>My pod</Tab>
          <Tab _selected={{ color: "white", bg: "green" }}>
            My project notes
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel outlineColor={"black"} h={"500px"} w={"800px"}>
            <FlowChart
              milestoneProgress={
                projectData?.project?.project?.milestoneProgress
              }
              milestones={projectData?.project?.project?.milestones}
              milestoneDates={projectData?.project?.project?.milestoneDates}
            />
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
  );
};

export default Home;
