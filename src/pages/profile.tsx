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

  useEffect(() => {
    refetch();
  }, [loading, data]);

  if (!projectsData?.projects) {
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
      {loading && !data ? (
        <div>Loading...</div>
      ) : (
        <Box m={4} h={"100%"}>
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
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
            }}
            gap={6}
            outline={4}
            borderRadius={20}
            border={"4px"}
            borderColor={"#F6793D"}
            p={4}
          >
            {projectsData?.projects
              ?.slice(0)
              .reverse()
              .map((p) => (
                <Project
                  key={p.id}
                  project={{
                    id: p.id,
                    podId: p.podId,
                    projectName: p.projectName,
                  }}
                />
              ))}
          </Grid>
        </Box>
      )}
    </Layout>
  );
};

export default Profile;
