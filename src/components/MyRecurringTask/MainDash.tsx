import { Box, Flex, Heading, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { TODAY } from "../../constants";
import {
  RecurringTaskQuery,
  SingleTask,
  SingleTasksQuery,
} from "../../generated/graphql";
import { CompletedCount } from "../../types/types";
import { daysEqual, getConsistencyCount } from "../../utils/getConsistency";
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
  refetchPodSingleTasksData: () => void;
}

export const MainDash: React.FC<MainDashProps> = ({
  myTaskData,
  singleTasksData,
  refetchSingleTasks,
  recentPodSingleTasksData,
  refetchPodSingleTasksData,
}) => {
  if (!singleTasksData?.singleTasks?.singleTasks) {
    return <></>;
  }

  const todayTask = singleTasksData?.singleTasks?.singleTasks?.find((task) =>
    daysEqual(new Date(task?.actionDate), TODAY)
  );

  console.log(todayTask);

  const singleTasksToToday = singleTasksToTodayHelper(
    singleTasksData?.singleTasks?.singleTasks as SingleTask[]
  );

  const singleTasksRangeDays = singleTasksRangeDaysHelper(singleTasksToToday);

  const [completedCount, setCompletedCount] = useState<CompletedCount>({
    // if todayTask is undefined then 1 otherwise getConistencyCount(todayTask)
    allTime: getConsistencyCount(singleTasksToToday),
    week: getConsistencyCount(singleTasksRangeDays),
  });

  return (
    <>
      <Tour />
      <Flex
        display={{ base: "block", sm: "block", md: "flex" }}
        p={4}
        justifyContent={"center"}
      >
        <Box mr={{ lg: 4, xl: 16 }} className={"calendar"}>
          <Flex alignItems={"center"}>
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
            <Text mb={"auto"} textColor="#FFDC93" mr={{ base: 2, sm: 0 }}>
              Today’s Question: &ensp;{" "}
            </Text>
            <Text textColor="gainsboro" maxW={"450px"}>
              {/* What resulted in you completing or not completing today's task? */}
              {/* Describe something you learned today from completing/not
              completing your task. */}
              What was difficult about completing today's task?
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
                refetchPodSingleTasksData={refetchPodSingleTasksData}
              />
            </Box>
          </Flex>
        </Box>

        <Box
          ml={{ lg: 4, xl: 16 }}
          // display={{ base: "none", sm: "none", md: "none", lg: "block" }}
          className={"pod-updates"}
        >
          <Flex>
            <Tooltip
              hasArrow
              label={"Updates from everyone who has ever been in this pod"}
              bg="gray.300"
              color="black"
              placement="top"
              fontFamily={"ubuntu"}
            >
              <Heading
                mx={"auto"}
                fontSize={"30px"}
                fontFamily={"ubuntu"}
                textColor="#FFDC93"
              >
                Pod channel
              </Heading>
            </Tooltip>
          </Flex>
          <Flex>
            <Box mx={"auto"}>
              <NotificationCenter
                recentPodSingleTasksData={recentPodSingleTasksData}
                myTaskData={myTaskData}
                refetchPodSingleTasksData={refetchPodSingleTasksData}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
