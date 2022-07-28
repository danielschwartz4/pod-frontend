import {
  Box,
  Divider,
  Text,
  Flex,
  Stack,
  Heading,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Font } from "../../css/styles";
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
import NotificationCenter from "../MyTaskPod/NotificationCenter";
import { CircularTaskProgress } from "./CircularTaskProgress";
import { ProgressGridSkeleton } from "./ProgressGridSkeleton";

interface MainDashProps {
  myTaskData: RecurringTaskQuery;
  singleTasksData: SingleTasksQuery;
  refetchSingleTasks: () => void;
  recentPodSingleTasksData: SingleTasksQuery;
}

export const MainDash: React.FC<MainDashProps> = ({
  myTaskData,
  singleTasksData,
  refetchSingleTasks,
  recentPodSingleTasksData,
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
    <Flex width={"100%"} p={4} justifyContent={"center"}>
      <Box mr={{ lg: 4, xl: 16 }}>
        <Flex mt={-2} alignItems={"center"}>
          <Box>
            <CircularTaskProgress
              taskLength={singleTasksToToday.length}
              completedCount={completedCount}
              title={"All time consistency"}
              variant={"allTime"}
            />
          </Box>
          <Heading
            mx={"auto"}
            fontSize={"30px"}
            fontFamily={"ubuntu"}
            textColor="gainsboro"
          >
            {myTaskData?.recurringTask?.task?.taskName}
          </Heading>
          <CircularTaskProgress
            taskLength={singleTasksRangeDays.length}
            completedCount={completedCount}
            title={"Last 7 tasks' consistency"}
            variant={"week"}
          />
        </Flex>
        <Flex
          fontSize={["16px", "20px"]}
          fontFamily={"ubuntu"}
          alignItems={"center"}
          my={-4}
        >
          <Text textColor="#FFDC93">Today’s Question: &ensp; </Text>
          <Text textColor="gainsboro" mx={"auto"} maxW={"99%"}>
            How did you feel after completing your task?
          </Text>
        </Flex>
        <Flex>
          <Box mx={"auto"}>
            <ProgressGridSkeleton
              setCompletedCount={setCompletedCount}
              completedCount={completedCount}
              singleTasksData={singleTasksData}
              rangeStart={new Date(singleTasksRangeDays[0]?.actionDate)}
              myTaskData={myTaskData}
              refetchSingleTasks={refetchSingleTasks}
            />
          </Box>
        </Flex>
      </Box>

      <Box
        ml={{ lg: 4, xl: 16 }}
        display={{ base: "none", sm: "none", md: "none", lg: "block" }}
      >
        <NotificationCenter
          recentPodSingleTasksData={recentPodSingleTasksData}
        />
      </Box>
    </Flex>
  );
};

{
  /* <Flex
        justify={{
          base: "none",
          sm: "none",
          md: "space-between",
        }}
        direction={{ base: "row", sm: "row", md: "column" }}
        gap={{ base: "30px", sm: "30px", md: "0" }}
      > */
}
{
  /* <CircularTaskProgress
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
        /> */
}
{
  /* </Flex> */
}
