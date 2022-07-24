import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { MeQuery, PodTasksQuery, RecurringTask } from "../../generated/graphql";
import PodDummyCard from "../MyProjectPod/PodDummyCard";
import PodCard from "./PodCard";

interface PodCreatedProps {
  tasksData: PodTasksQuery;
  meData: MeQuery;
  podCap: number;
}
// !! If length of users is 1 then say waiting for more users
export const PodCreated: React.FC<PodCreatedProps> = ({
  meData,
  tasksData,
  podCap,
  children,
}) => {
  const podLength = tasksData?.podTasks?.length;
  const leftOver = podCap - podLength;
  const fourPersonArr = [0, 0, 0, 0];

  const gridProjects = (
    <Flex>
      <Grid
        mx={"auto"}
        templateColumns={{
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={8}
        textAlign={"center"}
      >
        {/* Logic for 2, 3, 4 people */}
        {/* {tasksData?.podTasks?.map((t, i) => {
          return (i == 2 && podLength == 3) || podLength == 1 ? (
            <GridItem
              colStart={{ md: null, lg: 2 }}
              colEnd={{ md: null, lg: 4 }}
              colSpan={{ base: 2, sm: 2, md: null }}
              key={i}
            >
              <PodCard meData={meData} task={t as RecurringTask} />
            </GridItem>
          ) : (
            <GridItem colSpan={2} key={i}>
              <PodCard meData={meData} task={t as RecurringTask} />
            </GridItem>
          );
        })} */}
        {fourPersonArr.map((t, i) => {
          return (
            <GridItem colSpan={2} key={i}>
              {tasksData?.podTasks[i] ? (
                <PodCard
                  meData={meData}
                  task={tasksData?.podTasks[i] as RecurringTask}
                />
              ) : (
                <PodDummyCard />
              )}
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
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
