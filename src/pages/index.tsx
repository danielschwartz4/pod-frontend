import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Features } from "../components/Home/Features/Features";
import Hero from "../components/Home/Hero";
import SampleVideo from "../components/Home/SampleVideo";
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
      <Box>
        <SampleVideo />
      </Box>
      {/* <Samples /> */}
      <Divider w={"80%"} transform={"translateY(40px)"} />
    </Layout>
  );
};

export default Index;
