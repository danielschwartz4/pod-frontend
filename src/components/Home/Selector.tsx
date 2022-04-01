import { Flex, Box, Select, Button } from "@chakra-ui/react";
import router from "next/router";
import React from "react";

interface SelectorProps {}

const Selector: React.FC<SelectorProps> = ({}) => {
  return (
    <Flex justifyContent={"center"}>
      <Box mr={4} mt={2} color={"gainsboro"}>
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

export default Selector;
