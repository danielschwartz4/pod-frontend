import { Box, Flex, Heading, Text, Link, Button } from "@chakra-ui/react";
import React from "react";
import { accountProps } from "./Account";
import NextLink from "next/link";
import { LockIcon } from "@chakra-ui/icons";
import router from "next/router";
import Section from "./Section";

interface authProps extends accountProps {}

const Auth: React.FC<authProps> = ({}) => {
  return (
    <Section>
      <Box mt={-4}>
        <Text fontSize={24} textColor={"gray.500"}>
          <b>PASSWORD</b>
        </Text>
      </Box>
      <Flex>
        <Box mr={"auto"}>
          <Button
            onClick={() => router.push("/forgot-password")}
            cursor={"pointer"}
            textColor={"gainsboro"}
            bg={"gray.600"}
          >
            <Text>reset password</Text>
          </Button>
        </Box>
        <Box>
          <LockIcon />
        </Box>
      </Flex>
    </Section>
  );
};

export default Auth;
