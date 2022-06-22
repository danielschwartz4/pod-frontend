import { Box, Link } from "@chakra-ui/react";
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
  console.log(projectsData);

  useEffect(() => {
    refetchProjects();
  }, [loading, meData]);

  useEffect(() => {
    refetchTasks();
  }, [loading, tasksData]);

  if (!projectsData?.projects && !tasksData?.recurringTasks) {
    return (
      <Layout isProjectsPage isProfile>
        <NextLink href="/project-info">
          <Link mr={2}>Create your first project!</Link>
        </NextLink>
      </Layout>
    );
  }
  return (
    <Layout isProjectsPage isProfile>
      {loading && !meData ? (
        <div>Loading...</div>
      ) : (
        <Box m={4} minH={"100vh"} h={"100%"}>
          <ProfileHeading meData={meData} />
          <ProfileGrid tasksData={tasksData} projectsData={projectsData} />
        </Box>
      )}
    </Layout>
  );
};

export default Profile;
