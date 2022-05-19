import { Flex, Box, Select, Button, VStack } from "@chakra-ui/react";
import router from "next/router";
import React from "react";

interface SelectorProps {}

const Selector: React.FC<SelectorProps> = ({}) => {
  return (
    <>
      <DesktopSelector />
      <MobileSelector />
    </>
  );
};

const DesktopSelector: React.FC<SelectorProps> = ({}) => {
  return (
    <Flex
      display={{ base: "none", md: "flex" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box mr={4} color={"gainsboro"} textAlign={"center"} fontSize={24}>
        Who are you?
      </Box>
      <Box width={"300px"} color={"gainsboro"}>
        <Select
          color={"gainsboro"}
          textColor={"gainsboro"}
          cursor={"pointer"}
          name="dropdown"
          placeholder="I am a..."
        >
          <option value="Writer">Writer </option>
          <option value="Musician">Musician</option>
          <option value="Influencer">Influencer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </Select>
      </Box>
      <Box ml={4}>
        <Button
          textColor={"gainsboro"}
          color={"gainsboro"}
          cursor={"pointer"}
          onClick={() => router.push("/register")}
        >
          Join a pod! 😆
        </Button>
      </Box>
    </Flex>
  );
};

const MobileSelector: React.FC<SelectorProps> = ({}) => {
  return (
    <VStack
      display={{ base: "flex", md: "none" }}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={8}
    >
      <Box mr={4} color={"gainsboro"} textAlign={"center"} fontSize={24}>
        Who are you?
      </Box>
      <Box width={"300px"} color={"gainsboro"}>
        <Select
          color={"gainsboro"}
          textColor={"gainsboro"}
          cursor={"pointer"}
          name="dropdown"
          placeholder="I am a..."
        >
          <option value="Writer">Writer </option>
          <option value="Musician">Musician</option>
          <option value="Influencer">Influencer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </Select>
      </Box>
      <Box ml={4}>
        <Button
          textColor={"gainsboro"}
          color={"gainsboro"}
          cursor={"pointer"}
          onClick={() => router.push("/register")}
          width={"300px"}
        >
          Get started!
        </Button>
      </Box>
    </VStack>
  );
};

export default Selector;
