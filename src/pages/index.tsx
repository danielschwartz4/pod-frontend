import { Box, Divider, Flex } from "@chakra-ui/react";
import React from "react";
import { Features } from "../components/Home/Features/Features";
import Hero from "../components/Home/Hero";
import { Samples } from "../components/Home/Samples";
import { Layout } from "../components/Layout";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Layout>
      <Hero />
      <Flex>
        <Box mx={"auto"} maxW={"1200px"} mt={"8em"}>
          <Features />
        </Box>
      </Flex>
      <Divider w={"80%"} transform={"translateY(40px)"} />
      <Box mt={"4em"}>
        <Samples />
      </Box>
      <Divider w={"80%"} transform={"translateY(40px)"} />
    </Layout>
  );
};

export default Index;
