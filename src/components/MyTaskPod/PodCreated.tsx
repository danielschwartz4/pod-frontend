import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { MeQuery, PodTasksQuery, RecurringTask } from "../../generated/graphql";
import PodDummyCard from "../MyProjectPod/PodDummyCard";
import NotifCenter from "./NotifCenter";
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
        <NotifCenter recentPodSingleTasksData={recentPodSingleTasksData} />
      </Box>
    </Flex>
  );

  if (podLength) {
    return <Box>{gridProjects}</Box>;
  }

  return <Box>something went wrong</Box>;
};
