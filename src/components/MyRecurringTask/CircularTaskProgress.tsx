import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { CompletedCount } from "../../types/types";
import { getColorForPercentage } from "../../utils/compPercentage";

interface CircularTaskProgressProps {
  title?: string;
  completedCount: CompletedCount;
  variant: string;
  taskLength: number;
}

export const CircularTaskProgress: React.FC<CircularTaskProgressProps> = ({
  title,
  completedCount,
  taskLength,
  variant,
}) => {
  const percentage =
    completedCount[variant] == 0
      ? 0
      : Math.round((completedCount[variant] / taskLength) * 100) / 100;
  const value = percentage * 100;

  return (
    <Box textColor={"gainsboro"}>
      {/* <Text fontSize={{ base: 8, sm: 12 }}>{title}</Text> */}
      <Tooltip
        placement="top"
        hasArrow
        label={title}
        bg="gray.300"
        color="black"
      >
        <Box>
          <CircularProgress
            size={"50px"}
            value={value}
            color={getColorForPercentage(percentage)}
          >
            {/* <CircularProgressLabel textColor={getColorForPercentage(percentage)}>
          <Text transform={"translate(3px, -18px)"}>{Math.round(value)}%</Text>
        </CircularProgressLabel> */}
          </CircularProgress>
        </Box>
      </Tooltip>
    </Box>
  );
};
