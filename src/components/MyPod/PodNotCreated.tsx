import {
  MutationFunctionOptions,
  DefaultContext,
  ApolloCache,
  FetchResult,
} from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  AddProjectToPodMutation,
  CreatePodMutation,
  Exact,
  FindPublicPodQuery,
  ProjectQuery,
  UpdateProjectPodMutation,
  useUpdateProjectFriendProposalsMutation,
  useUpdateUserFriendRequestsMutation,
} from "../../generated/graphql";
import { InputField } from "../Inputs/InputField";
import { PhoneNumber } from "../Inputs/PhoneNumber";
import { joinPod } from "./JoinExit";
import PodRadio from "./Radio";

interface PodNotCreatedProps {
  podSize: number;
  setPodSize: React.Dispatch<React.SetStateAction<number>>;
  projectData: ProjectQuery;
  availablePodsData: FindPublicPodQuery;
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>;
  createPod: (
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
  updateProjectPod: (
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
  addProjectToPod: (
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
}

export const PodNotCreated: React.FC<PodNotCreatedProps> = (props) => {
  const [isRandom, setIsRandom] = React.useState(true);

  return (
    <VStack spacing={8}>
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
        />
      )}
    </VStack>
  );
};

const FriendPodOptions: React.FC<{
  projectData: ProjectQuery;
  availablePodsData: FindPublicPodQuery;
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>;
  createPod: (
    options?: MutationFunctionOptions<
      CreatePodMutation,
      Exact<{
        cap: number;
        isPrivate: boolean;
      }>,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<
    FetchResult<CreatePodMutation, Record<string, any>, Record<string, any>>
  >;
  updateProjectPod: (
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
  addProjectToPod: (
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
}> = (props) => {
  const [updateUserFriendRequests] = useUpdateUserFriendRequestsMutation();
  const [updateProjectFriendProposals] =
    useUpdateProjectFriendProposalsMutation();

  return (
    <Flex justifyContent={"center"}>
      <Formik
        initialValues={{ user1: "", user2: "", user3: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          const friends = [values.user1, values.user2, values.user3];
          console.log(friends);
          const friendProposals = await updateProjectFriendProposals({
            variables: {
              updateProjectFriendProposalsId:
                props.projectData?.project?.project?.id,
              friendProposals: friends,
            },
          });
          // !! After new proposal remove old friend proposal and requests
          // !! Text or email the person to login and accept the friend request

          friends.forEach(async (friend) => {
            console.log(props.projectData?.project?.project?.id);
            const user = await updateUserFriendRequests({
              variables: {
                usernameOrEmail: friend,
                friendRequest: props.projectData?.project?.project?.id,
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
              mr={8}
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
                // await joinPod(
                //   (podSize = podSize),
                //   props.availablePodsData,
                //   props.projectData,
                //   props.setPodJoined,
                //   props.createPod,
                //   props.updateProjectPod,
                //   props.addProjectToPod
                // );
              }}
            >
              Send Request
            </Button>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

const RandomPodOptions: React.FC<{
  podSize: number;
  setPodSize: React.Dispatch<React.SetStateAction<number>>;
}> = ({ podSize, setPodSize, children }) => {
  console.log(podSize);
  return (
    <Flex alignItems="center" justifyContent={"center"}>
      <Menu>
        <MenuButton
          cursor={"pointer"}
          bg={"#7e9cd6"}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w={"200px"}
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
