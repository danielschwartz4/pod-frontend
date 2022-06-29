import { Box, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import ProfileHeading from "../components/Profile/ProfileHeading";
import ProfileGrid from "../components/Profile/ProfileGrid";
import {
  useMeQuery,
  useProjectsQuery,
  useRecurringTasksQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/usIsAuth";

interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
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
  console.log(!projectsData?.projects);

  if (
    projectsData?.projects?.length == 0 &&
    tasksData?.recurringTasks?.length == 0
  ) {
    return (
      <Layout isProjectsPage isProfile>
        <Flex>
          <Box mt={12} mx={"auto"} maxW={"1400px"} minH={"70vh"} h={"100%"}>
            <ProfileHeading meData={meData} />
            <ProfileGrid
              hasSeed
              tasksData={tasksData}
              projectsData={projectsData}
            />
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
          <Box mt={12} mx={"auto"} maxW={"1400px"} minH={"70vh"} h={"100%"}>
            <ProfileHeading meData={meData} />
            <ProfileGrid tasksData={tasksData} projectsData={projectsData} />
          </Box>
        </Flex>
      )}
    </Layout>
  );
};

export default Profile;
