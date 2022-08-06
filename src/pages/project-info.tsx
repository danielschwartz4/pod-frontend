import {
  Box,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RiRepeatLine } from "react-icons/ri";
import { Layout } from "../components/Layout";
import RecurringTaskForm from "../components/ProjectInfo/RecurringTaskForm";
import { LandingDivider } from "../css/styles";
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
      <Box h={"100%"} minH={"90vh"}>
        <Box mx={{ base: 2, sm: "auto" }} maxW={"600px"}>
          <Box
            mx={{ base: 2, sm: "auto" }}
            padding={4}
            border="4px"
            borderColor={"gainsboro"}
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
              <Divider mx={"auto"} mt={2} color={"grey"} />
              <TabPanels paddingTop={0}>
                <TabPanel paddingTop={2} minH={"600px"}>
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
