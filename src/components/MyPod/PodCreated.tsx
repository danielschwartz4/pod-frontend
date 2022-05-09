import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { Project } from "../../generated/graphql";
import PodCard from "./PodCard";

interface PodCreatedProps {
  projectsData: Project[];
}
// !! If length of users is 1 then say waiting for more users
export const PodCreated: React.FC<PodCreatedProps> = (props, { children }) => {
  const podLength = props.projectsData?.length;
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
        {props.projectsData?.map((p, i) =>
          (i == 2 && podLength == 3) || podLength == 1 ? (
            <GridItem
              colStart={{ md: null, lg: 2 }}
              colEnd={{ md: null, lg: 4 }}
              colSpan={{ md: 2, lg: null }}
              key={i}
            >
              <PodCard project={p} />
            </GridItem>
          ) : (
            <GridItem colSpan={2} key={i}>
              <PodCard project={p} />
            </GridItem>
          )
        )}
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
