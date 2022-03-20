import {
  Avatar,
  Box,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { ReactFlowProvider } from "react-flow-renderer";
import bgImage from "../../images/design.png";
import HorizontalFlow from "../MyProject/FlowChart";
import HorizontalFlow2 from "./Test";

interface PodCardProps {
  username?: string;
  milestones?: string[];
  milestoneDates?: string[];
  overview: string;
  projectName: string;
  createdAt: Date;
  updatedAt: Date;
}

const PodCard: React.FC<PodCardProps> = (props) => {
  return (
    <Center py={6}>
      <Box
        maxW={"350"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <ReactFlowProvider>
              <HorizontalFlow milestones={props.milestones}></HorizontalFlow>
              {/* <HorizontalFlow2></HorizontalFlow2> */}
            </ReactFlowProvider>
          </div>
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {props.username}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {props.projectName}
          </Heading>

          <Text color={"gray.500"}>
            {/* !! Make this cut off after certain number of words */}
            {props.overview}
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            alt={"Author"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={"gray.500"}>Last update: {props.updatedAt}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default PodCard;
