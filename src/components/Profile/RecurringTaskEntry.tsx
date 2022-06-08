import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { RecurringTaskQuery } from "../../generated/graphql";
import { TaskEntryHeading } from "./InnerRecurringTaskEntry";
import { ProfileGridItem } from "./ProfileGridItem";
import { ToProjectPageId, ToTaskPageId } from "./ToPageId";

interface RecurringTaskEntryProps {
  task: RecurringTaskQuery["recurringTask"]["task"];
  toId: string;
}
const RecurringTaskEntry: React.FC<RecurringTaskEntryProps> = ({
  task,
  toId,
}) => {
  return (
    <ProfileGridItem type="recurringTask">
      <Heading fontSize={"xl"}>
        <ToTaskPageId toId={toId}>
          {task?.podId == 0 ? "not in pod yet" : "pod #: " + task?.podId}
        </ToTaskPageId>
      </Heading>
    </ProfileGridItem>
  );
};

export default RecurringTaskEntry;
