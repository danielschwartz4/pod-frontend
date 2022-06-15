import { Grid } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ProjectsQuery, RecurringTasksQuery } from "../../generated/graphql";
import mergeData from "../../utils/mergeData";
import ProjectEntry from "./ProjectEntry";
import RecurringTaskEntry from "./RecurringTaskEntry";

interface projectsGridProps {
  projectsData: ProjectsQuery;
  tasksData: RecurringTasksQuery;
}

const ProjectsGrid: React.FC<projectsGridProps> = ({
  projectsData,
  tasksData,
}) => {
  const merged = mergeData(tasksData, projectsData, "createdAt");
  const projectsDataDict = projectsData?.projects.reduce(
    (acc, project) => ({ ...acc, [project.id]: project }),
    {}
  );
  const tasksDataDict = tasksData?.recurringTasks.reduce(
    (acc, task) => ({ ...acc, [task.id]: task }),
    {}
  );

  return (
    // !! Use space in between for formatting profile projects so theat they stay the same size just have different spacing
    <Grid
      mt={8}
      w="auto"
      h="auto"
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(5, 1fr)",
      }}
      gap={6}
      outline={4}
      borderRadius={20}
      border={"4px"}
      borderColor={"#F6793D"}
      p={4}
    >
      {Object.keys(merged).map((m) => {
        if (m[0] == "p") {
          const pid = parseInt(m.slice(1));
          return <ProjectEntry key={m} project={projectsDataDict[pid]} />;
        }
        if (m[0] == "t") {
          const tid = parseInt(m.slice(1));
          return <RecurringTaskEntry key={m} task={tasksDataDict[tid]} />;
        }
      })}
    </Grid>
  );
};

export default ProjectsGrid;
