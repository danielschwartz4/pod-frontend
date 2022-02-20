import { Box, Button, Flex, Heading, Select, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import router from "next/router";
import React from "react";
import { Layout } from "../components/Layout";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Layout>
      <Flex justifyContent={"center"}>
        <Stack>
          <Flex>
            <Box mr={4} mt={2}>
              Who are you?
            </Box>
            <Box width={"300px"}>
              <Select
                cursor={"pointer"}
                name="dropdown"
                placeholder="I am a..."
              >
                <option value="Writer">Writer </option>
                <option value="Musician">Musician</option>
                <option value="Influencer">Influencer</option>
                <option value="Entrepreneur">Entrepreneur</option>
              </Select>
            </Box>
            <Box ml={4}>
              <Button
                cursor={"pointer"}
                onClick={() => router.push("/register")}
              >
                Go
              </Button>
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Index;
