import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TODAY } from "../../constants";
import {
  MeQuery,
  PodTasksQuery,
  RecentPodSingleTasksQuery,
  RecurringTask,
  useSingleTasksQuery,
} from "../../generated/graphql";
import { daysEqual } from "../../utils/getConsistency";
import PodDummyCard from "../MyProjectPod/PodDummyCard";
import Tour from "../Tour";
import PodCard from "./PodCard";
import { PodTaskCompletion } from "./PodTaskCompletion";

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
  const [madeCount, setMadeCount] = useState(0);

  let todayStatus = null;
  tasksData?.podTasks?.forEach((task) => {
    const { data: singleTasksData, loading: singleTasksDataLoading } =
      useSingleTasksQuery({
        variables: {
          taskId: task?.id,
        },
      });

    singleTasksData?.singleTasks?.singleTasks?.forEach((task) => {
      if (daysEqual(TODAY, new Date(task?.actionDate))) {
        todayStatus = task?.status;
      }
    });
  });

  useEffect(() => {
    if (todayStatus == "completed" || todayStatus == null) {
      setMadeCount(madeCount + 1);
    }
  }, [todayStatus]);

  const gridProjects = (
    <Flex justifyContent={"center"}>
      <Tour />
      <Box width={"100%"}>
        <Box
          mx={"auto"}
          maxW={"1200px"}
          width={"80%"}
          mb={16}
          className={"pod-task-completion"}
        >
          <PodTaskCompletion progress={madeCount / podLength} />
        </Box>
        <Flex w={"100%"}>
          <Box
            mx={"auto"}
            display={{ base: "block", sm: "block", md: "flex" }}
            className={"pod"}
          >
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
                  <GridItem key={i} colSpan={{ sm: 2, md: 2, lg: 2, xl: 1 }}>
                    {tasksData?.podTasks[i] ? (
                      <PodCard
                        meData={meData}
                        task={tasksData?.podTasks[i] as RecurringTask}
                        madeCount={madeCount}
                        setMadeCount={setMadeCount}
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
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: "50px 0",
          }}
          className="discord"
        >
          <WidgetBot
            width={800}
            height={600}
            server="1002046685805023344"
            channel={discordPodChannels[tasksData.podTasks.at(0).podId]}
          />
        </div> */}
      </Box>
    </Flex>
  );

  if (podLength) {
    return <Box>{gridProjects}</Box>;
  }

  return <Box>something went wrong</Box>;
};
