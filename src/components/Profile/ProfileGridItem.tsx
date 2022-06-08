import { VStack, Box, Divider, GridItem } from "@chakra-ui/react";
import React from "react";

interface GridItemProps {
  type: "project" | "recurringTask";
}

export const ProfileGridItem: React.FC<GridItemProps> = ({
  children,
  type,
}) => {
  return (
    <GridItem
      borderRadius={8}
      h={"auto"}
      bg={type == "project" ? "gray.500" : "gray.400"}
    >
      <VStack
        divider={
          <Box>
            <Divider
              color={"gray.700"}
              mx={"auto"}
              w={"90%"}
              orientation="horizontal"
            />
          </Box>
        }
        align="stretch"
        h={"250px"}
      >
        {children}
      </VStack>
    </GridItem>
  );
};
