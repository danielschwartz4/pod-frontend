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
import { Project } from "../../generated/graphql";
import pink_monster from "../../images/Avatars/pink_monster.jpeg";
import FlowChart from "../MyProject/FlowChart";
import FlowChartMini from "../MyProject/FlowChartMini";

interface PodCardProps {
  project: Project;
  isMain: boolean;
}

const PodCard: React.FC<PodCardProps> = (props) => {
  const date = props.project.updatedAt.split(".")[0].split("T");
  return (
    <Center>
      <Box
        maxW={"350px"}
        maxH={"350px"}
        minW={"350"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box h={"200px"} bg={"gray.100"} mt={-6} mx={-6} pos={"relative"}>
          <ReactFlowProvider>
            <FlowChart
              milestoneProgress={props.project.milestoneProgress}
              milestones={props.project.milestones}
              milestoneDates={props.project.milestoneDates}
              isMain={props.isMain}
            ></FlowChart>
          </ReactFlowProvider>
        </Box>
        <Box>
          <Stack maxH={"120px"}>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {props.project.projectName}
            </Heading>
            <Text color={"gray.500"}>
              {/* !! Make this cut off after certain number of words */}
              {props.project.overview}
            </Text>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar src={pink_monster.src} alt={"Author"} />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text color={"gray.500"}>
                Last update: {date[0]} {date[1]}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};

export default PodCard;
