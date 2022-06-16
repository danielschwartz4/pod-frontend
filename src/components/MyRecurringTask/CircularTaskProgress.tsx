import {
  CircularProgressLabel,
  CircularProgress,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getColorForPercentage } from "../../utils/compPercentage";

interface CircularTaskProgressProps {
  title?: string;
  value: number;
}

export const CircularTaskProgress: React.FC<CircularTaskProgressProps> = ({
  title,
  value,
}) => {
  return (
    <Box textColor={"gainsboro"}>
      <Text fontSize={20}>{title}</Text>
      <CircularProgress
        size={"200px"}
        value={value}
        color={getColorForPercentage(value / 100)}
      >
        <CircularProgressLabel textColor={getColorForPercentage(value / 100)}>
          <Text transform={"translate(3px, -18px)"}>{value}%</Text>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
};
