import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { TODAY } from "../../constants";
import {
  RecurringTaskQuery,
  SingleTask,
  SingleTasksQuery,
  useSingleTasksQuery,
} from "../../generated/graphql";
import formatDate from "../../utils/formatDate";
import { generateProgress } from "../../utils/taskSmsBody";
import { MiniProgressGridSkeleton } from "../MyRecurringTask/MiniProgressGridSkeleton";
import { ToTaskPageId } from "./ToPageId";

interface Props {
  task?: RecurringTaskQuery["recurringTask"]["task"];
  singleTasksData?: SingleTasksQuery;
}

export const TaskEntryHeading: React.FC<Props> = ({ task }) => {
  const { data: singleTasksData, loading: singleTasksDataLoading } =
    useSingleTasksQuery({
      variables: {
        taskId: task?.id,
      },
    });

  return (
    <Heading mb={2} fontSize={28} mx={"auto"} display={"flex"}>
      <ToTaskPageId task={task}>
        {task?.podId == 0 ? "not in pod yet" : "Pod #" + task?.podId}
      </ToTaskPageId>
    </Heading>
  );
};

export const TaskVis: React.FC<Props> = ({ singleTasksData, task }) => {
  let vis = generateProgress(singleTasksData as SingleTask[]);
  vis = vis.slice(0, 54);
  return (
    <MiniProgressGridSkeleton singleTasksData={singleTasksData} task={task} />
    // <Box my={-4}>
    //   <Text>{vis}</Text>
    // </Box>
  );
};

export const NextTaskDueDate: React.FC<Props> = ({ singleTasksData }) => {
  let nextDueDate;

  if (singleTasksData) {
    let nextDueDate = singleTasksData["singleTasks"]["singleTasks"].find(
      (task) => {
        let d = new Date(task?.actionDate);
        return d > TODAY;
      }
    );
  }

  return (
    <Box
      fontFamily={"ubuntu"}
      justifyContent={"center"}
      textAlign={"center"}
      fontSize={18}
    >
      Next target date: {formatDate(nextDueDate?.actionDate)}
    </Box>
  );
};
