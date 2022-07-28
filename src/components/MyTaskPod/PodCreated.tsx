import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { MeQuery, PodTasksQuery, RecurringTask } from "../../generated/graphql";
import PodDummyCard from "../MyProjectPod/PodDummyCard";
import PodCard from "./PodCard";

interface PodCreatedProps {
  tasksData: PodTasksQuery;
  meData: MeQuery;
  podCap: number;
  recentPodSingleTasksData;
}
// !! If length of users is 1 then say waiting for more users
export const PodCreated: React.FC<PodCreatedProps> = ({
  meData,
  tasksData,
  podCap,
  children,
  recentPodSingleTasksData,
}) => {
  const podLength = tasksData?.podTasks?.length;
  const leftOver = podCap - podLength;
  const fourPersonArr = [0, 0, 0, 0];

  const gridProjects = (
    <Flex justifyContent={"center"}>
      <Box
        w={"95%"}
        // mx={"auto"}
        display={{ base: "block", sm: "block", md: "flex" }}
        justifyContent={"space-around"}
      >
        {children}
        <Grid
          templateColumns={{
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={8}
          textAlign={"center"}
        >
          {fourPersonArr.map((t, i) => {
            return (
              <GridItem key={i} colSpan={{ sm: 2, md: 2, lg: 1 }}>
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
      </Box>
    </Flex>
  );

  if (podLength) {
    return <Box>{gridProjects}</Box>;
  }

  return <Box>something went wrong</Box>;
};
