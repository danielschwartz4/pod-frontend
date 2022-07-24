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
import React, { useEffect } from "react";
import { InputField } from "../components/Inputs/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import newLogo from "../images/Logos/newLogo.png";
import { toErrorMap } from "../utils/toErrorMap";
import { Event, PageView } from "../libs/tracking";
import OAuth from "../components/OAuth/OAuth";
import { LandingDivider } from "../css/styles";

const Login: React.FC<{}> = ({}) => {
  useEffect(() => PageView(), []);

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
        <Flex pos={"absolute"} mt={2} top={0} left={0} p={4}>
          <NextLink href="/">
            <Image cursor={"pointer"} h={50} w={200} src={newLogo.src} alt="" />
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
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <OAuth OAuthType="login" />
            <LandingDivider style={{ margin: "0px 0px 30px 0px" }} />
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async ({ password, email }, { setErrors }) => {
                const response = await login({
                  variables: {
                    password,
                    email,
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
                    <Box mr={8} textColor={"gainsboro"}>
                      <Box>
                        <InputField
                          // name="usernameOrEmail"
                          // label="Username or Email"
                          // placeholder="Username or email"
                          name="email"
                          label="Email"
                          placeholder="Email"
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
                    </Box>
                    <Stack spacing={10} pt={2}>
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
                      <Box>
                        <Button
                          w={"100%"}
                          bg={"blue.400"}
                          color={"white"}
                          size={"lg"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          isloading={isSubmitting.toString()}
                          border={"none"}
                          type="submit"
                          width={"100%"}
                          cursor={"pointer"}
                          loadingText="Submitting"
                          onClick={() =>
                            Event(
                              "Desktop",
                              "Login login.tsx Button",
                              "Sign in"
                            )
                          }
                        >
                          Sign in
                        </Button>
                      </Box>
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
