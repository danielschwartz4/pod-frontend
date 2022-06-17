import {
  AddIcon,
  LockIcon,
  SmallAddIcon,
  SmallCloseIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import {
  RecurringTask,
  RecurringTaskQuery,
  SingleTasksQuery,
  useUpdateSingleTaskCompletionStatusMutation,
} from "../../generated/graphql";
import { beforeToday, daysEqual } from "../../utils/getConsistency";
import { extractDaysIdxs } from "../../utils/singleTaskUtils";
import TaskCircle from "./TaskCircle";

interface ProgressGridSkeletonProps {
  orderedTasks: SingleTasksQuery;
  completedCount: {};
  setCompletedCount: React.Dispatch<React.SetStateAction<{}>>;
  today: Date;
  rangeStart: Date;
  myTaskData: RecurringTaskQuery;
}

export const ProgressGridSkeleton: React.FC<ProgressGridSkeletonProps> = ({
  orderedTasks,
  completedCount,
  setCompletedCount,
  today,
  rangeStart,
  myTaskData,
}) => {
  const [updateSingleTaskCompletionStatus] =
    useUpdateSingleTaskCompletionStatusMutation();

  const dayTitles = ["S", "M", "T", "W", "T", "F", "S"];
  const daysIdxs = extractDaysIdxs(myTaskData?.recurringTask?.task?.days);
  let i = 0;
  let taskIter = 0;
  let filledArr = [];
  while (taskIter <= orderedTasks?.singleTasks?.singleTasks?.length - 1) {
    if (i % 7 == orderedTasks?.singleTasks?.singleTasks[taskIter].actionDay) {
      filledArr.push(orderedTasks?.singleTasks?.singleTasks[taskIter]);
      i++;
      taskIter++;
    } else {
      // !! Push the date instead of null
      filledArr.push(null);
      i++;
    }
  }

  return (
    <Box>
      <Flex mb={-8} ml={6} fontSize={24} textColor={"gainsboro"}>
        {!daysIdxs?.has(today.getDay()) ? (
          <Text>Off day today!</Text>
        ) : (
          <Text></Text>
        )}
      </Flex>
      <Grid templateColumns={"repeat(7, 0fr)"} gap={6}>
        {Object.keys(dayTitles).map((i) => {
          return (
            <GridItem key={i}>
              <Text fontSize={"36px"} mb={-4} textColor={"gainsboro"}>
                {dayTitles[i]}
              </Text>
            </GridItem>
          );
        })}

        {Object.keys(filledArr).map((i) => {
          if (filledArr[i] == null) {
            return (
              <GridItem key={i} opacity={"70%"}>
                <TaskCircle
                  today={today}
                  icon={SmallCloseIcon}
                  color="grey"
                  isInteractive={false}
                  rangeStart={rangeStart}
                />
              </GridItem>
            );
          } else {
            const tmpDate = new Date(filledArr[i].actionDate);
            const isBeforeToday = beforeToday(tmpDate, today);
            const isDaysEqual = daysEqual(today, tmpDate);
            if (isBeforeToday && filledArr[i].status == "tbd") {
              updateSingleTaskCompletionStatus({
                variables: {
                  status: "overdue",
                  updateSingleTaskCompletionStatusId: filledArr[i].id,
                },
              });
            }
            if (isDaysEqual && filledArr[i].status == "overdue") {
              updateSingleTaskCompletionStatus({
                variables: {
                  status: "tbd",
                  updateSingleTaskCompletionStatusId: filledArr[i].id,
                },
              });
            }
            if (
              !isDaysEqual &&
              !isBeforeToday &&
              filledArr[i].status != "tbd"
            ) {
              updateSingleTaskCompletionStatus({
                variables: {
                  status: "tbd",
                  updateSingleTaskCompletionStatusId: filledArr[i].id,
                },
              });
            }

            return (
              <GridItem key={i}>
                <TaskCircle
                  today={today}
                  setCompletedCount={setCompletedCount}
                  completedCount={completedCount}
                  icon={
                    isDaysEqual
                      ? AddIcon
                      : isBeforeToday
                      ? ViewIcon // SmallAddIcon
                      : ViewOffIcon // LockIcon
                  }
                  color={
                    filledArr[i].status == "completed"
                      ? "#3EE76D"
                      : filledArr[i].status == "missed"
                      ? "#F26D51"
                      : filledArr[i].status == "overdue"
                      ? "#f2df51"
                      : "#6097F8"
                  }
                  singleTask={filledArr[i]}
                  isInteractive={true}
                  rangeStart={rangeStart}
                />
              </GridItem>
            );
          }
        })}
      </Grid>
    </Box>
  );
};
