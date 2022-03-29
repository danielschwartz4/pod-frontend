import { Grid, GridItem, HStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  Project,
  usePodProjectsQuery,
  usePodQuery,
  useProjectQuery,
} from "../../generated/graphql";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import PodCard from "./PodCard";

interface PodCreatedProps {
  projectsData: Project[];
  podLength: number;
}
// !! If length of users is 1 then say waiting for more users
export const PodCreated: React.FC<PodCreatedProps> = (props, { children }) => {
  const gridProjects = (
    <div>
      <Grid
        templateColumns="repeat(2, 1fr)"
        // justifyContent={"center"}
      >
        {props.projectsData?.map((p, i) => (
          <GridItem colSpan={1} key={i}>
            <PodCard
              updatedAt={p.updatedAt}
              createdAt={p.createdAt}
              overview={p.overview}
              projectName={p.projectName}
              key={p.id}
              milestones={p.milestones}
              milestoneProgress={p.milestoneProgress}
              milestoneDates={p.milestoneDates}
            />
          </GridItem>
        ))}
      </Grid>
    </div>
  );

  if (props.podLength == 1) {
    return (
      <div>
        {gridProjects}
        {children}
      </div>
    );
  }
  if (props.podLength == 2) {
    return (
      <div>
        {gridProjects}
        {children}
      </div>
    );
  }
  if (props.podLength == 3) {
    return (
      <div>
        {gridProjects}
        {children}
      </div>
    );
  }
  if (props.podLength == 4) {
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
