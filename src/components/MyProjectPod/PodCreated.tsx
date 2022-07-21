import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { MeQuery, PodQuery, Project } from "../../generated/graphql";
import PodCard from "./PodCard";
import PodDummyCard from "./PodDummyCard";

interface PodCreatedProps {
  projectsData: Project[];
  podData: PodQuery;
  meData: MeQuery;
  podCap: number;
}
// !! If length of users is 1 then say waiting for more users
export const PodCreated: React.FC<PodCreatedProps> = ({
  children,
  projectsData,
  podData,
  meData,
  podCap,
}) => {
  const podLength = projectsData?.length;
  const podLengthText =
    podLength === podData?.pod?.pod?.cap ? "waiting for more users" : "";
  const leftOver = podCap - podLength;
  const fourPersonArr = [0, 0, 0, 0];

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
        {/* Logic for 2, 3, 4 people */}
        {/* {projectsData?.map((p, i) =>
          (i == 2 && podLength == 3) || podLength == 1 ? (
            <GridItem
              colStart={{ md: null, lg: 2 }}
              colEnd={{ md: null, lg: 4 }}
              colSpan={{ base: 2, sm: 2, md: null }}
              key={i}
            >
              <PodCard meData={meData} project={p} />
            </GridItem>
          ) : (
            <GridItem colSpan={2} key={i}>
              <PodCard meData={meData} project={p} />
            </GridItem>
          )
        )} */}
        {fourPersonArr.map((t, i) => {
          console.log(i);
          return (
            <GridItem colSpan={2} key={i}>
              {projectsData[i] ? (
                <PodCard meData={meData} project={projectsData[i] as Project} />
              ) : (
                <PodDummyCard></PodDummyCard>
              )}
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
