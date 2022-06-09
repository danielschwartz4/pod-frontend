import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { RecurringTaskQuery } from "../../generated/graphql";
import { TaskEntryHeading } from "./InnerRecurringTaskEntry";
import { ProfileGridItem } from "./ProfileGridItem";
import { ToProjectPageId, ToTaskPageId } from "./ToPageId";

interface RecurringTaskEntryProps {
  task: RecurringTaskQuery["recurringTask"]["task"];
}
const RecurringTaskEntry: React.FC<RecurringTaskEntryProps> = ({ task }) => {
  return (
    <ProfileGridItem type="recurringTask">
      <Heading fontSize={"xl"}>
        <ToTaskPageId task={task}>
          {task?.podId == 0 ? "not in pod yet" : "pod #: " + task?.podId}
        </ToTaskPageId>
      </Heading>
    </ProfileGridItem>
  );
};

export default RecurringTaskEntry;
