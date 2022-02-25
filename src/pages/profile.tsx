import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { MyHistory } from "../components/MyHistory/MyHistory";
import { MyPod } from "../components/MyPod/MyPod";
import MyProject from "../components/MyProject/MyProject";
import { useIsAuth } from "../utils/usIsAuth";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  useIsAuth();
  return (
    <Layout isProfile>
      <Tabs mt={"8em"} isFitted variant="enclosed" align={"center"}>
        <TabList mb="1em">
          <Tab _selected={{ color: "white", bg: "green" }}>My project</Tab>
          <Tab _selected={{ color: "white", bg: "green" }}>My pod</Tab>
          <Tab _selected={{ color: "white", bg: "green" }}>My history</Tab>
        </TabList>
        <TabPanels>
          <TabPanel outlineColor={"black"} h={"50vh"} w={"70vw"}>
            <MyProject></MyProject>
          </TabPanel>
          <TabPanel>
            <MyPod></MyPod>
          </TabPanel>
          <TabPanel>
            <MyHistory></MyHistory>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default Home;
