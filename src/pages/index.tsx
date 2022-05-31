import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
import { Features } from "../components/Home/Features/Features";
import Hero from "../components/Home/Hero";
import { Samples } from "../components/Home/Samples";
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
      <Divider w={"80%"} transform={"translateY(40px)"} />
      <Box mt={"4em"}>
        <Samples />
      </Box>
      <Divider w={"80%"} transform={"translateY(40px)"} />
      <Box mt={"4em"}>
        <Features></Features>
      </Box>
    </Layout>
  );
};

export default Index;
