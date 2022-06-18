import { Box, Button, Divider, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { ADD_TASKS_LIMIT, TODAY } from "../../constants";
import {
  RecurringTaskQuery,
  SingleTasksQuery,
  useAddSingleTasksChunkMutation,
} from "../../generated/graphql";
import {
  beforeToday,
  daysEqual,
  getConsistencyCount,
} from "../../utils/getConsistency";
import { CircularTaskProgress } from "./CircularTaskProgress";
import { ProgressGridSkeleton } from "./ProgressGridSkeleton";

interface RecurringTaskProgressProps {
  myTaskData: RecurringTaskQuery;
  singleTasksData: SingleTasksQuery;
}

export const RecurringTaskProgress: React.FC<RecurringTaskProgressProps> = ({
  myTaskData,
  singleTasksData,
}) => {
  if (!singleTasksData?.singleTasks?.singleTasks) {
    return <Box>Loading...</Box>;
  }

  const [addSingleTasksChunk] = useAddSingleTasksChunkMutation();

  const singleTasksToToday = singleTasksData?.singleTasks?.singleTasks?.filter(
    (task) =>
      beforeToday(new Date(task?.actionDate), TODAY) ||
      daysEqual(new Date(task?.actionDate), TODAY)
  );

  const singleTasksRangeDays = singleTasksToToday.slice(-7);

  const [completedCount, setCompletedCount] = useState({
    0: getConsistencyCount(singleTasksToToday),
    3: getConsistencyCount(singleTasksRangeDays),
  });

  return (
    <Flex>
      <Button
        onClick={() => {
          addSingleTasksChunk({
            variables: {
              limit: ADD_TASKS_LIMIT,
              recTaskId: myTaskData?.recurringTask?.task?.id,
            },
          });
        }}
      >
        Add tasks
      </Button>
      <Stack
        direction={{ base: "column", md: "row" }}
        gap={{ base: 0, md: 20 }}
        mx={"auto"}
      >
        <Box mt={0}>
          <ProgressGridSkeleton
            setCompletedCount={setCompletedCount}
            completedCount={completedCount}
            orderedTasks={singleTasksData}
            rangeStart={new Date(singleTasksRangeDays[0]?.actionDate)}
            myTaskData={myTaskData}
          />
        </Box>
        <Box display={{ base: "none", md: "block" }}>
          <Divider
            color={"gray.400"}
            orientation={"vertical"}
            mt={8}
            height={"80%"}
          />
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <Divider color={"gray.400"} mt={2} orientation={"horizontal"} />
        </Box>
        <Flex
          justify={"space-between"}
          direction={{ base: "row", md: "column" }}
        >
          <CircularTaskProgress
            taskLength={singleTasksToToday.length}
            completedCount={completedCount}
            title={"All time consistency"}
            variant={0}
          />
          <CircularTaskProgress
            taskLength={singleTasksRangeDays.length}
            completedCount={completedCount}
            title={"Last 7 tasks' consistency"}
            variant={3}
          />
        </Flex>
      </Stack>
    </Flex>
  );
};
