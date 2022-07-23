import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Features } from "../components/Home/Features/Features";
import Hero from "../components/Home/Hero";
import SampleVideo from "../components/Home/SampleVideo";
import UseCases from "../components/Home/UseCases";
import { Layout } from "../components/Layout";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Layout>
      <Hero />
      <Divider w={"80%"} color={"#FFDC93"} transform={"translateY(40px)"} />
      <Flex>
        <Box textAlign={"center"} mx={"auto"} maxW={"1200px"} mt={"8em"}>
          <UseCases />
        </Box>
      </Flex>
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
