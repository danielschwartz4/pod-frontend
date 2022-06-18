import { IconProps, ViewIcon } from "@chakra-ui/icons";
import { Box, ComponentWithAs, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { TODAY } from "../../constants";
import { SingleTask } from "../../generated/graphql";
import { beforeToday, daysEqual } from "../../utils/getConsistency";
import TaskProgressPopover from "./TaskProgressPopover";

interface TaskCircleProps {
  singleTask?: SingleTask;
  isInteractive: boolean;
  color: string;
  icon;
  completedCount?: {};
  setCompletedCount?: React.Dispatch<React.SetStateAction<{}>>;
  rangeStart: Date;
}

const TaskCircle: React.FC<TaskCircleProps> = ({
  singleTask,
  isInteractive,
  color,
  icon,
  completedCount,
  setCompletedCount,
  rangeStart,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const setPopupHandler = () => {
    setIsOpen(!isOpen);
  };

  const [_color, setColor] = useState(color);
  const isEqual = daysEqual(new Date(singleTask?.actionDate), TODAY);
  const isBefore = beforeToday(new Date(singleTask?.actionDate), TODAY);

  return (
    <TaskProgressPopover
      singleTask={singleTask}
      setPopupHandler={setPopupHandler}
      close={close}
      isOpen={isOpen}
      setColor={setColor}
      setCompletedCount={setCompletedCount}
      completedCount={completedCount}
      rangeStart={rangeStart}
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
          // new Date(singleTask?.actionDate) < today
          (isBefore || isEqual) && isInteractive
            ? "pointer"
            : isInteractive
            ? "not-allowed"
            : null
        }
      >
        <CircleIcon color={_color} boxSize={14}>
          <ViewIcon />
        </CircleIcon>
        <Icon
          transform={"translate(-8px, -36px)"}
          position={"absolute"}
          color={"gray.700"}
          as={icon}
        />
        {/* <svg
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
        </svg> */}
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
