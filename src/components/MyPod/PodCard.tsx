import {
  Avatar,
  Box,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactFlowProvider } from "react-flow-renderer";
import FlowChart from "../MyProject/FlowChart";

interface PodCardProps {
  username?: string;
  milestones?: string[];
  milestoneDates?: string[];
  milestoneProgress?: number[];
  overview: string;
  projectName: string;
  createdAt: string;
  updatedAt: string;
}

const PodCard: React.FC<PodCardProps> = (props) => {
  const date = props.updatedAt.split(".")[0].split("T");
  return (
    <Center py={6}>
      <Box
        maxW={"350px"}
        minH={"450px"}
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
              <FlowChart
                isMainProject={false}
                milestoneProgress={props.milestoneProgress}
                milestones={props.milestones}
                milestoneDates={props.milestoneDates}
              ></FlowChart>
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
            <Text color={"gray.500"}>
              Last update: {date[0]} {date[1]}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default PodCard;