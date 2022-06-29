import { Divider, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { ProjectsQuery, RecurringTasksQuery } from "../../generated/graphql";
import mergeData from "../../utils/mergeData";
import ProjectEntry from "./ProjectEntry";
import RecurringTaskEntry from "./RecurringTaskEntry";

interface projectsGridProps {
  projectsData: ProjectsQuery;
  tasksData: RecurringTasksQuery;
  hasSeed?: boolean;
}

const ProjectsGrid: React.FC<projectsGridProps> = ({
  projectsData,
  tasksData,
  hasSeed,
}) => {
  const merged = mergeData(tasksData, projectsData, "createdAt");
  const projectsDataDict = projectsData?.projects?.reduce(
    (acc, project) => ({ ...acc, [project.id]: project }),
    {}
  );
  const tasksDataDict = tasksData?.recurringTasks?.reduce(
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
        sm: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={6}
      outline={4}
      borderRadius={20}
      border={"4px"}
      borderColor={"#F6793D"}
      p={4}
    >
      {hasSeed ? <SeedGridItem /> : null}
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

const SeedGridItem = () => {
  return (
    <GridItem
      borderRadius={8}
      bg={"gray.400"}
      minW={"300px"}
      maxW={"300px"}
      h={"300px"}
      p={4}
    >
      <Heading textAlign={"center"} fontFamily={"body"} textColor={"gray.700"}>
        Welcome!
      </Heading>
      <Divider />
      <NextLink href={"project-info"}>
        <Text cursor={"pointer"} textAlign={"center"} fontSize={18}>
          Start a project or recurring task by pressing the button above
        </Text>
      </NextLink>
      <Divider />
      <NextLink href={"settings"}>
        <Text cursor={"pointer"} mt={4} fontSize={18} textAlign={"center"}>
          Adjust your messaging settings by clicking your username in the nav
          bar
        </Text>
      </NextLink>
      <Text>🟥➜🟦➜🟩➜🔴➜🔵➜🟢➜🟥➜🟦➜🟩➜🎇</Text>
    </GridItem>
  );
};

export default ProjectsGrid;
