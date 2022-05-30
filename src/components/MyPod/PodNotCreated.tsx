import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from "@apollo/client";
import { CheckIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import {
  AddProjectToPodMutation,
  CreatePodMutation,
  Exact,
  FindPublicPodQuery,
  MeDocument,
  MeQuery,
  ProjectQuery,
  UpdateProjectFriendProposals2Mutation,
  UpdateProjectFriendProposalsMutation,
  UpdateProjectPodMutation,
  UpdateUserFriendRequestsMutation,
  useProjectQuery,
  useProjectsQuery,
  useUpdateProjectFriendProposals2Mutation,
  useUpdateProjectFriendProposalsMutation,
  useUpdateUserFriendRequestsMutation,
} from "../../generated/graphql";
import { InputField } from "../Inputs/InputField";
import PodRadio from "./Radio";

interface PodNotCreatedProps {
  podSize?: number;
  setPodSize?: React.Dispatch<React.SetStateAction<number>>;
  projectData?: ProjectQuery;
  availablePodsData?: FindPublicPodQuery;
  setPodJoined?: React.Dispatch<React.SetStateAction<boolean>>;
  createPod?: (
    options?: MutationFunctionOptions<
      CreatePodMutation,
      Exact<{
        isPrivate: boolean;
        cap: number;
      }>,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<
    FetchResult<CreatePodMutation, Record<string, any>, Record<string, any>>
  >;
  updateProjectPod?: (
    options?: MutationFunctionOptions<
      UpdateProjectPodMutation,
      Exact<{
        podId: number;
        updateProjectPodId: number;
      }>,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<
    FetchResult<
      UpdateProjectPodMutation,
      Record<string, any>,
      Record<string, any>
    >
  >;
  addProjectToPod?: (
    options?: MutationFunctionOptions<
      AddProjectToPodMutation,
      Exact<{
        addProjectToPodId: number;
        projectId: number;
      }>,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<
    FetchResult<
      AddProjectToPodMutation,
      Record<string, any>,
      Record<string, any>
    >
  >;
  updateProjectFriendProposals?: (
    options?: MutationFunctionOptions<
      UpdateProjectFriendProposalsMutation,
      Exact<{
        updateProjectFriendProposalsId: number;
        friendProposals: string[];
        isAdding: boolean;
        deletedFriend: string;
      }>,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<
    FetchResult<
      UpdateProjectFriendProposalsMutation,
      Record<string, any>,
      Record<string, any>
    >
  >;

  updateProjectFriendProposals2?: (
    options?: MutationFunctionOptions<
      UpdateProjectFriendProposals2Mutation,
      Exact<{
        updateProjectFriendProposalsId: number;
        isAdding: boolean;
        addedFriends: string[];
        deletedFriend: string;
      }>,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<
    FetchResult<
      UpdateProjectFriendProposals2Mutation,
      Record<string, any>,
      Record<string, any>
    >
  >;

  updateUserFriendRequests?: (
    options?: MutationFunctionOptions<
      UpdateUserFriendRequestsMutation,
      Exact<{
        username: string;
        friendRequest: number;
        isAdding: boolean;
      }>,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<
    FetchResult<
      UpdateUserFriendRequestsMutation,
      Record<string, any>,
      Record<string, any>
    >
  >;
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

const FriendPodOptions: React.FC<PodNotCreatedProps> = (props) => {
  const [updateUserFriendRequests] = useUpdateUserFriendRequestsMutation();
  const [updateProjectFriendProposals] =
    useUpdateProjectFriendProposalsMutation();
  const [updateProjectFriendProposals2] =
    useUpdateProjectFriendProposals2Mutation();

  return (
    <HStack spacing={8} mt={8} justifyContent={"center"}>
      <Box mb={"auto"}>
        <FriendRequests meData={props.meData} />
      </Box>
      <Divider h={"400px"} color={"white"} orientation="vertical" />
      <Box>
        <FriendForm
          addProjectToPod={props.addProjectToPod}
          projectData={props.projectData}
          createPod={props.createPod}
          updateProjectPod={props.updateProjectPod}
          setPodJoined={props.setPodJoined}
          updateUserFriendRequests={updateUserFriendRequests}
          // updateProjectFriendProposals={updateProjectFriendProposals}
          updateProjectFriendProposals2={updateProjectFriendProposals2}
        />
      </Box>
    </HStack>
  );
};

const FriendRequests: React.FC<FriendRequestsProps> = (props) => {
  const [updateUserFriendRequests] = useUpdateUserFriendRequestsMutation();
  const [updateProjectFriendProposals] =
    useUpdateProjectFriendProposalsMutation();
  const [updateProjectFriendProposals2] =
    useUpdateProjectFriendProposals2Mutation();

  console.log(props.meData?.me?.friendRequests);

  // !! Fix this so that on the click, it only queries the clicked project's friend proposals
  // !! Remember the reason we are querying is to get the OG friend's proposals and deleting our name from them
  // !! Query with inner join for project and user on userId
  // const projectsData = [];
  // props.meData?.me?.friendRequests?.forEach((friendRequest) => {
  //   const { data: projectData } = useProjectQuery({
  //     variables: {
  //       id: friendRequest,
  //     },
  //   });
  //   projectsData.push(projectData);
  // });

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
          {props.meData?.me?.friendRequests?.map((value, index) => (
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
                <Text fontSize={20}>
                  {props.meData?.me?.friendRequests?.[index]}
                </Text>
              </Box>

              <Box ml={"auto"} mr={2}>
                <CloseIcon
                  onClick={async () => {
                    const user = await updateUserFriendRequests({
                      variables: {
                        friendRequest: value,
                        username: props.meData?.me?.username,
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
                                (friendRequest) => friendRequest !== value
                              ),
                            },
                          },
                        });
                      },
                    });
                    if (user) {
                      // await updateProjectFriendProposals({
                      //   variables: {
                      //     updateProjectFriendProposalsId: value,
                      //     friendProposals:
                      //       projectsData[index]?.project?.project
                      //         ?.friendProposals,
                      //     isAdding: false,
                      //     deletedFriend: props.meData?.me?.username,
                      //   },
                      // });
                      await updateProjectFriendProposals2({
                        variables: {
                          updateProjectFriendProposalsId: value,
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
                <CheckIcon cursor={"pointer"} color={"#71ec44"} />
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
    <Formik
      initialValues={{ user1: "", user2: "", user3: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        const friends = [values.user1, values.user2, values.user3];
        // const friendProposals = await props.updateProjectFriendProposals({
        //   variables: {
        //     updateProjectFriendProposalsId:
        //       props.projectData?.project?.project?.id,
        //     friendProposals: friends,
        //     isAdding: true,
        //     deletedFriend: "",
        //   },
        // });
        const friendProposals = await props.updateProjectFriendProposals2({
          variables: {
            updateProjectFriendProposalsId:
              props.projectData?.project?.project?.id,
            addedFriends: friends,
            isAdding: true,
            deletedFriend: "",
          },
        });
        // !! After new proposal remove old friend proposal and requests
        // !! Text or email the person to login and accept the friend request

        friends.forEach(async (friend) => {
          const user = await props.updateUserFriendRequests({
            variables: {
              username: friend,
              friendRequest: props.projectData?.project?.project?.id,
              isAdding: true,
            },
          });
          console.log(user);
        });
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
              props.setPodJoined(true);
            }}
          >
            Send Request
          </Button>
        </Form>
      )}
    </Formik>
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
