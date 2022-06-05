import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { MyPod } from "../components/MyPod/MyPod";
import FlowChartMain from "../components/MyProject/FlowChartMain";
import EnterProject from "../components/ProjectInfo/EnterProject";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useIsAuth } from "../utils/usIsAuth";

interface ProjectInfoProps {}

const ProjectInfo: React.FC<ProjectInfoProps> = ({}) => {
  useIsAuth();

  const { data, loading, error } = useMeQuery({
    // !! Look up wtf this is!!!!!!!!
    skip: isServer(),
  });
  return (
    <Layout isProfile={true}>
      <Box h={"100%"} minH={"60vh"}>
        <Box
          mt={20}
          mx={{ base: 2, sm: "auto" }}
          padding={4}
          border="4px"
          borderColor={"gray.600"}
          borderRadius={12}
          maxW={"600px"}
          justifyContent={"center"}
        >
          <Tabs isFitted={true} variant="enclosed">
            <TabList>
              <Tab _selected={{ color: "white", bg: "#1a202c" }}>Project</Tab>
              <Tab _selected={{ color: "white", bg: "#1a202c" }}>
                Recurring task
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel minH={"600px"}>
                <EnterProject meData={data}></EnterProject>
              </TabPanel>

              <TabPanel minH={"600px"}></TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProjectInfo;
