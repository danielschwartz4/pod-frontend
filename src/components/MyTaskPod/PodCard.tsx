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
import React from "react";
import {
  MeQuery,
  RecurringTask,
  SingleTask,
  useMeQuery,
  useSingleTasksQuery,
} from "../../generated/graphql";
import avatarMap from "../../utils/avatarMap";
import formatDate, { convertFromMilitaryTime } from "../../utils/formatDate";
import {
  singleTasksToTodayHelper,
  singleTasksRangeDaysHelper,
} from "../../utils/getDayRanges";
import { MiniCircleTaskProgress } from "../MyRecurringTask/MiniCircleTaskProgress";
import { MiniProgressGridSkeleton } from "../MyRecurringTask/MiniProgressGridSkeleton";

interface PodCardProps {
  task: RecurringTask;
  meData: MeQuery;
}

const PodCard: React.FC<PodCardProps> = ({ task, meData }) => {
  const { data, loading } = useMeQuery({});
  const date = task.updatedAt.split(".")[0].split("T");

  const { data: singleTasksData, loading: singleTasksDataLoading } =
    useSingleTasksQuery({
      variables: {
        taskId: task?.id,
      },
    });

  const singleTasksToToday = singleTasksToTodayHelper(
    singleTasksData?.singleTasks?.singleTasks as SingleTask[]
  );

  const singleTasksRangeDays = singleTasksRangeDaysHelper(singleTasksToToday);

  return (
    <Center>
      <Box
        border={task?.userId === data?.me?.id ? "4px" : ""}
        borderColor="#3EE76D"
        maxH={"420px"}
        width={"100%"}
        maxW={"380px"}
        mx={[2, 4]}
        bg={useColorModeValue("gainsboro", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        {/* <Box h={"220px"} bg={"gray.100"} mt={-6} mx={-6}> */}
        <Flex dir="vertical" h={"220px"} bg={"gray.100"}>
          <Box m={"auto"}>
            <MiniProgressGridSkeleton
              singleTasksData={singleTasksData}
              task={task}
            />
          </Box>
        </Flex>
        {/* </Box> */}
        <Box px={6} pb={6}>
          <Flex>
            <Box>
              <MiniCircleTaskProgress
                variant={"allTime"}
                taskLength={singleTasksToToday?.length}
                title={"All time"}
                completedCount={task?.completedCount}
              />
            </Box>
            <Stack m={"auto"} maxH={"120px"}>
              <Heading
                color={useColorModeValue("gray.700", "gainsboro")}
                fontSize={"2xl"}
                fontFamily={"body"}
              >
                {task?.taskName == "Click here to name project"
                  ? `Task ${task?.id}`
                  : task?.taskName}
              </Heading>
              <Text overflow={"hidden"} color={"gray.500"}>
                {task?.overview}
              </Text>
            </Stack>
            <Box>
              <MiniCircleTaskProgress
                variant={"week"}
                taskLength={singleTasksRangeDays?.length}
                title={"Last 7 tasks"}
                completedCount={task?.completedCount}
              />
            </Box>
          </Flex>

          <Stack
            textColor={"gray.500"}
            mt={4}
            direction={"row"}
            spacing={4}
            align={"center"}
          >
            {meData?.me?.id == task?.userId ? (
              <Avatar src={avatarMap(meData?.me?.avatar)} alt={"Author"} />
            ) : (
              <Avatar src={avatarMap(task?.user?.avatar)} alt={"Author"} />
            )}
            <Box>
              <Flex>
                <Text mr={"auto"} fontSize={14} mb={0}>
                  {meData?.me?.id == task?.userId
                    ? meData?.me?.username
                    : task?.user?.username}
                </Text>
              </Flex>
              <Text fontSize={14}>
                Last update: {formatDate(task.updatedAt, true)}
              </Text>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};

export default PodCard;
