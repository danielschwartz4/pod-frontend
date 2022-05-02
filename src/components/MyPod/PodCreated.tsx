import { Grid, GridItem } from "@chakra-ui/react";
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
    <div>
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
    </div>
  );

  if (podLength == 1) {
    return (
      <div>
        {gridProjects}
        {children}
      </div>
    );
  }
  if (podLength == 2) {
    return (
      <div>
        {gridProjects}
        {children}
      </div>
    );
  }
  if (podLength == 3) {
    return (
      <div>
        {gridProjects}
        {children}
      </div>
    );
  }
  if (podLength == 4) {
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
