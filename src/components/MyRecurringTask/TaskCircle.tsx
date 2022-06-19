import { IconProps, ViewIcon } from "@chakra-ui/icons";
import { Box, ComponentWithAs, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { TODAY } from "../../constants";
import { RecurringTaskQuery, SingleTask } from "../../generated/graphql";
import { CompletedCount } from "../../types/types";
import { beforeToday, daysEqual } from "../../utils/getConsistency";
import { statusColorMap } from "../../utils/statusColorMap";
import TaskProgressPopover from "./TaskProgressPopover";

interface TaskCircleProps {
  singleTask?: SingleTask;
  isInteractive: boolean;
  status: string;
  icon;
  completedCount?: CompletedCount;
  setCompletedCount?: React.Dispatch<React.SetStateAction<CompletedCount>>;
  rangeStart: Date;
  task: RecurringTaskQuery;
}

const TaskCircle: React.FC<TaskCircleProps> = ({
  singleTask,
  isInteractive,
  status,
  icon,
  completedCount,
  setCompletedCount,
  rangeStart,
  task,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const setPopupHandler = () => {
    setIsOpen(!isOpen);
  };

  const [_status, setStatus] = useState(status);
  const isEqual = daysEqual(new Date(singleTask?.actionDate), TODAY);
  const isBefore = beforeToday(new Date(singleTask?.actionDate), TODAY);

  return (
    <TaskProgressPopover
      task={task}
      singleTask={singleTask}
      setPopupHandler={setPopupHandler}
      close={close}
      isOpen={isOpen}
      setStatus={setStatus}
      setCompletedCount={setCompletedCount}
      completedCount={completedCount}
      rangeStart={rangeStart}
      _status={_status}
    >
      <Box
        onClick={() => {
          const actionDate = new Date(singleTask?.actionDate);
          // !! Something like only clickable if today or before today
          if ((isBefore || isEqual) && isInteractive) {
            setPopupHandler();
          }
        }}
        cursor={
          (isBefore || isEqual) && isInteractive
            ? "pointer"
            : isInteractive
            ? "not-allowed"
            : null
        }
      >
        <CircleIcon
          color={_status ? statusColorMap[_status] : "gray"}
          boxSize={14}
        >
          <ViewIcon />
        </CircleIcon>
        <Icon
          transform={"translate(-8px, -36px)"}
          position={"absolute"}
          color={"gray.700"}
          as={icon}
        />
      </Box>
    </TaskProgressPopover>
  );
};

const CircleIcon = (props) => (
  <Box>
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -90, 0 a 75,75 0 1,0 175,0 a 75,75 0 1,0 -175,0"
      />
    </Icon>
  </Box>
);

export default TaskCircle;
