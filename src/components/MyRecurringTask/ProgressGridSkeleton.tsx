import {
  AddIcon,
  SmallCloseIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { SKELETON_UNIT_SIZE, TODAY } from "../../constants";
import {
  RecurringTaskQuery,
  SingleTasksQuery,
  useUpdateSingleTaskCompletionStatusMutation,
} from "../../generated/graphql";
import { CompletedCount } from "../../types/types";
import { beforeToday, daysEqual } from "../../utils/getConsistency";
import { addDays, extractDaysIdxs } from "../../utils/singleTaskUtils";
import TaskCircle from "./TaskCircle";

interface ProgressGridSkeletonProps {
  singleTasksData: SingleTasksQuery;
  completedCount: {};
  setCompletedCount: React.Dispatch<React.SetStateAction<CompletedCount>>;
  rangeStart: Date;
  myTaskData: RecurringTaskQuery;
  refetchSingleTasks: () => void;
  refetchPodSingleTasksData?: () => void;
}

export const ProgressGridSkeleton: React.FC<ProgressGridSkeletonProps> = ({
  singleTasksData,
  completedCount,
  setCompletedCount,
  rangeStart,
  myTaskData,
  refetchSingleTasks,
  refetchPodSingleTasksData,
}) => {
  const [updateSingleTaskCompletionStatus] =
    useUpdateSingleTaskCompletionStatusMutation();

  const dayTitles = ["S", "M", "T", "W", "T", "F", "S"];
  const daysIdxs = extractDaysIdxs(myTaskData?.recurringTask?.task?.days);

  const filterdBelow = singleTasksData?.singleTasks?.singleTasks?.filter(
    (task) => beforeToday(new Date(task?.actionDate), TODAY)
  );

  let filteredData = singleTasksData?.singleTasks?.singleTasks?.filter(
    (task) =>
      !beforeToday(new Date(task?.actionDate), addDays(-14, TODAY)) &&
      beforeToday(
        new Date(task?.actionDate),
        addDays(Math.max(14, 14 + (14 - filterdBelow.length)), TODAY)
      )
  );

  let i = 0;
  let taskIter = 0;
  let filledArr = [] as {}[];
  let tmpActionDay = new Date(filteredData[0]?.actionDate);
  let daysAfterTmp: 0;
  while (taskIter <= filteredData.length - 1) {
    if (i % SKELETON_UNIT_SIZE == filteredData[taskIter].actionDay) {
      filledArr.push(filteredData[taskIter]);
      tmpActionDay = filteredData[taskIter].actionDate;
      i++;
      taskIter++;
      daysAfterTmp = 0;
    } else {
      daysAfterTmp++;
      if (daysEqual(addDays(daysAfterTmp, tmpActionDay), TODAY)) {
        filledArr.push(undefined);
      } else {
        filledArr.push(null);
      }
      i++;
    }
  }
  filledArr = filledArr.slice(0, 35);

  return (
    <Box>
      <Grid templateColumns={"repeat(7, 0fr)"} gap={{ base: 4, sm: 6 }}>
        {Object.keys(dayTitles).map((i) => {
          return (
            <GridItem key={i} display={"flex"} justifyContent={"center"}>
              <Text
                fontWeight={"medium"}
                fontFamily={"ubuntu"}
                fontSize={"30px"}
                mb={-4}
                textColor={"gainsboro"}
              >
                {dayTitles[i]}
              </Text>
            </GridItem>
          );
        })}

        {Object.keys(filledArr).map((i) => {
          if (filledArr[i] == null || filledArr[i] == undefined) {
            const status = filledArr[i]?.status;
            return (
              <GridItem key={i} opacity={"70%"}>
                {i == "0" ? (
                  <Box className="task-circle">
                    <TaskCircle
                      task={myTaskData}
                      icon={SmallCloseIcon}
                      status={status}
                      isInteractive={false}
                      rangeStart={rangeStart}
                      isToday={filledArr[i] === undefined}
                    />
                  </Box>
                ) : (
                  <TaskCircle
                    task={myTaskData}
                    icon={SmallCloseIcon}
                    status={status}
                    isInteractive={false}
                    rangeStart={rangeStart}
                    isToday={filledArr[i] === undefined}
                  />
                )}
              </GridItem>
            );
          } else {
            const tmpDate = new Date(filledArr[i].actionDate);
            const isBeforeToday = beforeToday(tmpDate, TODAY);
            const isDaysEqual = daysEqual(TODAY, tmpDate);
            if (isBeforeToday && filledArr[i].status == "tbd") {
              const updated = updateSingleTaskCompletionStatus({
                variables: {
                  status: "overdue",
                  updateSingleTaskCompletionStatusId: filledArr[i].id,
                },
              });
              if (updated) {
                refetchSingleTasks();
              }
            }
            if (
              (isDaysEqual && filledArr[i].status == "overdue") ||
              (!isDaysEqual && !isBeforeToday && filledArr[i].status != "tbd")
            ) {
              const updated = updateSingleTaskCompletionStatus({
                variables: {
                  status: "tbd",
                  updateSingleTaskCompletionStatusId: filledArr[i].id,
                },
              });
              if (updated) {
                refetchSingleTasks();
              }
            }

            return (
              <GridItem key={i}>
                <TaskCircle
                  task={myTaskData}
                  setCompletedCount={setCompletedCount}
                  completedCount={completedCount}
                  isToday={isDaysEqual}
                  icon={
                    isDaysEqual
                      ? AddIcon
                      : isBeforeToday
                      ? ViewIcon // SmallAddIcon
                      : ViewOffIcon // LockIcon
                  }
                  status={filledArr[i]?.status}
                  singleTask={filledArr[i]}
                  isInteractive={true}
                  rangeStart={rangeStart}
                  refetchPodSingleTasksData={refetchPodSingleTasksData}
                />
              </GridItem>
            );
          }
        })}
      </Grid>
    </Box>
  );
};
