import { Box } from "@chakra-ui/react";
import React from "react";
import { RecurringTaskQuery } from "../../generated/graphql";
import { ProjectHeading, NextDueDate, ProjectVis } from "./InnerProjectEntry";
import { ProfileGridItem } from "./ProfileGridItem";

interface RecurringTaskEntryProps {
  task: RecurringTaskQuery["recurringTask"]["task"];
}
const RecurringTaskEntry: React.FC<RecurringTaskEntryProps> = ({ task }) => {
  return (
    <ProfileGridItem type="recurringTask">
      <Box textAlign={"center"} margin={"auto"}>
        <ProjectHeading project={task} />
      </Box>
      <Box>
        <NextDueDate project={task} />
      </Box>
    </ProfileGridItem>
  );
};

export default RecurringTaskEntry;
