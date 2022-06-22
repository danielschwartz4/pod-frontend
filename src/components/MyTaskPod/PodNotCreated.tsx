import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import {
  FindPublicPodQuery,
  MeQuery,
  RecurringTaskQuery,
} from "../../generated/graphql";
import {
  AddProjectToPodMutationType,
  CreatePodMutationType,
  UpdateTaskPodMutationType,
  UpdateUserFriendRequestsMutationType,
} from "../../types/mutationTypes";
import PodRadio from "../MyProjectPod/Radio";
import FriendPodOptions from "./FriendPodOptions";

interface PodNotCreatedProps {
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
          myTaskData={props.myTaskData}
          createPod={props.createPod}
          updateTaskPod={props.updateTaskPod}
          setPodJoined={props.setPodJoined}
          meData={props.meData}
          updateUserFriendRequests={props.updateUserFriendRequests}
          podSize={props.podSize}
          setPodSize={props.setPodSize}
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
