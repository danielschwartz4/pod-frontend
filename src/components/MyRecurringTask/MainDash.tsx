import { Box, Flex, Heading, Text, Tooltip } from "@chakra-ui/react";
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
import NotificationCenter from "../MyTaskPod/NotificationCenter";
import Tour from "../Tour";
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
    <>
      <Tour />
      <Flex p={4} justifyContent={"center"}>
        <Box mr={{ lg: 4, xl: 16 }} className={"calendar"}>
          <Flex
            // mt={-2}
            alignItems={"center"}
          >
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
          <Flex justifyContent={"center"}>
            <span id="rewardId" />
          </Flex>
          <Flex
            fontSize={["16px", "20px"]}
            fontFamily={"ubuntu"}
            alignItems={"center"}
            my={-4}
            className={"daily-question"}
          >
            <Text mb={"auto"} textColor="#FFDC93">
              Today’s Question: &ensp;{" "}
            </Text>
            <Text textColor="gainsboro" mx={"auto"} maxW={"450px"}>
              {/* What resulted in you completing or not completing today's task? */}
              Describe something you learned today from completing/not
              completing your task.
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
          className={"pod-updates"}
        >
          <Flex>
            <Tooltip
              hasArrow
              label={"Updates from everyone who has ever been in this pod"}
              bg="gray.300"
              color="black"
              placement="top"
            >
              <Heading
                mx={"auto"}
                fontSize={"30px"}
                fontFamily={"ubuntu"}
                textColor="gainsboro"
              >
                Pod updates
              </Heading>
            </Tooltip>
          </Flex>
          <NotificationCenter
            recentPodSingleTasksData={recentPodSingleTasksData}
          />
        </Box>
      </Flex>
    </>
  );
};
