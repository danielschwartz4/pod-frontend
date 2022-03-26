import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  Link,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import { useMeQuery, useProjectsQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/usIsAuth";
import NextLink from "next/link";
import { Warning } from "../components/Warning";

interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
  useIsAuth();
  const { data, loading } = useMeQuery({});

  const { data: projectsData, refetch } = useProjectsQuery();

  useEffect(() => {
    refetch();
  }, [loading, data]);
  console.log(projectsData);

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
    <Layout isProfile>
      {loading && !data ? (
        <div>Loading...</div>
      ) : (
        <>
          <NextLink href="/project-info">
            <Link mr={2}>create project</Link>
          </NextLink>
          <Grid
            mt={100}
            w="auto"
            h="auto"
            templateColumns="repeat(5, 1fr)"
            gap={6}
          >
            {projectsData?.projects?.map((p) => (
              <GridItem key={p.id} bg="gray">
                <VStack
                  divider={<Divider orientation="horizontal" />}
                  spacing={4}
                  align="stretch"
                >
                  <Box textAlign={"center"} h={"120px"} margin={"auto"}>
                    <NextLink href="/project/[id]" as={`/project/${p.id}`}>
                      <Link>
                        <Heading fontSize="xl">timeline outline</Heading>
                      </Link>
                    </NextLink>
                  </Box>
                  <Box ml={"1em"}>{p.projectName}</Box>
                </VStack>
              </GridItem>
            ))}
          </Grid>
        </>
      )}
    </Layout>
  );
};

export default Profile;
