import { Grid, Box, GridItem } from "@chakra-ui/react";
import React from "react";
import { SingleTasksQuery } from "../../generated/graphql";
import TaskCircle from "./TaskCircle";

interface ProgressGridSkeletonProps {
  orderedTasks: SingleTasksQuery;
}

export const ProgressGridSkeleton: React.FC<ProgressGridSkeletonProps> = ({
  orderedTasks,
}) => {
  console.log(orderedTasks);
  const seed = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <Grid templateColumns={"repeat(7, 1fr)"} gap={6}>
      {/* {Object.keys(seed).map((m) => { */}
      <GridItem>
        <TaskCircle></TaskCircle>
      </GridItem>
      ;{/* })} */}
    </Grid>
  );
};
