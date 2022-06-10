import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { RiFlowChart, RiRepeatLine } from "react-icons/ri";
import { Layout } from "../components/Layout";
import EnterProject from "../components/ProjectInfo/EnterProject";
import RecurringTaskComp from "../components/ProjectInfo/RecurringTaskComp";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useIsAuth } from "../utils/usIsAuth";

interface ProjectInfoProps {}

const ProjectInfo: React.FC<ProjectInfoProps> = ({}) => {
  useIsAuth();
  //
  const { data, loading, error } = useMeQuery({
    // !! Look up wtf this is!!!!!!!!
    skip: isServer(),
  });
  return (
    <Layout isProfile={true}>
      <Box h={"100%"} minH={"60vh"}>
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
                <Tab _selected={{ color: "white", bg: "#1a202c" }}>
                  Project &#160; <RiFlowChart />
                </Tab>
                <Tab _selected={{ color: "white", bg: "#1a202c" }}>
                  Recurring task &#160;
                  <RiRepeatLine />
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel minH={"600px"}>
                  <EnterProject meData={data} />
                </TabPanel>

                <TabPanel minH={"600px"}>
                  <RecurringTaskComp meData={data} />
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
