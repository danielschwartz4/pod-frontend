import { Grid, Box, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { SingleTasksQuery } from "../../generated/graphql";
import { dayIdxMapper } from "../../utils/dayIdxMapper";
import TaskCircle from "./TaskCircle";

interface ProgressGridSkeletonProps {
  orderedTasks: SingleTasksQuery;
}

export const ProgressGridSkeleton: React.FC<ProgressGridSkeletonProps> = ({
  orderedTasks,
}) => {
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
  console.log(filledArr);
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
              <TaskCircle icon="•" color="grey" isInteractive={false} />
            </GridItem>
          );
        }
        return (
          <GridItem key={i}>
            <TaskCircle
              icon="+"
              color={filledArr[i].status == "completed" ? "#3EE76D" : "#7e9cd6"}
              singleTask={filledArr[i]}
              isInteractive={true}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};
