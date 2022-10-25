import { Flex } from "@chakra-ui/react";
import React from "react";
import About from "../components/Home/About";
import { Features } from "../components/Home/Features/Features";
import Hero, { GetStartedButton } from "../components/Home/Hero";
import UseCases from "../components/Home/UseCases";
import { Layout } from "../components/Layout";
import { LandingBox, LandingDivider } from "../css/styles";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
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
        {/* <Box mt={16}>
          <Footer />
        </Box> */}
      </Flex>
    </Layout>
  );
};

export default Index;
