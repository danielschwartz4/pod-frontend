import { Box, Flex, VStack, Button, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import {
  RecurringTaskQuery,
  FindPublicPodQuery,
  MeQuery,
} from "../../generated/graphql";
import {
  AddProjectToPodMutationType,
  CreatePodMutationType,
  UpdateTaskFriendProposalsMutationType,
  UpdateTaskPodMutationType,
  UpdateUserFriendRequestsMutationType,
} from "../../types/mutationTypes";
import { InputField } from "../Inputs/InputField";

interface FriendFormProps {
  podSize: number;
  setPodSize: React.Dispatch<React.SetStateAction<number>>;
  addProjectToPod: AddProjectToPodMutationType;
  myTaskData: RecurringTaskQuery;
  availablePodsData: FindPublicPodQuery;
  createPod: CreatePodMutationType;
  updateTaskPod: UpdateTaskPodMutationType;
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>;
  meData: MeQuery;
  updateTaskFriendProposals: UpdateTaskFriendProposalsMutationType;
  updateUserFriendRequests?: UpdateUserFriendRequestsMutationType;
}

const FriendForm: React.FC<FriendFormProps> = (props) => {
  return (
    <Box>
      <Flex>
        <Text fontSize={20} color={"gainsboro"}>
          Add Friends To Pod
        </Text>
      </Flex>
      <Formik
        initialValues={{ user1: "", user2: "", user3: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          const friends = Object.values(values);
          const friendProposals = await props.updateTaskFriendProposals({
            variables: {
              updateTaskFriendProposalsId:
                props.myTaskData?.recurringTask?.task?.id,
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
              // isloading={isSubmitting.toString()}
              isLoading={isSubmitting ? true : false}
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
                await props.updateTaskPod({
                  variables: {
                    podId: pod?.data?.createPod?.id,
                    updateRecurringTaskPodId:
                      props.myTaskData?.recurringTask?.task?.id,
                  },
                });
                await props.addProjectToPod({
                  variables: {
                    addProjectToPodId: pod?.data?.createPod?.id,
                    projectId: props.myTaskData?.recurringTask?.task?.id,
                  },
                });
                Object.values(values).forEach(async (friend) => {
                  const user = await props.updateUserFriendRequests({
                    variables: {
                      username: friend,
                      projectId: props.myTaskData?.recurringTask?.task?.id,
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

export default FriendForm;
