import { AspectRatio, Box, Divider, Flex } from "@chakra-ui/react";
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
      <Flex mt={"8em"}>
        <Box mx={"auto"} display={["none", "block"]}>
          <iframe
            width="672"
            height="378"
            src="https://www.youtube.com/embed/k5YCmw6BNGQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
        <Box mx={"auto"} display={["block", "none"]}>
          <iframe
            width="336"
            height="189"
            src="https://www.youtube.com/embed/k5YCmw6BNGQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Flex>
      {/* <Samples /> */}
      <Divider w={"80%"} transform={"translateY(40px)"} />
    </Layout>
  );
};

export default Index;
