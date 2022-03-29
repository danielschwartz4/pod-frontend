import { Flex, Box, Select, Button } from "@chakra-ui/react";
import router from "next/router";
import React from "react";

interface SelectorProps {}

const Selector: React.FC<SelectorProps> = ({}) => {
  return (
    <Flex justifyContent={"center"}>
      <Box mr={4} mt={2}>
        Who are you?
      </Box>
      <Box width={"300px"}>
        <Select cursor={"pointer"} name="dropdown" placeholder="I am a...">
          <option value="Writer">Writer </option>
          <option value="Musician">Musician</option>
          <option value="Influencer">Influencer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </Select>
      </Box>
      <Box ml={4}>
        <Button cursor={"pointer"} onClick={() => router.push("/register")}>
          Go
        </Button>
      </Box>
    </Flex>
  );
};

export default Selector;
