import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import ProfileGrid from "../components/Profile/ProfileGrid";
import ProfileHeading from "../components/Profile/ProfileHeading";
import {
  useMeQuery,
  useProjectsQuery,
  useRecurringTasksQuery,
} from "../generated/graphql";
import { PageView } from "../libs/tracking";
import { useIsAuth } from "../utils/usIsAuth";

interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
  useEffect(() => PageView(), []);

  useIsAuth();
  const { data: meData, loading } = useMeQuery({});
  const { data: projectsData, refetch: refetchProjects } = useProjectsQuery();
  const { data: tasksData, refetch: refetchTasks } = useRecurringTasksQuery();

  useEffect(() => {
    refetchProjects();
  }, [loading, meData]);

  useEffect(() => {
    refetchTasks();
  }, [loading, tasksData]);

  if (
    projectsData?.projects?.length == 0 &&
    tasksData?.recurringTasks?.length == 0
  ) {
    return (
      <Layout isProjectsPage isProfile>
        <Flex>
          <Box mt={6} mx={"auto"} maxW={"1400px"} minH={"90vh"} h={"100%"}>
            <ProfileHeading meData={meData} firstProject={true} />
            {/* <ProfileGrid
              hasSeed
              tasksData={tasksData}
              projectsData={projectsData}
            /> */}
          </Box>
        </Flex>
      </Layout>
    );
  }
  return (
    <Layout isProjectsPage isProfile>
      {loading && !meData ? (
        <div>Loading...</div>
      ) : (
        <Flex>
          <Box mt={6} mx={"auto"} maxW={"1400px"} minH={"100vh"} h={"100%"}>
            <ProfileHeading meData={meData} firstProject={false} />
            <ProfileGrid tasksData={tasksData} projectsData={projectsData} />
          </Box>
        </Flex>
      )}
    </Layout>
  );
};

export default Profile;
