import { LockIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { accountProps } from "./Account";
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
