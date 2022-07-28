import { ViewIcon } from "@chakra-ui/icons";
import { Box, Icon } from "@chakra-ui/react";
import React from "react";
import { SingleTask } from "../../generated/graphql";

interface MiniTaskCircleProps {
  singleTask?: SingleTask;
  color: string;
  isToday: boolean;
}

export const MiniTaskCircle: React.FC<MiniTaskCircleProps> = ({
  singleTask,
  color,
  isToday,
}) => {
  return (
    <Box>
      <CircleIcon
        strokeWidth={isToday ? "4px" : null}
        stroke="black"
        color={color}
        boxSize={6}
      >
        <ViewIcon />
      </CircleIcon>
    </Box>
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
