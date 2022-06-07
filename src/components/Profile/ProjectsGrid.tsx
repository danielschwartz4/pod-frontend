import { Grid } from "@chakra-ui/react";
import { ProjectsQuery, RecurringTasksQuery } from "../../generated/graphql";
import mergeData from "../../utils/mergeData";
import { Project } from "./Project";

interface projectsGridProps {
  projectsData: ProjectsQuery;
  tasksData: RecurringTasksQuery;
}

const ProjectsGrid: React.FC<projectsGridProps> = ({
  projectsData,
  tasksData,
}) => {
  const merged = mergeData(tasksData, projectsData, "createdAt");
  console.log(merged);
  // Now map the merged projects to the grid
  return (
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
      {projectsData?.projects
        ?.slice(0)
        .reverse()
        .map((p) => (
          <Project key={p.id} project={p} />
        ))}
    </Grid>
  );
};

export default ProjectsGrid;
