import {
  AddIcon,
  LockIcon,
  MinusIcon,
  SmallAddIcon,
  SmallCloseIcon,
  TimeIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import React from "react";
import {
  SingleTasksQuery,
  useUpdateSingleTaskCompletionStatusMutation,
} from "../../generated/graphql";
import { beforeToday, daysEqual } from "../../utils/getConsistency";
import TaskCircle from "./TaskCircle";

interface ProgressGridSkeletonProps {
  orderedTasks: SingleTasksQuery;
  completedCount: {};
  setCompletedCount: React.Dispatch<React.SetStateAction<{}>>;
  today: Date;
  rangeStart: Date;
}

export const ProgressGridSkeleton: React.FC<ProgressGridSkeletonProps> = ({
  orderedTasks,
  completedCount,
  setCompletedCount,
  today,
  rangeStart,
}) => {
  const [updateSingleTaskCompletionStatus] =
    useUpdateSingleTaskCompletionStatusMutation();

  const dayTitles = ["S", "M", "T", "W", "T", "F", "S"];
  let i = 0;
  let taskIter = 0;
  let filledArr = [];
  while (taskIter <= orderedTasks?.singleTasks?.singleTasks?.length - 1) {
    if (i % 7 == orderedTasks?.singleTasks?.singleTasks[taskIter].actionDay) {
      filledArr.push(orderedTasks?.singleTasks?.singleTasks[taskIter]);
      i++;
      taskIter++;
    } else {
      filledArr.push(null);
      i++;
    }
  }

  return (
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
          // const beforeToday = new Date(filledArr[i].actionDate) < today;
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
          if (!isDaysEqual && !isBeforeToday && filledArr[i].status != "tbd") {
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
                  daysEqual(today, tmpDate)
                    ? AddIcon
                    : isBeforeToday
                    ? SmallAddIcon
                    : LockIcon
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
  );
};
