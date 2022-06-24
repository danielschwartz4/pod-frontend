import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { TODAY } from "../../constants";
import {
  RecurringTaskQuery,
  SingleTask,
  SingleTasksQuery,
} from "../../generated/graphql";
import formatDate from "../../utils/formatDate";
import { generateProgress } from "../../utils/taskSmsBody";
import { ToTaskPageId } from "./ToPageId";

interface Props {
  task?: RecurringTaskQuery["recurringTask"]["task"];
  singleTasksData?: SingleTasksQuery["singleTasks"]["singleTasks"];
}

export const TaskEntryHeading: React.FC<Props> = ({ task }) => {
  return (
    <Heading fontSize={"xl"} mx={"auto"}>
      <ToTaskPageId task={task}>
        {task?.podId == 0 ? "not in pod yet" : "pod #: " + task?.podId}
      </ToTaskPageId>
    </Heading>
  );
};

export const TaskVis: React.FC<Props> = ({ singleTasksData }) => {
  let vis = generateProgress(singleTasksData as SingleTask[]);
  vis = vis.slice(0, 54);
  return (
    <Box my={-4}>
      <Text>{vis}</Text>
    </Box>
  );
};

export const NextTaskDueDate: React.FC<Props> = ({ singleTasksData }) => {
  let nextDueDate = singleTasksData?.find((task) => {
    let d = new Date(task?.actionDate);
    return d > TODAY;
  });

  return <Box>Next target date: {formatDate(nextDueDate?.actionDate)}</Box>;
};
