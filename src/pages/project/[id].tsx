import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../../components/Layout";
import { MyProjectNotes } from "../../components/MyProjectNotes/MyProjectNotes";
import { MyPod } from "../../components/MyPod/MyPod";
import MyProject from "../../components/MyProject/MyProject";
import { useIsAuth } from "../../utils/usIsAuth";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { Warning } from "../../components/Warning";

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
          <TabPanel outlineColor={"black"} h={"50vh"} w={"56vw"}>
            <MyProject></MyProject>
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
