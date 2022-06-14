import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { SingleTask, SingleTaskQuery } from "../../generated/graphql";
import { dayIdxMapper } from "../../utils/dayIdxMapper";
import TaskProgressPopover from "./TaskProgressPopover";

interface TaskCircleProps {
  singleTask?: SingleTask;
  isInteractive: boolean;
  color: string;
  icon: string;
}

const TaskCircle: React.FC<TaskCircleProps> = ({
  singleTask,
  isInteractive,
  color,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const setPopupHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TaskProgressPopover
      singleTask={singleTask}
      setPopupHandler={setPopupHandler}
      close={close}
      isOpen={isOpen}
    >
      <Box
        onClick={() => {
          // !! Something like only clickable if today or before today
          if (isInteractive) {
            setPopupHandler();
          }
        }}
        cursor={isInteractive ? "pointer" : null}
      >
        <svg
          width={"48px"}
          height={"48px"}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill={color} />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fontFamily="auto"
            fontSize={12}
            strokeWidth="1px"
            fill="gainsboro"
            dy=".3em"
          >
            {icon}
          </text>
        </svg>
      </Box>
    </TaskProgressPopover>
  );
};

export default TaskCircle;
