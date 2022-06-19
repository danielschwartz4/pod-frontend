import { Stack, Box, Divider } from "@chakra-ui/react";
import React from "react";
import {
  FindPublicPodQuery,
  MeQuery,
  RecurringTaskQuery,
  useUpdateTaskFriendProposalsMutation,
  useUpdateUserFriendRequestsMutation,
} from "../../generated/graphql";
import {
  AddProjectToPodMutationType,
  CreatePodMutationType,
  UpdateTaskPodMutationType,
  UpdateUserFriendRequestsMutationType,
} from "../../types/mutationTypes";
import FriendForm from "./FriendForm";
import FriendRequests from "./FriendRequests";

interface FriendPodOptionsProps {
  podSize: number;
  setPodSize: React.Dispatch<React.SetStateAction<number>>;
  addProjectToPod: AddProjectToPodMutationType;
  myTaskData: RecurringTaskQuery;
  availablePodsData: FindPublicPodQuery;
  createPod: CreatePodMutationType;
  updateTaskPod: UpdateTaskPodMutationType;
  setPodJoined: React.Dispatch<React.SetStateAction<boolean>>;
  meData: MeQuery;
  updateUserFriendRequests: UpdateUserFriendRequestsMutationType;
}

const FriendPodOptions: React.FC<FriendPodOptionsProps> = (props) => {
  const [updateUserFriendRequests] = useUpdateUserFriendRequestsMutation();
  const [updateTaskFriendProposals] = useUpdateTaskFriendProposalsMutation();

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={8}
      mt={8}
      justifyContent={"center"}
    >
      <Box mb={"auto"}>
        <FriendRequests
          updateTaskPod={props.updateTaskPod}
          addProjectToPod={props.addProjectToPod}
          setPodJoined={props.setPodJoined}
          updateUserFriendRequests={updateUserFriendRequests}
          updateTaskFriendProposals={updateTaskFriendProposals}
          myTaskData={props.myTaskData}
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
          setPodSize={props.setPodSize}
          podSize={props.podSize}
          meData={props.meData}
          availablePodsData={props.availablePodsData}
          addProjectToPod={props.addProjectToPod}
          myTaskData={props.myTaskData}
          createPod={props.createPod}
          updateTaskPod={props.updateTaskPod}
          setPodJoined={props.setPodJoined}
          updateUserFriendRequests={updateUserFriendRequests}
          updateTaskFriendProposals={updateTaskFriendProposals}
        />
      </Box>
    </Stack>
  );
};

export default FriendPodOptions;
