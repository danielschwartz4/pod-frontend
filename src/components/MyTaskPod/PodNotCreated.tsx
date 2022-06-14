import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useUpdateUserFriendRequestsMutation } from "../../generated/graphql";
import PodRadio from "../MyProjectPod/Radio";
import FriendRequests from "./FriendRequests";

interface PodNotCreatedProps {
  podSize: number;
  setPodSize: React.Dispatch<React.SetStateAction<number>>;
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
        // <FriendPodOptions
        //   addTaskToPod={props.addProjectToPod}
        //   availablePodsData={props.availablePodsData}
        //   projectData={props.projectData}
        //   createPod={props.createPod}
        //   updateProjectPod={props.updateProjectPod}
        //   setPodJoined={props.setPodJoined}
        //   meData={props.meData}
        // />
        <Box>friends pod</Box>
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

// const FriendPodOptions: React.FC<PodNotCreatedProps> = (props) => {
//   const [updateUserFriendRequests] = useUpdateUserFriendRequestsMutation();
//   // TODO updateTaskFriendProposals mutation

//   return (
//     <Stack
//       direction={{ base: "column", md: "row" }}
//       spacing={8}
//       mt={8}
//       justifyContent={"center"}
//     >
//       <Box mb={"auto"}>
//         <FriendRequests
//           updateTaskPod={props.updateTaskPod}
//           addTaskToPod={props.addTaskToPod}
//           setPodJoined={props.setPodJoined}
//           updateUserFriendRequests={updateUserFriendRequests}
//           updateProjectFriendProposals={updateProjectFriendProposals}
//           myTaskData={props.myTaskData}
//           meData={props.meData}
//         />
//       </Box>
//       {/* <Box display={{ base: "none", md: "block" }}>
//         <Divider h={"400px"} color={"white"} orientation={"vertical"} />
//       </Box>
//       <Box display={{ base: "block", md: "none" }}>
//         <Divider color={"white"} orientation={"horizontal"} />
//       </Box>
//       <Box>
//         <FriendForm
//           addProjectToPod={props.addProjectToPod}
//           projectData={props.projectData}
//           createPod={props.createPod}
//           updateProjectPod={props.updateProjectPod}
//           setPodJoined={props.setPodJoined}
//           updateUserFriendRequests={updateUserFriendRequests}
//           updateProjectFriendProposals={updateProjectFriendProposals}
//         />
//       </Box> */}
//     </Stack>
//   );
// };
