import {
  Avatar,
  Box,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { RecurringTask, useMeQuery } from "../../generated/graphql";
import avatarMap from "../../utils/avatarMap";
import { convertFromMilitaryTime } from "../../utils/formatDate";

interface PodCardProps {
  task: RecurringTask;
}

const PodCard: React.FC<PodCardProps> = ({ task }) => {
  const { data, loading } = useMeQuery({});
  const date = task.updatedAt.split(".")[0].split("T");

  return (
    <Center>
      <Box
        border={task?.userId === data?.me?.id ? "4px" : ""}
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
          <ReactFlowProvider>VISUALIZATION</ReactFlowProvider>
        </Box>
        <Box>
          <Stack maxH={"120px"}>
            <Heading
              color={useColorModeValue("gray.700", "gainsboro")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {task?.taskName == "Click here to name project"
                ? `Task ${task?.id}`
                : task?.taskName}
            </Heading>
            <Text color={"gray.500"}>{task?.overview}</Text>
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
            <Text textColor={"gainsboro"}>Comp: X%</Text>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};

export default PodCard;
