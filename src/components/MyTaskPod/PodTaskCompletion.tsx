import { Box, Progress } from "@chakra-ui/react";
import React from "react";
import { getColorForPercentage } from "../../utils/compPercentage";

interface PodTaskCompletionProps {
  progress: number;
}

export const PodTaskCompletion: React.FC<PodTaskCompletionProps> = ({
  progress,
}) => {
  // console.log(progress);
  const fakeVal = progress;
  const value = 100 - progress * 100;
  return (
    <Box>
      <Progress
        h={"20px"}
        borderRadius={"16"}
        colorScheme={"gray"}
        bgColor={getColorForPercentage(fakeVal)}
        value={value}
        transform={"scaleX(-1)"}
      />
    </Box>
  );
};
