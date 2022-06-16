import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { SingleTask } from "../../generated/graphql";
import TaskProgressPopover from "./TaskProgressPopover";

interface TaskCircleProps {
  singleTask?: SingleTask;
  isInteractive: boolean;
  color: string;
  icon: string;
  completedCount?: number;
  setCompletedCount?: React.Dispatch<React.SetStateAction<number>>;
  today: Date;
}

const TaskCircle: React.FC<TaskCircleProps> = ({
  singleTask,
  isInteractive,
  color,
  icon,
  completedCount,
  setCompletedCount,
  today,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const setPopupHandler = () => {
    setIsOpen(!isOpen);
  };

  const [_color, setColor] = useState(color);

  return (
    <TaskProgressPopover
      singleTask={singleTask}
      setPopupHandler={setPopupHandler}
      close={close}
      isOpen={isOpen}
      setColor={setColor}
      setCompletedCount={setCompletedCount}
      completedCount={completedCount}
    >
      <Box
        onClick={() => {
          const actionDate = new Date(singleTask?.actionDate);
          // !! Something like only clickable if today or before today
          if (isInteractive && actionDate < today) {
            setPopupHandler();
          }
        }}
        cursor={
          new Date(singleTask?.actionDate) < today && isInteractive
            ? "pointer"
            : isInteractive
            ? "not-allowed"
            : null
        }
      >
        <svg
          width={"48px"}
          height={"48px"}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill={_color} />
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
