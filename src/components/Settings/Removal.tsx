import { LockIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { accountProps } from "./Account";

interface removalProps extends accountProps {}

const Removal: React.FC<removalProps> = ({}) => {
  // !! Cascading delete
  return (
    <Flex
      textColor={"gray.500"}
      fontSize={"lg"}
      justifyContent={"space-between"}
      direction={"column"}
      m={4}
      p={4}
      bg={"gray.800"}
      w={"500px"}
      h={"100px"}
      rounded={"lg"}
    >
      <Box mt={-4}>
        <Text fontSize={24} textColor={"gray.500"}>
          <b>ACCOUNT REMOVAL</b>
        </Text>
      </Box>
      <Flex>
        <Box mr={"auto"}>
          <Button colorScheme={"red"}>
            <Text>delete account</Text>
          </Button>
        </Box>
        <Box>
          <WarningIcon />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Removal;
