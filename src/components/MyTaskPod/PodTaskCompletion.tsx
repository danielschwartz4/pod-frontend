import { Box, Progress } from "@chakra-ui/react";
import React from "react";
import { getColorForPercentage } from "../../utils/compPercentage";

interface PodTaskCompletionProps {
  progress: number;
}

export const PodTaskCompletion: React.FC<PodTaskCompletionProps> = ({
  progress,
}) => {
  const percentage = progress / 100;
  const fakeVal = 1 - percentage;
  return (
    <Box>
      <Progress
        h={"20px"}
        borderRadius={"16"}
        colorScheme={"gray"}
        bgColor={getColorForPercentage(fakeVal)}
        value={progress}
        transform={"scaleX(-1)"}
      />
    </Box>
  );
};
