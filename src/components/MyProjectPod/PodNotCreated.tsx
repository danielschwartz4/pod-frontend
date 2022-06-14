import { CheckIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  FindPublicPodQuery,
  MeDocument,
  MeQuery,
  ProjectQuery,
  useUpdateProjectFriendProposalsMutation,
  useUpdateUserFriendRequestsMutation,
} from "../../generated/graphql";
import {
  AddProjectToPodMutationType,
  CreatePodMutationType,
  UpdateProjectFriendProposalsMutationType,
  UpdateProjectPodMutationType,
  UpdateUserFriendRequestsMutationType,
} from "../../types/mutationTypes";
import { InputField } from "../Inputs/InputField";
import PodRadio from "./Radio";

interface PodNotCreatedProps {
  podSize?: number;
  setPodSize?: React.Dispatch<React.SetStateAction<number>>;
  projectData?: ProjectQuery;
  availablePodsData?: FindPublicPodQuery;
  setPodJoined?: React.Dispatch<React.SetStateAction<boolean>>;
  createPod?: CreatePodMutationType;
  updateProjectPod?: UpdateProjectPodMutationType;
  addProjectToPod?: AddProjectToPodMutationType;
  updateProjectFriendProposals?: UpdateProjectFriendProposalsMutationType;
  updateUserFriendRequests?: UpdateUserFriendRequestsMutationType;
  meData?: MeQuery;
}

interface FriendRequestsProps extends PodNotCreatedProps {}

export const PodNotCreated: React.FC<PodNotCreatedProps> = (props) => {
  const [isRandom, setIsRandom] = React.useState(false);

  return (
    <Box>
      <Flex justifyContent={"center"}>
        <PodRadio setIsRandom={setIsRandom} isRandom={isRandom}></PodRadio>
      </Flex>
      {isRandom ? (
        <RandomPodOptions
          podSize={props.podSize}
          setPodSize={props.setPodSize}
          children={props.children}
        />
      ) : (
        <FriendPodOptions
          addProjectToPod={props.addProjectToPod}
          availablePodsData={props.availablePodsData}
          projectData={props.projectData}
          createPod={props.createPod}
          updateProjectPod={props.updateProjectPod}
          setPodJoined={props.setPodJoined}
          meData={props.meData}
        />
      )}
    </Box>
  );
};

const RandomPodOptions: React.FC<{
  podSize: number;
  setPodSize: React.Dispatch<React.SetStateAction<number>>;
}> = ({ podSize, setPodSize, children }) => {
  return (
    <Flex alignItems="center" justifyContent={"center"}>
      <Menu>
        <MenuButton
          cursor={"pointer"}
          bg={"#7e9cd6"}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w={"200px"}
          mt={8}
        >
          {podSize == null ? "Select pod size" : podSize}
        </MenuButton>
        <MenuList>
          <MenuItem
            value={2}
            onClick={(e) => {
              let size = parseInt((e.target as HTMLTextAreaElement).value);
              setPodSize(size);
            }}
          >
            2
          </MenuItem>
          <MenuItem
            value={3}
            onClick={(e) => {
              let size = parseInt((e.target as HTMLTextAreaElement).value);
              setPodSize(size);
            }}
          >
            3
          </MenuItem>
          <MenuItem
            value={4}
            onClick={(e) => {
              let size = parseInt((e.target as HTMLTextAreaElement).value);
              setPodSize(size);
            }}
          >
            4
          </MenuItem>
        </MenuList>
      </Menu>
      {children}
    </Flex>
  );
};

const FriendPodOptions: React.FC<PodNotCreatedProps> = (props) => {
  const [updateUserFriendRequests] = useUpdateUserFriendRequestsMutation();
  const [updateProjectFriendProposals] =
    useUpdateProjectFriendProposalsMutation();

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={8}
      mt={8}
      justifyContent={"center"}
    >
      <Box mb={"auto"}>
        <FriendRequests
          updateProjectPod={props.updateProjectPod}
          addProjectToPod={props.addProjectToPod}
          setPodJoined={props.setPodJoined}
          updateUserFriendRequests={updateUserFriendRequests}
          updateProjectFriendProposals={updateProjectFriendProposals}
          projectData={props.projectData}
          meData={props.meData}
        />
      </Box>
      <Box display={{ base: "none", md: "block" }}>
        <Divider h={"400px"} color={"white"} orientation={"vertical"} />
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <Divider color={"white"} orientation={"horizontal"} />
      </Box>
      <Box>
        <FriendForm
          addProjectToPod={props.addProjectToPod}
          projectData={props.projectData}
          createPod={props.createPod}
          updateProjectPod={props.updateProjectPod}
          setPodJoined={props.setPodJoined}
          updateUserFriendRequests={updateUserFriendRequests}
          updateProjectFriendProposals={updateProjectFriendProposals}
        />
      </Box>
    </Stack>
  );
};

const FriendRequests: React.FC<FriendRequestsProps> = (props) => {
  return (
    <Box>
      <Flex>
        <Text fontSize={20} color={"gainsboro"}>
          Pod Invites
        </Text>
      </Flex>
      {props.meData?.me?.friendRequests?.length == 0 ||
      props.meData?.me?.friendRequests == null ? (
        <Flex
          borderRadius={20}
          color={"gainsboro"}
          h={"44px"}
          w={{ base: "250px", md: "400px" }}
          borderTop={"1px"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box ml={2}>No Invites</Box>
        </Flex>
      ) : (
        <VStack spacing={10}>
          {props.meData?.me?.friendRequests?.map((values, index) => (
            <Flex
              key={index}
              borderRadius={6}
              color={"gainsboro"}
              h={"44px"}
              w={{ base: "250px", md: "400px" }}
              border={"1px"}
              alignItems={"center"}
            >
              {/* <Box ml={2}>
                {projectsData[0]?.project?.project?.projectName.includes(
                  "Click here"
                )
                  ? "untitled project"
                  : projectsData[0]?.project?.project?.projectName}{" "}
              </Box> */}
              <Box>
                <Text ml={2} fontSize={20}>
                  Project id {props.meData?.me?.friendRequests[index].projectId}{" "}
                </Text>
              </Box>

              <Box ml={"auto"} mr={2}>
                <CloseIcon
                  onClick={async () => {
                    const user = await props.updateUserFriendRequests({
                      variables: {
                        username: props.meData?.me?.username,
                        projectId: values.projectId,
                        podId: values.podId,
                        isAdding: false,
                      },
                      update: (cache, { data }) => {
                        const { me } = cache.readQuery({
                          query: MeDocument,
                        });
                        cache.writeQuery({
                          query: MeDocument,
                          data: {
                            me: {
                              ...me,
                              friendRequests: me.friendRequests.filter(
                                (req) => req.projectId !== values.projectId
                              ),
                            },
                          },
                        });
                      },
                    });
                    if (user) {
                      await props.updateProjectFriendProposals({
                        variables: {
                          updateProjectFriendProposalsId: values.projectId,
                          isAdding: false,
                          addedFriends: [],
                          deletedFriend: props.meData?.me?.username,
                        },
                      });
                    }
                  }}
                  cursor={"pointer"}
                  mr={4}
                  color={"red"}
                />
                <CheckIcon
                  onClick={async () => {
                    const user = await props.updateUserFriendRequests({
                      variables: {
                        username: props.meData?.me?.username,
                        projectId: values.projectId,
                        podId: values.podId,
                        isAdding: false,
                      },
                      update: (cache, { data }) => {
                        const { me } = cache.readQuery({
                          query: MeDocument,
                        });
                        cache.writeQuery({
                          query: MeDocument,
                          data: {
                            me: {
                              ...me,
                              friendRequests: me.friendRequests.filter(
                                (req) => req.projectId !== values.projectId
                              ),
                            },
                          },
                        });
                      },
                    });
                    const project = await props.updateProjectFriendProposals({
                      variables: {
                        updateProjectFriendProposalsId: values.projectId,
                        isAdding: false,
                        addedFriends: [],
                        deletedFriend: props.meData?.me?.username,
                      },
                    });

                    await props.updateProjectPod({
                      variables: {
                        podId: values.podId,
                        updateProjectPodId:
                          props.projectData?.project?.project.id,
                      },
                    });
                    await props.addProjectToPod({
                      variables: {
                        addProjectToPodId: values.podId,
                        projectId: props.projectData?.project?.project.id,
                      },
                    });

                    props.setPodJoined(true);
                  }}
                  cursor={"pointer"}
                  color={"#71ec44"}
                />
              </Box>
            </Flex>
          ))}
        </VStack>
      )}
    </Box>
  );
};

const FriendForm: React.FC<PodNotCreatedProps> = (props) => {
  return (
    <Box>
      <Flex>
        <Text fontSize={20} color={"gainsboro"}>
          Pod Invites
        </Text>
      </Flex>
      <Formik
        initialValues={{ user1: "", user2: "", user3: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          const friends = Object.values(values);
          const friendProposals = await props.updateProjectFriendProposals({
            variables: {
              updateProjectFriendProposalsId:
                props.projectData?.project?.project?.id,
              addedFriends: friends,
              isAdding: true,
              deletedFriend: "",
            },
          });
          // !! Text or email the person to login and accept the friend request
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <VStack
              spacing={4}
              color="gainsboro"
              w={{ base: "250px", md: "400px" }}
            >
              <InputField label="User 1" name="user1" placeholder="User 1" />
              <InputField
                label="User 2 (optional)"
                name="user2"
                placeholder="User 2"
              />
              <InputField
                label="User 2 (optional)"
                name="user3"
                placeholder="User 3"
              />
            </VStack>
            <Button
              isloading={isSubmitting.toString()}
              mt={8}
              mr={{ base: "140px", sm: "auto" }}
              type="submit"
              cursor={"pointer"}
              loadingText="Sending"
              onClick={async () => {
                let podSize = 0;
                for (const i in values) {
                  if (values[i] !== "") {
                    podSize++;
                  }
                }
                const pod = await props.createPod({
                  variables: {
                    isPrivate: true,
                    cap: 4,
                    sessionType: "project",
                  },
                });
                await props.updateProjectPod({
                  variables: {
                    podId: pod?.data?.createPod?.id,
                    updateProjectPodId: props.projectData?.project?.project.id,
                  },
                });
                await props.addProjectToPod({
                  variables: {
                    addProjectToPodId: pod?.data?.createPod?.id,
                    projectId: props.projectData?.project?.project.id,
                  },
                });
                Object.values(values).forEach(async (friend) => {
                  const user = await props.updateUserFriendRequests({
                    variables: {
                      username: friend,
                      projectId: props.projectData?.project?.project?.id,
                      podId: pod?.data?.createPod?.id,
                      isAdding: true,
                    },
                  });
                });
                props.setPodJoined(true);
              }}
            >
              Send Request
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
