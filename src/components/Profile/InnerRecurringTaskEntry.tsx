import { Box } from "@chakra-ui/react";
import React from "react";
import { RecurringTaskQuery } from "../../generated/graphql";

interface Props {
  task: RecurringTaskQuery["recurringTask"]["task"];
}

export const TaskEntryHeading: React.FC<Props> = ({ task }) => {
  return (
    // <Heading fontSize={"xl"}>
    //   <ToPageId project={task}>
    <Box>{task?.podId == 0 ? "not in pod yet" : "pod #: " + task?.podId}</Box>
    //   </ToPageId>
    // </Heading>
  );
};
