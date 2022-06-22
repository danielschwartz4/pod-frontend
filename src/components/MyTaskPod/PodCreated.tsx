import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { PodTasksQuery, RecurringTask } from "../../generated/graphql";
import PodCard from "./PodCard";

interface PodCreatedProps {
  // tasksData: RecurringTask[];
  tasksData: PodTasksQuery;
}
// !! If length of users is 1 then say waiting for more users
export const PodCreated: React.FC<PodCreatedProps> = (props, { children }) => {
  const podLength = props.tasksData?.podTasks?.length;

  const gridProjects = (
    <Box w={"100%"}>
      <Grid
        templateColumns={{
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
        textAlign={"center"}
      >
        {props.tasksData?.podTasks?.map((t, i) => {
          return (i == 2 && podLength == 3) || podLength == 1 ? (
            <GridItem
              colStart={{ md: null, lg: 2 }}
              colEnd={{ md: null, lg: 4 }}
              colSpan={{ base: 2, sm: 2, md: null }}
              key={i}
            >
              <PodCard task={t as RecurringTask} />
            </GridItem>
          ) : (
            <GridItem colSpan={2} key={i}>
              <PodCard task={t as RecurringTask} />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );

  if (podLength) {
    return (
      <div>
        {gridProjects}
        {children}
      </div>
    );
  }

  return (
    <div>
      something went wrong
      {children}
    </div>
  );
};
