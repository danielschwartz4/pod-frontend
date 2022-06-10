import { Box } from "@chakra-ui/react";
import React from "react";
import { RecurringTaskQuery } from "../../generated/graphql";

interface RecurringTaskProgressProps {
  taskData: RecurringTaskQuery;
}

export const RecurringTaskProgress: React.FC<RecurringTaskProgressProps> = ({
  taskData,
}) => {
  console.log(taskData);
  return (
    <Box>
      <Circle></Circle>
    </Box>
  );
};

const Circle: React.FC<{}> = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
        D
      </text>
    </svg>
  );
};
