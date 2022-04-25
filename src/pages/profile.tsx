import { Box, Button, Grid, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import router from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import { Project } from "../components/Profile/Project";
import { useMeQuery, useProjectsQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/usIsAuth";

interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
  useIsAuth();
  const { data, loading } = useMeQuery({});

  const { data: projectsData, refetch } = useProjectsQuery();

  console.log(projectsData);

  useEffect(() => {
    refetch();
  }, [loading, data]);

  if (!projectsData?.projects) {
    return (
      <Layout isProfile>
        <NextLink href="/project-info">
          <Link mr={2}>Create your first project!</Link>
        </NextLink>
      </Layout>
    );
  }

  return (
    <Box h={"100vh"} bg={"#1a222c"} m={-2}>
      <Layout isProfile>
        {loading && !data ? (
          <div>Loading...</div>
        ) : (
          <Box w={"100%"}>
            <Button
              bg={"#7e9cd6"}
              mt={8}
              cursor={"pointer"}
              onClick={() => router.push("/project-info")}
            >
              create project
            </Button>
            <Grid
              mt={8}
              w="auto"
              h="auto"
              templateColumns="repeat(4, 1fr)"
              gap={6}
              outline={4}
              borderRadius={20}
              border={"4px"}
              borderColor={"#F6793D"}
              p={4}
            >
              {projectsData?.projects?.map((p) => (
                <Project
                  key={p.id}
                  project={{
                    id: p.id,
                    podId: p.podId,
                    projectName: p.projectName,
                  }}
                ></Project>
              ))}
            </Grid>
          </Box>
        )}
      </Layout>
    </Box>
  );
};

export default Profile;
