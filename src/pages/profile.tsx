import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import {
  useDeleteProjectMutation,
  useMeQuery,
  useProjectsQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/usIsAuth";

interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
  useIsAuth();
  const { data, loading } = useMeQuery({});

  const { data: projectsData, refetch } = useProjectsQuery();

  const [deleteProject] = useDeleteProjectMutation();

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
                        <Heading fontSize="xl">
                          {p.podId == 0
                            ? "not in pod yet"
                            : "podId: " + p.podId}
                        </Heading>
                      </Link>
                    </NextLink>
                  </Box>
                  <Flex alignItems={"center"} mb={"1em"}>
                    <Box ml={"1em"}>{p.projectName}</Box>
                    <Box ml={"auto"} mr={"1em"}>
                      <DeleteIcon
                        cursor={"pointer"}
                        onClick={async () =>
                          await deleteProject({
                            variables: {
                              deleteProjectId: p.id,
                            },
                            update: (cache, { data }) => {
                              if (data?.deleteProject) {
                                console.log(cache);
                                cache.evict({ id: "Project:" + p.id });
                              }
                            },
                          })
                        }
                      />
                    </Box>
                  </Flex>
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
