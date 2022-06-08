import { Box } from "@chakra-ui/react";
import React from "react";
import { RecurringTaskQuery } from "../../generated/graphql";
import { TaskEntryHeading } from "./InnerRecurringTaskEntry";
import { ProfileGridItem } from "./ProfileGridItem";

interface RecurringTaskEntryProps {
  task: RecurringTaskQuery["recurringTask"]["task"];
}
const RecurringTaskEntry: React.FC<RecurringTaskEntryProps> = ({ task }) => {
  return <ProfileGridItem type="recurringTask"></ProfileGridItem>;
};

export default RecurringTaskEntry;
