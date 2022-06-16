import { Flex, Button, Box } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { MeQuery } from "../../generated/graphql";

interface ProfileHeadingProps {
  meData: MeQuery;
}

const ProfileHeading: React.FC<ProfileHeadingProps> = ({ meData }) => {
  return (
    <Flex display={{ base: "contents", sm: "flex" }} alignItems={"center"}>
      <Button
        bg={"#7e9cd6"}
        mt={8}
        cursor={"pointer"}
        onClick={() => router.push("/project-info")}
      >
        create project
      </Button>
      {meData?.me?.friendRequests?.length != 0 &&
      meData?.me?.friendRequests != null ? (
        // !! Maybe do Chakra Toast here instead
        <Box ml={"auto"} mt={8} color={"#71ec44"}>
          You've got <b>{meData?.me?.friendRequests?.length}</b> pod request(s).
          Go into the project of your choice to accept of decline.
        </Box>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default ProfileHeading;
