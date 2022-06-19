import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { SKELETON_UNIT_SIZE, TODAY } from "../../constants";
import { RecurringTask, SingleTasksQuery } from "../../generated/graphql";
import { beforeToday } from "../../utils/getConsistency";
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
  let filledArr = [];
  while (taskIter <= filteredData?.length - 1) {
    if (i % SKELETON_UNIT_SIZE == filteredData[taskIter].actionDay) {
      filledArr.push(filteredData[taskIter]);
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
      <Grid templateColumns={"repeat(7, 1fr)"} gap={3}>
        {Object.keys(filledArr).map((i) => {
          if (filledArr[i] == null) {
            return (
              <GridItem key={i} opacity={"70%"}>
                <MiniTaskCircle color="grey" />
              </GridItem>
            );
          } else {
            return (
              <GridItem key={i}>
                <MiniTaskCircle
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
