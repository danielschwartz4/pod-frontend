import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { MeQuery, PodTasksQuery, RecurringTask } from "../../generated/graphql";
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
  const test = Array(leftOver).fill(0);

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
        {tasksData?.podTasks?.map((t, i) => {
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
        })}
        {/* {test.map((t, i) => {
          return (i == 2 && podLength == 3) || podLength == 1 ? (
            <GridItem
              colStart={{ md: null, lg: 2 }}
              colEnd={{ md: null, lg: 4 }}
              colSpan={{ base: 2, sm: 2, md: null }}
              key={i}
            >
              <Box
                border={"4px"}
                borderColor="#3EE76D"
                maxH={"420px"}
                width={"100%"}
                maxW={"380px"}
                mx={[2, 4]}
                bg={"gainsboro"}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
                h={"420px"}
              ></Box>
            </GridItem>
          ) : (
            <GridItem colSpan={2} key={i}>
              <Box
                border={"4px"}
                borderColor="#3EE76D"
                maxH={"420px"}
                width={"100%"}
                maxW={"380px"}
                mx={[2, 4]}
                bg={"gainsboro"}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
                h={"420px"}
              ></Box>
            </GridItem>
          );
        })} */}
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
