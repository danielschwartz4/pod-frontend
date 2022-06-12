import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { RecurringTaskQuery, SingleTasksQuery } from "../../generated/graphql";
import { dayIdxMapper } from "../../utils/dayIdxMapper";
import { extractDaysIdxs } from "../../utils/singleTaskUtils";
import { ProgressGridSkeleton } from "./ProgressGridSkeleton";

interface RecurringTaskProgressProps {
  taskData: RecurringTaskQuery;
  singleTasksData: SingleTasksQuery;
}

export const RecurringTaskProgress: React.FC<RecurringTaskProgressProps> = ({
  taskData,
  singleTasksData,
}) => {
  if (!singleTasksData?.singleTasks?.singleTasks) {
    return <Box>Loading...</Box>;
  }
  const daysIdxs = extractDaysIdxs(taskData?.recurringTask?.task?.days);

  return (
    <Flex>
      <Box m={"auto"}>
        <ProgressGridSkeleton orderedTasks={singleTasksData} />
      </Box>
    </Flex>
  );
};
