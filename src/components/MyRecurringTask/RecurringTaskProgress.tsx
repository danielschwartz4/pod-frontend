import { Box, Button, Divider, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { ADD_TASKS_LIMIT, RANGE_DAYS, TODAY } from "../../constants";
import {
  RecurringTaskQuery,
  SingleTasksQuery,
  useAddSingleTasksChunkMutation,
} from "../../generated/graphql";
import { CompletedCount } from "../../types/types";
import {
  beforeToday,
  daysEqual,
  getConsistencyCount,
} from "../../utils/getConsistency";
import {
  singleTasksRangeDaysHelper,
  singleTasksToTodayHelper,
} from "../../utils/getDayRanges";
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

  const singleTasksToToday = singleTasksToTodayHelper(
    singleTasksData?.singleTasks?.singleTasks
  );

  const singleTasksRangeDays = singleTasksRangeDaysHelper(singleTasksToToday);

  const [completedCount, setCompletedCount] = useState<CompletedCount>({
    allTime: getConsistencyCount(singleTasksToToday),
    week: getConsistencyCount(singleTasksRangeDays),
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
            singleTasksData={singleTasksData}
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
            variant={"allTime"}
          />
          <CircularTaskProgress
            taskLength={singleTasksRangeDays.length}
            completedCount={completedCount}
            title={"Last 7 tasks' consistency"}
            variant={"week"}
          />
        </Flex>
      </Stack>
    </Flex>
  );
};
