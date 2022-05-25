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
  ProjectQuery,
  useUpdateProjectFriendProposalsMutation,
  useUpdateProjectFriendRequestsMutation,
} from "../../generated/graphql";
import { InputField } from "../Inputs/InputField";
import { PhoneNumber } from "../Inputs/PhoneNumber";
import PodRadio from "./Radio";

interface PodNotCreatedProps {
  podSize: number;
  setPodSize: React.Dispatch<React.SetStateAction<number>>;
  projectData: ProjectQuery;
  joinPod?;
  updateProjectGroupSizeFunc?;
}

export const PodNotCreated: React.FC<PodNotCreatedProps> = ({
  podSize,
  setPodSize,
  projectData,
  children,
}) => {
  const [isRandom, setIsRandom] = React.useState(true);

  return (
    <VStack spacing={8}>
      <Flex justifyContent={"center"}>
        <PodRadio setIsRandom={setIsRandom} isRandom={isRandom}></PodRadio>
      </Flex>
      \{" "}
      {isRandom ? (
        <RandomPodOptions
          podSize={podSize}
          setPodSize={setPodSize}
          children={children}
        />
      ) : (
        <FriendPodOptions projectData={projectData} />
      )}
    </VStack>
  );
};

const FriendPodOptions: React.FC<{
  projectData: ProjectQuery;
}> = ({ children, projectData }) => {
  const [updateProjectFriendRequests] =
    useUpdateProjectFriendRequestsMutation();
  const [updateProjectFriendProposals] =
    useUpdateProjectFriendProposalsMutation();

  return (
    <Flex justifyContent={"center"}>
      <Formik
        initialValues={{ user1: "", user2: "", user3: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          await updateProjectFriendProposals({
            variables: {
              updateProjectFriendProposalsId: projectData?.project?.project?.id,
              friendProposals: [values.user1, values.user2, values.user3],
            },
          });
        }}
      >
        {({ isSubmitting }) => (
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
  return (
    <Flex alignItems="center" justifyContent={"center"}>
      <Menu>
        <MenuButton
          cursor={"pointer"}
          bg={"#7e9cd6"}
          as={Button}
          rightIcon={<ChevronDownIcon />}
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
