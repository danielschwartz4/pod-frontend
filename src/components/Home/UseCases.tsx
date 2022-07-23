import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

interface UseCasesProps {}

const UseCases: React.FC<UseCasesProps> = ({}) => {
  return (
    <Flex>
      <VStack>
        <Text fontSize={"3xl"} fontFamily={"ubuntu"} textColor={"#F5F5F5"}>
          poddds is perfect for anyone who wants to achieve their goals, with a
          close community
        </Text>
        <Flex textColor={"white"}>
          <Entry emoji={"💪"} text={"work out and diet"} />
          <Entry emoji={"💪"} text={"work out and diet"} />
          <Entry emoji={"💪"} text={"work out"} />
        </Flex>
      </VStack>
    </Flex>
  );
};

const Entry = ({ emoji, text }) => {
  return (
    <VStack>
      <Box>{emoji}</Box>
      <Box>{text}</Box>
    </VStack>
  );
};

export default UseCases;
