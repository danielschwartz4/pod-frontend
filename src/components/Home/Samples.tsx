import { Box, Image } from "@chakra-ui/react";
import React from "react";
import createProject from "../../images/Samples/createProject.gif";
import joinPod from "../../images/Samples/joinPod.gif";
import editProject from "../../images/Samples/editProject.gif";

interface SamplesProps {}

export const Samples: React.FC<SamplesProps> = ({}) => {
  return (
    <Box mx={"auto"}>
      <Box>
        <Image width={"50%"} src={createProject.src}></Image>
      </Box>
      <Box>
        <Image width={"50%"} src={joinPod.src}></Image>
      </Box>
      <Box>
        <Image width={"50%"} src={editProject.src}></Image>
      </Box>
    </Box>
  );
};
