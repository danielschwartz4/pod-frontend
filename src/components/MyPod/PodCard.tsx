import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactFlowProvider } from "react-flow-renderer";
import { Project, useMeQuery } from "../../generated/graphql";
import avatarMap from "../../utils/avatarMap";
import compPercentage from "../../utils/compPercentage";
import { convertFromMilitaryTime } from "../../utils/formatDate";
import FlowChartMini from "../MyProject/FlowChartMini";

interface PodCardProps {
  project: Project;
}

const PodCard: React.FC<PodCardProps> = (props) => {
  const { data, loading } = useMeQuery({});
  const date = props.project.updatedAt.split(".")[0].split("T");
  return (
    <Center>
      <Box
        border={props.project?.userId === data?.me?.id ? "4px" : ""}
        borderColor="#3EE76D"
        maxH={"350px"}
        width={"100%"}
        maxW={"350px"}
        mx={[2, 4]}
        bg={useColorModeValue("gainsboro", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box h={"200px"} bg={"gray.100"} mt={-6} mx={-6} pos={"relative"}>
          <ReactFlowProvider>
            <FlowChartMini
              milestoneProgress={props.project.milestoneProgress}
              milestones={props.project.milestones}
              milestoneDates={props.project.milestoneDates}
            />
          </ReactFlowProvider>
        </Box>
        <Box>
          <Stack maxH={"120px"}>
            <Heading
              color={useColorModeValue("gray.700", "gainsboro")}
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
          <Stack
            textColor={"gray.500"}
            mt={6}
            direction={"row"}
            spacing={4}
            align={"center"}
          >
            <Avatar src={avatarMap(data?.me?.avatar)} alt={"Author"} />
            <Text fontSize={14}>
              Last update: {date[0]} {convertFromMilitaryTime(date[1])}
            </Text>
            <Text>
              Done: {compPercentage(props.project?.milestoneProgress)}
            </Text>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};

export default PodCard;
