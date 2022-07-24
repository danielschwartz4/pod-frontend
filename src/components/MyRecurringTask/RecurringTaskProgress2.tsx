import { Box, Button, Divider, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { ADD_TASKS_LIMIT, RANGE_DAYS, TODAY } from "../../constants";
import {
  RecurringTaskQuery,
  SingleTask,
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
  refetchSingleTasks: () => void;
}

export const RecurringTaskProgress: React.FC<RecurringTaskProgressProps> = ({
  myTaskData,
  singleTasksData,
  refetchSingleTasks,
}) => {
  if (!singleTasksData?.singleTasks?.singleTasks) {
    return <Box>Loading...</Box>;
  }

  const singleTasksToToday = singleTasksToTodayHelper(
    singleTasksData?.singleTasks?.singleTasks as SingleTask[]
  );

  const singleTasksRangeDays = singleTasksRangeDaysHelper(singleTasksToToday);

  const [completedCount, setCompletedCount] = useState<CompletedCount>({
    allTime: getConsistencyCount(singleTasksToToday),
    week: getConsistencyCount(singleTasksRangeDays),
  });

  return (
    <Flex>
      <Stack
        direction={{ base: "column", lg: "row" }}
        gap={{ md: 0, lg: 20 }}
        mx={"auto"}
      >
        <Box mt={0}>
          <ProgressGridSkeleton
            setCompletedCount={setCompletedCount}
            completedCount={completedCount}
            singleTasksData={singleTasksData}
            rangeStart={new Date(singleTasksRangeDays[0]?.actionDate)}
            myTaskData={myTaskData}
            refetchSingleTasks={refetchSingleTasks}
          />
        </Box>
        <Box display={{ base: "none", lg: "block" }}>
          <Divider
            color={"gray.400"}
            orientation={"vertical"}
            mt={8}
            height={"80%"}
          />
        </Box>
        <Box display={{ base: "block", lg: "none" }}>
          <Divider color={"gray.400"} mt={2} orientation={"horizontal"} />
        </Box>
        <Flex justify={"space-between"} direction={{ md: "row", lg: "column" }}>
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
