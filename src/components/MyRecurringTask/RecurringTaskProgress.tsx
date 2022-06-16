import { Box, Divider, Flex, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RecurringTaskQuery, SingleTasksQuery } from "../../generated/graphql";
import { getConsistencyCount } from "../../utils/getConsistency";
import { extractDaysIdxs } from "../../utils/singleTaskUtils";
import { CircularTaskProgress } from "./CircularTaskProgress";
import { ProgressGridSkeleton } from "./ProgressGridSkeleton";

interface RecurringTaskProgressProps {
  myTaskData: RecurringTaskQuery;
  singleTasksData: SingleTasksQuery;
  today: Date;
}

export const RecurringTaskProgress: React.FC<RecurringTaskProgressProps> = ({
  myTaskData,
  singleTasksData,
  today,
}) => {
  if (!singleTasksData?.singleTasks?.singleTasks) {
    return <Box>Loading...</Box>;
  }
  const daysIdxs = extractDaysIdxs(myTaskData?.recurringTask?.task?.days);
  const [completedCount, setCompletedCount] = useState(
    getConsistencyCount(singleTasksData, today)
  );
  const singleTasksLength = singleTasksData?.singleTasks?.singleTasks?.filter(
    (task) => new Date(task?.actionDate) < today
  ).length;

  return (
    <Flex>
      <Stack
        direction={{ base: "column", md: "row" }}
        gap={{ base: 0, md: 20 }}
        mx={"auto"}
      >
        <Box mt={16}>
          <ProgressGridSkeleton
            setCompletedCount={setCompletedCount}
            completedCount={completedCount}
            orderedTasks={singleTasksData}
            today={today}
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
            taskLength={singleTasksLength}
            completedCount={completedCount}
            title={"All time"}
            today={today}
          />
          <CircularTaskProgress
            taskLength={singleTasksLength}
            completedCount={completedCount}
            title={"Last two weeks"}
            today={today}
          />
        </Flex>
      </Stack>
    </Flex>
  );
};
