import { Box, Button, Divider, GridItem, VStack } from "@chakra-ui/react";
import React from "react";

interface GridItemProps {
  type: "project" | "recurringTask";
  isSeed?: boolean;
}

export const ProfileGridItem: React.FC<GridItemProps> = ({
  children,
  type,
  isSeed,
}) => {
  return (
    <GridItem
      borderRadius={8}
      bg={"#F8F2E6"}
      minW={"300px"}
      maxW={"300px"}
      h={"300px"}
    >
      <VStack
        divider={
          <Box maxHeight={20}>
            <Divider
              color={"black"}
              mx={"auto"}
              w={"90%"}
              orientation="horizontal"
            />
          </Box>
        }
        align="stretch"
      >
        {children}
      </VStack>
    </GridItem>
  );
};
