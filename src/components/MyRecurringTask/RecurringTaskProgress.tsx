import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { RecurringTaskQuery, SingleTasksQuery } from "../../generated/graphql";
import { extractDaysIdxs } from "../../utils/singleTaskUtils";
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
  const daysIdxs = extractDaysIdxs(myTaskData?.recurringTask?.task?.days);

  return (
    <Flex>
      <Box m={"auto"}>
        <ProgressGridSkeleton orderedTasks={singleTasksData} />
      </Box>
    </Flex>
  );
};
