import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/Inputs/InputField";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import firstLogo from "../images/Logos/firstLogo.png";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Flex
      h={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"gray.800"}
      m={-2}
    >
      <Box w={"500px"}>
        <Flex pos={"absolute"} top={0} left={0} p={4}>
          <NextLink href="/">
            <Image
              cursor={"pointer"}
              h={70}
              w={200}
              src={firstLogo.src}
              alt=""
            />
          </NextLink>
        </Flex>
        <Stack spacing={4} maxW={"lg"} pt={12} mx={4}>
          <Stack align={"center"}>
            <Heading textAlign={"center"} fontSize={"4xl"} color={"gainsboro"}>
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
            justifyContent={"center"}
          >
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
                  <Box>
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
                      <Flex
                        alignItems={"center"}
                        justify={"space-between"}
                        mt={6}
                      >
                        <Checkbox color={"blue.400"}>Remember me</Checkbox>
                        <NextLink href={"/forgot-password"}>
                          <Link color={"blue.400"}>forgot password?</Link>
                        </NextLink>
                      </Flex>

                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        isLoading={isSubmitting}
                        type="submit"
                        width={"100%"}
                        cursor={"pointer"}
                      >
                        Sign in
                      </Button>
                    </Stack>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
