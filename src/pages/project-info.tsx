import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RiFlowChart, RiRepeatLine } from "react-icons/ri";
import { Layout } from "../components/Layout";
import ProjectForm from "../components/ProjectInfo/ProjectForm";
import RecurringTaskForm from "../components/ProjectInfo/RecurringTaskForm";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useIsAuth } from "../utils/usIsAuth";
import { Event, PageView } from "../libs/tracking";

interface ProjectInfoProps {}

const ProjectInfo: React.FC<ProjectInfoProps> = ({}) => {
  useEffect(() => PageView(), []);
  useIsAuth();
  //
  const { data, loading, error } = useMeQuery({
    // !! Look up wtf this is!!!!!!!!
    skip: isServer(),
  });
  return (
    <Layout isProfile={true}>
      <Box h={"100%"} minH={"90vh"}>
        <Box mt={20} mx={{ base: 2, sm: "auto" }} maxW={"600px"}>
          <Text color={"grey"}>
            *you can edit this as much as you'd like in the future
          </Text>
          <Box
            mx={{ base: 2, sm: "auto" }}
            padding={4}
            border="4px"
            borderColor={"gray.600"}
            borderRadius={12}
            maxW={"600px"}
            justifyContent={"center"}
          >
            <Tabs isFitted={true} variant="enclosed" defaultIndex={0}>
              <TabList>
                <Tab
                  onClick={() =>
                    Event(
                      "Desktop",
                      "Recurring Task Project-Info Button",
                      "Recurring Task"
                    )
                  }
                  _selected={{ color: "white", bg: "#1a202c" }}
                >
                  Recurring task &#160;
                  <RiRepeatLine />
                </Tab>
                {/* <Tab
                  onClick={() =>
                    Event("Desktop", "Project Project-Info Button", "Project")
                  }
                  _selected={{ color: "white", bg: "#1a202c" }}
                >
                  Project &#160; <RiFlowChart />
                </Tab> */}
              </TabList>
              <TabPanels>
                <TabPanel minH={"600px"}>
                  <RecurringTaskForm meData={data} />
                </TabPanel>
                <TabPanel minH={"600px"}>
                  <ProjectForm meData={data} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProjectInfo;
