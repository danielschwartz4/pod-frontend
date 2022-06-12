import { Box } from "@chakra-ui/react";
import React from "react";
import { SingleTaskQuery } from "../../generated/graphql";
import { dayIdxMapper } from "../../utils/dayIdxMapper";

interface TaskCircleProps {
  singleTask: SingleTaskQuery;
  isInteractive: boolean;
}

const TaskCircle: React.FC<TaskCircleProps> = ({
  singleTask,
  isInteractive,
}) => {
  return (
    // <Box width={["36px", "48px"]} height={["36px", "48px"]}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill={"#7e9cd6"} strokeWidth={"3"} />
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
        X
      </text>
    </svg>
    // </Box>
  );
};

export default TaskCircle;
