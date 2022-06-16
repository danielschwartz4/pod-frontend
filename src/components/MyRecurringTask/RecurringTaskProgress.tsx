import { Box, Divider, Flex, HStack, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { RecurringTaskQuery, SingleTasksQuery } from "../../generated/graphql";
import { extractDaysIdxs } from "../../utils/singleTaskUtils";
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
  const daysIdxs = extractDaysIdxs(myTaskData?.recurringTask?.task?.days);
  const [allTimePercentage, setAllTimePercentage] = useState();

  console.log("helo");
  console.log(singleTasksData?.singleTasks?.singleTasks[0].actionDate);
  console.log(new Date().getDate());
  console.log(new Date().getMonth());
  console.log(new Date().getFullYear());

  return (
    <Flex>
      <Stack
        direction={{ base: "column", md: "row" }}
        gap={{ base: 0, md: 20 }}
        mx={"auto"}
      >
        <Box mt={16}>
          <ProgressGridSkeleton orderedTasks={singleTasksData} />
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
          <CircularTaskProgress value={80} title={"All time"} />
          <CircularTaskProgress value={60} title={"Last two weeks"} />
        </Flex>
      </Stack>
    </Flex>
  );
};
