import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import {
  MeDocument,
  MeQuery,
  RecurringTaskQuery,
} from "../../generated/graphql";
import {
  AddProjectToPodMutationType,
  UpdateTaskFriendProposalsMutationType,
  UpdateTaskPodMutationType,
  UpdateUserFriendRequestsMutationType,
} from "../../types/mutationTypes";

interface FriendRequestsProps {
  meData: MeQuery;
  updateUserFriendRequests: UpdateUserFriendRequestsMutationType;
  updateTaskFriendProposals: UpdateTaskFriendProposalsMutationType;
  updateTaskPod: UpdateTaskPodMutationType;
  addProjectToPod: AddProjectToPodMutationType;
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>;
  myTaskData: RecurringTaskQuery;
}

const FriendRequests: React.FC<FriendRequestsProps> = (props) => {
  return (
    <Box>
      <Flex>
        <Text fontSize={20} color={"gainsboro"}>
          Current Pod Invites
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
              <Box>
                <Text ml={2} fontSize={20}>
                  Task id {props.meData?.me?.friendRequests[index].projectId}{" "}
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
                      await props.updateTaskFriendProposals({
                        variables: {
                          updateTaskFriendProposalsId: values.projectId,
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
                    const project = await props.updateTaskFriendProposals({
                      variables: {
                        updateTaskFriendProposalsId: values.projectId,
                        isAdding: false,
                        addedFriends: [],
                        deletedFriend: props.meData?.me?.username,
                      },
                    });

                    await props.updateTaskPod({
                      variables: {
                        podId: values.podId,
                        updateRecurringTaskPodId:
                          props.myTaskData?.recurringTask?.task?.id,
                      },
                    });
                    await props.addProjectToPod({
                      variables: {
                        addProjectToPodId: values.podId,
                        projectId: props.myTaskData?.recurringTask?.task?.id,
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

export default FriendRequests;
