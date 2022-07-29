import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Circle,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { TODAY } from "../../constants";
import {
  MeQuery,
  RecurringTask,
  SingleTask,
  useMeQuery,
  useSingleTasksQuery,
} from "../../generated/graphql";
import avatarMap from "../../utils/avatarMap";
import formatDate, { convertFromMilitaryTime } from "../../utils/formatDate";
import { daysEqual } from "../../utils/getConsistency";
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

  let todayStatus = null;
  singleTasksData?.singleTasks?.singleTasks?.forEach((task) => {
    if (daysEqual(TODAY, new Date(task?.actionDate))) {
      todayStatus = task?.status;
    }
  });

  return (
    <Box
      border={"8px"}
      borderColor={
        todayStatus == "completed" || todayStatus == null
          ? "#3EE76D"
          : todayStatus == "missed" || todayStatus == "tbd"
          ? "#F26D51"
          : "gray"
      }
      borderRadius={"50%"}
      bg={"#F8F2E6"}
      height={"250px"}
      width={"250px"}
      fontFamily={"ubuntu"}
    >
      <Flex mt={2} w={"100%"}>
        {/* <Avatar src={avatarMap(meData?.me?.avatar)} alt={"Author"} /> */}
        <Text mx={"auto"} fontSize={18}>
          {meData?.me?.id == task?.userId
            ? meData?.me?.username
            : task?.user?.username}
        </Text>
      </Flex>
      <Flex mt={-4}>
        <Text mx={"auto"} fontSize={14}>
          Last update: {moment(task?.updatedAt).utc().format("dddd, h:mma")}
        </Text>
      </Flex>
      <MiniProgressGridSkeleton singleTasksData={singleTasksData} task={task} />
      <Flex>
        <Text mx={"auto"} fontSize={14} width="90%">
          {task?.overview}
        </Text>
      </Flex>
    </Box>
  );
};

export default PodCard;
