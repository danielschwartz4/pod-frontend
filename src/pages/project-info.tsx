import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RiRepeatLine } from "react-icons/ri";
import { Layout } from "../components/Layout";
import RecurringTaskForm from "../components/ProjectInfo/RecurringTaskForm";
import { useMeQuery } from "../generated/graphql";
import { Event, PageView } from "../libs/tracking";
import { isServer } from "../utils/isServer";
import { useIsAuth } from "../utils/usIsAuth";

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
      <Box mt={[0]} h={"100%"} minH={"90vh"}>
        <Box mt={0} mx={{ base: 2, sm: "auto" }} maxW={"600px"}>
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
                  fontFamily={"ubuntu"}
                  fontSize={"24px"}
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
              </TabList>
              <TabPanels>
                <TabPanel minH={"600px"}>
                  <RecurringTaskForm meData={data} />
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
