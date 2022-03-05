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

interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
  useIsAuth();
  const { data, loading } = useMeQuery({});

  const { data: projectsData, refetch } = useProjectsQuery({
    variables: { userId: data?.me?.id },
  });

  useEffect(() => {
    refetch();
  }, [loading, data]);

  if (!projectsData?.projects) {
    return (
      <Layout isProfile>
        <div>Create project</div>
      </Layout>
    );
  }

  return (
    <Layout isProfile>
      {loading && !data ? (
        <div>Loading...</div>
      ) : (
        <Grid w="auto" h="auto" templateColumns="repeat(5, 1fr)" gap={6}>
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
      )}
    </Layout>
  );
};

export default Profile;
