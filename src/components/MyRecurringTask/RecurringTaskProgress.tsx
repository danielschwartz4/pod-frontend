import { Box, Divider, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  RecurringTaskQuery,
  SingleTask,
  SingleTasksQuery,
} from "../../generated/graphql";
import { CompletedCount } from "../../types/types";
import { getConsistencyCount } from "../../utils/getConsistency";
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
    return <></>;
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
    <Stack
      justifyContent={"center"}
      direction={{ base: "column", sm: "column", md: "row" }}
      gap={{ base: 0, sm: 10, md: 10, lg: 20 }}
      mx={"auto"}
    >
      <Box>
        <ProgressGridSkeleton
          setCompletedCount={setCompletedCount}
          completedCount={completedCount}
          singleTasksData={singleTasksData}
          rangeStart={new Date(singleTasksRangeDays[0]?.actionDate)}
          myTaskData={myTaskData}
          refetchSingleTasks={refetchSingleTasks}
        />
      </Box>
      <Flex display={{ base: "none", sm: "none", md: "flex" }}>
        <Divider
          my={"auto"}
          color={"gray.400"}
          h={"80%"}
          orientation={"vertical"}
        />
      </Flex>
      <Flex
        justify={{
          base: "none",
          sm: "none",
          md: "space-between",
        }}
        direction={{ base: "row", sm: "row", md: "column" }}
        gap={{ base: "30px", sm: "30px", md: "0" }}
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
  );
};
