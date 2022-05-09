import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  Image,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/Inputs/InputField";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import firstLogo from "../images/Logos/firstLogo.png";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"gray.800"}
      m={-2}
    >
      <Flex pos={"absolute"} top={0} left={0} p={6}>
        <NextLink href="/">
          <Image cursor={"pointer"} h={70} w={200} src={firstLogo.src} alt="" />
        </NextLink>
      </Flex>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={"gainsboro"}>
            Sign in to your account
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            or register
            <NextLink href={"/register"}>
              <Link color={"blue.400"} marginLeft={"0.3em"}>
                here
              </Link>
            </NextLink>
            ✌️
          </Text>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Wrapper variant="small">
            <Formik
              initialValues={{ usernameOrEmail: "", password: "" }}
              onSubmit={async (
                { password, usernameOrEmail },
                { setErrors }
              ) => {
                const response = await login({
                  variables: {
                    password,
                    usernameOrEmail,
                  },
                  update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.login?.user,
                      },
                    });
                  },
                });
                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user) {
                  if (typeof router.query.next === "string") {
                    router.push(router.query.next);
                  } else {
                    router.push("/profile");
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Box maxW={"448px"}>
                    <Box>
                      <InputField
                        name="usernameOrEmail"
                        label="Username or Email"
                        placeholder="Username or email"
                      />
                    </Box>
                    <Box mt={4}>
                      <InputField
                        name="password"
                        label="Password"
                        placeholder="password"
                        type="password"
                      />
                    </Box>
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                        mt={6}
                      >
                        <Checkbox color={"blue.400"}>Remember me</Checkbox>
                        <NextLink href={"/forgot-password"}>
                          <Link color={"blue.400"}>forgot password?</Link>
                        </NextLink>
                      </Stack>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        isLoading={isSubmitting}
                        type="submit"
                        width={"100%"}
                      >
                        Sign in
                      </Button>
                    </Stack>
                  </Box>
                </Form>
              )}
            </Formik>
          </Wrapper>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
