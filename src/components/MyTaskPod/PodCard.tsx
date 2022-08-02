import { Box, Flex, Text } from "@chakra-ui/react";
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
import { daysEqual } from "../../utils/getConsistency";
import {
  singleTasksRangeDaysHelper,
  singleTasksToTodayHelper,
} from "../../utils/getDayRanges";
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
      height={"275px"}
      width={"275px"}
      fontFamily={"ubuntu"}
    >
      <Flex mt={8} w={"100%"}>
        <Text mx={"auto"} fontSize={18}>
          {meData?.me?.id == task?.userId
            ? meData?.me?.username
            : task?.user?.username}
        </Text>
      </Flex>
      <Flex mt={-4}>
        <Text mx={"auto"} fontSize={14}>
          Last update: {moment(task?.updatedAt).calendar()}
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
