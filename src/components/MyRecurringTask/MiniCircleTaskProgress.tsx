import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { getColorForPercentage } from "../../utils/compPercentage";

interface MiniCircleTaskProgressProps {
  title?: string;
  completedCount: {};
  variant: string;
  taskLength: number;
}

export const MiniCircleTaskProgress: React.FC<MiniCircleTaskProgressProps> = ({
  title,
  completedCount,
  taskLength,
  variant,
}) => {
  console.log(taskLength, completedCount);
  const percentage =
    completedCount[variant] == 0
      ? 0
      : Math.round((completedCount[variant] / taskLength) * 100) / 100;

  const value = percentage * 100;

  return (
    <Box textColor={"gainsboro"}>
      <Text fontSize={10}>{title}</Text>
      <CircularProgress
        size={"55px"}
        value={value}
        color={getColorForPercentage(percentage)}
      />
    </Box>
  );
};
