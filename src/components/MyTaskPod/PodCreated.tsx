import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { TODAY } from "../../constants";
import {
  MeQuery,
  PodTasksQuery,
  RecentPodSingleTasksQuery,
  RecurringTask,
  SingleTasksQuery,
} from "../../generated/graphql";
import { daysEqual } from "../../utils/getConsistency";
import PodDummyCard from "../MyProjectPod/PodDummyCard";
import PodCard from "./PodCard";
import { PodTaskCompletion } from "./PodTaskCompletion";
import WidgetBot from "@widgetbot/react-embed";
import { discordPodChannels } from "./DiscordPodChannel";

interface PodCreatedProps {
  tasksData: PodTasksQuery;
  meData: MeQuery;
  podCap: number;
  recentPodSingleTasksData: RecentPodSingleTasksQuery;
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
  const fourPersonArr = [0, 0, 0, 0];
  let podCompletion = 0;

  let coveredTasks = new Set();
  recentPodSingleTasksData?.recentPodSingleTasks?.singleTasks.forEach((st) => {
    console.log(TODAY);
    console.log(new Date(st?.actionDate));
    if (daysEqual(TODAY, new Date(st?.actionDate))) {
      console.log("here");
      podCompletion += +(st?.status == "completed");
      coveredTasks.add(st?.taskId);
    }
  });

  const notToday = podLength - coveredTasks.size;
  podCompletion += notToday;

  const gridProjects = (
    <Box>
      <Box mx={"auto"} maxW={"1200px"} width={"80%"} mb={16}>
        <PodTaskCompletion progress={podCompletion / podLength} />
      </Box>
      <Flex w={"100%"}>
        <Box mx={"auto"} display={{ base: "block", sm: "block", md: "flex" }}>
          {children}
          <Grid
            templateColumns={{
              sm: "repeat(4, 1fr)",
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          margin: "50px 0",
        }}
      >
        <WidgetBot
          width={800}
          height={600}
          server="1002046685805023344"
          channel={discordPodChannels[tasksData.podTasks.at(0).podId]}
        />
      </div>
    </Box>
  );

  if (podLength) {
    return <Box>{gridProjects}</Box>;
  }

  return <Box>something went wrong</Box>;
};
