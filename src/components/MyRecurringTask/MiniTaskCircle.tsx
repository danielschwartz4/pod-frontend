import { ViewIcon } from "@chakra-ui/icons";
import { Box, Icon } from "@chakra-ui/react";
import React from "react";
import { SingleTask } from "../../generated/graphql";

interface MiniTaskCircleProps {
  singleTask?: SingleTask;
  color: string;
}

export const MiniTaskCircle: React.FC<MiniTaskCircleProps> = ({
  singleTask,
  color,
}) => {
  return (
    <Box>
      <CircleIcon color={color} boxSize={7}>
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
