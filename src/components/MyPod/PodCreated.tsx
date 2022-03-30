import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { Project } from "../../generated/graphql";
import PodCard from "./PodCard";

interface PodCreatedProps {
  projectsData: Project[];
  isMainProject: boolean;
  podLength: number;
}
// !! If length of users is 1 then say waiting for more users
export const PodCreated: React.FC<PodCreatedProps> = (props, { children }) => {
  const gridProjects = (
    <div>
      <Grid
        templateColumns="repeat(4, 1fr)"
        // colGap={4}
        // rowGap={4}
        gap={4}
        textAlign={"center"}
      >
        {props.projectsData?.map((p, i) =>
          (i == 2 && props.podLength == 3) || props.podLength == 1 ? (
            <GridItem colStart={2} colEnd={4} key={i}>
              <PodCard isMainProject={props.isMainProject} project={p} />
            </GridItem>
          ) : (
            <GridItem colSpan={2} key={i}>
              <PodCard isMainProject={props.isMainProject} project={p} />
            </GridItem>
          )
        )}
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
