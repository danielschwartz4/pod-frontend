import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

interface UseCasesProps {}

const UseCases: React.FC<UseCasesProps> = ({}) => {
  return (
    <Flex justifyContent={"center"}>
      <VStack width={"80%"}>
        <Text
          fontSize={"3xl"}
          fontWeight={"bold"}
          fontFamily={"ubuntu"}
          textColor={"#F5F5F5"}
          width={"80%"}
        >
          poddds is perfect for anyone who wants to achieve their goals, with a
          close community
        </Text>
        <Flex
          textColor={"white"}
          justifyContent={"space-between"}
          width={"100%"}
          fontFamily={"ubuntu"}
        >
          <Entry emoji={"💪"} text={"Working out and Diet"} />
          <Entry emoji={"📚"} text={"Studying and Reading"} />
          <Entry emoji={"📝"} text={"Solo Projects"} />
        </Flex>
      </VStack>
    </Flex>
  );
};

const Entry = ({ emoji, text }) => {
  return (
    <VStack textAlign={"center"}>
      <Box fontSize={{ base: 48 }}>{emoji}</Box>
      <Box fontSize={{ base: 20 }}>{text}</Box>
    </VStack>
  );
};

export default UseCases;
