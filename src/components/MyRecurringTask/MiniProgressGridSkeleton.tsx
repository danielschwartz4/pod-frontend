import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { SKELETON_UNIT_SIZE, TODAY } from "../../constants";
import { RecurringTask, SingleTasksQuery } from "../../generated/graphql";
import { beforeToday, daysEqual } from "../../utils/getConsistency";
import { addDays, extractDaysIdxs } from "../../utils/singleTaskUtils";
import { MiniTaskCircle } from "./MiniTaskCircle";

interface MiniProgressGridSkeletonProps {
  task: RecurringTask;
  singleTasksData: SingleTasksQuery;
}

export const MiniProgressGridSkeleton: React.FC<
  MiniProgressGridSkeletonProps
> = ({ task, singleTasksData }) => {
  const filterdBelow = singleTasksData?.singleTasks?.singleTasks?.filter(
    (task) => beforeToday(new Date(task?.actionDate), TODAY)
  );

  const filteredData = singleTasksData?.singleTasks?.singleTasks?.filter(
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
  let tmpActionDay: Date;
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
      // !! Push the date instead of null

      if (daysEqual(addDays(daysAfterTmp, tmpActionDay), TODAY)) {
        filledArr.push(undefined);
      } else {
        filledArr.push(null);
      }
      i++;
    }
  }

  return (
    <Box>
      <Grid templateColumns={"repeat(7, 1fr)"} gap={3}>
        {Object.keys(filledArr).map((i) => {
          if (filledArr[i] == null) {
            return (
              <GridItem key={i} opacity={"70%"}>
                <MiniTaskCircle
                  isToday={filledArr[i] === undefined}
                  color="grey"
                />
              </GridItem>
            );
          } else {
            const tmpDate = new Date(filledArr[i].actionDate);
            const isDaysEqual = daysEqual(TODAY, tmpDate);
            return (
              <GridItem key={i}>
                <MiniTaskCircle
                  isToday={isDaysEqual}
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
                />
              </GridItem>
            );
          }
        })}
      </Grid>
    </Box>
  );
};
