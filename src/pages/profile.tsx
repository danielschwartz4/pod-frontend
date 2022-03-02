import { Box, Divider, Grid, GridItem, VStack } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { useMeQuery, useProjectsQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/usIsAuth";

interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
  useIsAuth();
  const { data, loading } = useMeQuery({});

  const { data: projectsData } = useProjectsQuery({
    variables: { userId: data?.me?.id },
  });
  console.log(projectsData);

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
                  timeline preview
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
