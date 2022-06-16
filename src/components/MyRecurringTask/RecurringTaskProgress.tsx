import { Box, Divider, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { RecurringTaskQuery, SingleTasksQuery } from "../../generated/graphql";
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

  const singleTasksToToday = singleTasksData?.singleTasks?.singleTasks?.filter(
    (task) =>
      beforeToday(new Date(task?.actionDate), today) ||
      daysEqual(new Date(task?.actionDate), today)
  );

  const singleTasks3Day = singleTasksToToday.slice(-7);

  const [completedCount, setCompletedCount] = useState({
    0: getConsistencyCount(singleTasksToToday),
    3: getConsistencyCount(singleTasks3Day),
  });

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
            rangeStart={new Date(singleTasks3Day[0].actionDate)}
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
            taskLength={singleTasksToToday.length}
            completedCount={completedCount}
            title={"All time"}
            today={today}
            variant={0}
          />
          <CircularTaskProgress
            taskLength={singleTasks3Day.length}
            completedCount={completedCount}
            title={"Last 7 tasks"}
            today={today}
            variant={3}
          />
        </Flex>
      </Stack>
    </Flex>
  );
};
