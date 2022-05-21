import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Features } from "../components/Home/Features/Features";
import Hero from "../components/Home/Hero";
import Selector from "../components/Home/Selector";
import { Layout } from "../components/Layout";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Layout>
      <Box mt={"4em"} mx={2}>
        <Selector></Selector>
      </Box>
      <Box mt={"4em"}>
        <Hero></Hero>
      </Box>
      <Box>
        <Text fontSize={28} textColor={"white"}>
          Flow chart with react flow circles going down 1. Create a project 2.
          Join a pod 3. Accomplish your goals
        </Text>
      </Box>
      <Box mt={"4em"}>
        <Features></Features>
      </Box>
    </Layout>
  );
};

export default Index;
