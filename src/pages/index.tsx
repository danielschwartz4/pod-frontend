import { Box } from "@chakra-ui/react";
import React from "react";
import { Features } from "../components/Home/Features/Features";
import Hero from "../components/Home/Hero";
import Selector from "../components/Home/Selector";
import { Layout } from "../components/Layout";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Layout>
      <Box border={"4px"} mt={"4em"}>
        <Selector></Selector>
      </Box>
      <Box mt={"4em"}>
        <Hero></Hero>
      </Box>
      <Box mt={"4em"}>
        <Features></Features>
      </Box>
    </Layout>
  );
};

export default Index;
