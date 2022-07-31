import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { filter } from "core-js/core/array";
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
  const d = new Date();
  // set to Monday of this week
  let lastMonday = new Date(d.setDate(d.getDate() - ((d.getDay() + 7) % 7)));

  // set to next Monday
  let nextMonday = new Date(d.setDate(d.getDate() + 7));

  const filteredData = singleTasksData?.singleTasks?.singleTasks?.filter(
    (task) =>
      !beforeToday(new Date(task?.actionDate), lastMonday) &&
      beforeToday(new Date(task?.actionDate), nextMonday)
  );

  let filledArr = [];
  let iter = 0;
  for (let d = lastMonday; d < nextMonday; d.setDate(d.getDate() + 1)) {
    if (filteredData != null) {
      if (daysEqual(new Date(filteredData[iter]?.actionDate), d)) {
        filledArr.push(filteredData[iter]);
        iter++;
      } else {
        // filledArr.push({ notActive: true, actionDate: d });
        filledArr.push(null);
      }
    }
  }

  return (
    <Box>
      <Grid templateColumns={"repeat(7, 1fr)"} gap={2}>
        {Object.keys(filledArr).map((i) => {
          if (filledArr[i] == null) {
            return (
              <GridItem key={i} opacity={"70%"}>
                <MiniTaskCircle
                  isToday={filledArr[i] == undefined}
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
