import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import router from "next/router";
import React from "react";
import { Features } from "../components/Home/Features/Features";
import Hero from "../components/Home/Hero";
import Selector from "../components/Home/Selector";
import { Layout } from "../components/Layout";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Box bg={"gray.800"} ml={-2} mr={-2}>
      <Layout>
        <Hero></Hero>
        <Selector></Selector>
        <Features></Features>
      </Layout>
    </Box>
  );
};

export default Index;
