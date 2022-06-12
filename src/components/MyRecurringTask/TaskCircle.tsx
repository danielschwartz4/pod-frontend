import { Box } from "@chakra-ui/react";
import React from "react";
import { SingleTask, SingleTaskQuery } from "../../generated/graphql";
import { dayIdxMapper } from "../../utils/dayIdxMapper";

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
  return (
    <svg
      width={"48px"}
      height={"48px"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill={color} strokeWidth={"3"} />
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
  );
};

export default TaskCircle;
