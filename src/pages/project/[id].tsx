import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../../components/Layout";
import { MyPod } from "../../components/MyPod/MyPod";
import HorizontalFlow from "../../components/MyProject/FlowChart";
import { MyProjectNotes } from "../../components/MyProjectNotes/MyProjectNotes";
import { Warning } from "../../components/Warning";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  useIsAuth();

  const { data: projectData } = useGetProjectFromUrl();
  if (projectData?.project?.errors) {
    return <Warning />;
  }
  return (
    <Layout isProfile>
      <Tabs mt={"8em"} isFitted variant="enclosed" align={"center"}>
        <TabList mb="1em">
          <Tab _selected={{ color: "white", bg: "green" }}>My project</Tab>
          <Tab _selected={{ color: "white", bg: "green" }}>My pod</Tab>
          <Tab _selected={{ color: "white", bg: "green" }}>
            My project notes
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel outlineColor={"black"} h={"500px"} w={"800px"}>
            <HorizontalFlow
              milestones={projectData?.project?.project?.milestones}
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
