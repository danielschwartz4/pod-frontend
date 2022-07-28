import { Flex, Button, Box } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { Font } from "../../css/styles";
import { MeQuery } from "../../generated/graphql";
import { Event } from "../../libs/tracking";

interface ProfileHeadingProps {
  meData: MeQuery;
  firstProject: Boolean;
}

const ProfileHeading: React.FC<ProfileHeadingProps> = ({
  meData,
  firstProject,
}) => {
  return (
    <Flex
      display={{ base: "contents", sm: "flex" }}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Font>
        <b style={{ fontSize: "48px" }}>My Projects</b>
      </Font>
      <Button
        display={"flex"}
        alignItems={"center"}
        width={"65px"}
        height={"55px"}
        fontFamily={"ubuntu"}
        style={{ fontSize: "48px", borderRadius: "45px", fontWeight: "thin" }}
        bg={"#FFDC93"}
        mt={8}
        cursor={"pointer"}
        outline={"black"}
        onClick={() => {
          router.push("/project-info");
          Event("Desktop", "Create Project Button", "Create Project");
        }}
      >
        +
      </Button>
      {firstProject ? (
        <Font style={{ fontSize: "20px", marginTop: "15px" }}>
          Add a project to get started!
        </Font>
      ) : (
        ""
      )}
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
