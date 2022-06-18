import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { getColorForPercentage } from "../../utils/compPercentage";

interface CircularTaskProgressProps {
  title?: string;
  completedCount: {};
  variant: number;
  taskLength: number;
  today: Date;
}

export const CircularTaskProgress: React.FC<CircularTaskProgressProps> = ({
  title,
  completedCount,
  taskLength,
  today,
  variant,
}) => {
  console.log(completedCount);
  const percentage =
    completedCount[variant] == 0
      ? 1
      : Math.round((completedCount[variant] / taskLength) * 100) / 100;

  const value = percentage * 100;

  return (
    <Box textColor={"gainsboro"}>
      <Text fontSize={20}>{title}</Text>
      <CircularProgress
        size={"180px"}
        value={value}
        color={getColorForPercentage(percentage)}
      >
        <CircularProgressLabel textColor={getColorForPercentage(percentage)}>
          <Text transform={"translate(3px, -18px)"}>{Math.round(value)}%</Text>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
};
