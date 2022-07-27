import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Features } from "../components/Home/Features/Features";
import Hero, { GetStartedButton } from "../components/Home/Hero";
import About from "../components/Home/About";
import SampleVideo from "../components/Home/SampleVideo";
import UseCases from "../components/Home/UseCases";
import { Layout } from "../components/Layout";
import { LandingDivider, LandingBox } from "../css/styles";
import Footer from "../components/Footer/Footer";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <Layout>
        <Hero />
        <Flex flexDirection={"column"} alignItems={"center"}>
          <LandingDivider />
          <LandingBox>
            <UseCases />
          </LandingBox>
          <LandingDivider />
          <LandingBox>
            <Features />
          </LandingBox>
          <LandingDivider />
          <LandingBox>
            <About />
          </LandingBox>
          <LandingBox style={{ marginTop: "50px" }}>
            <GetStartedButton />
          </LandingBox>
          <Box mt={16}>
            <Footer />
          </Box>
        </Flex>
      </Layout>
    </meta>
  );
};

export default Index;
