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
import { CenteredContainer, LandingDivider } from "../css/styles";

const Login: React.FC<{}> = ({}) => {
  useEffect(() => PageView(), []);

  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Flex
      height={"100vh"}
      maxH={"100vh"}
      alignItems={"flex-start"}
      justifyContent={"center"}
      bg={"gray.800"}
      m={-2}
    >
      <Box
        mt={"100px"}
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"center"}
      >
        <Flex pos={"absolute"} mt={2} top={0} left={0} p={4}>
          <NextLink href="/">
            <Image cursor={"pointer"} h={50} w={200} src={newLogo.src} alt="" />
          </NextLink>
        </Flex>
        <Stack
          width={"100%"}
          pt={12}
          mx={4}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack mb={"30px"} align={"center"} color={"gainsboro"}>
            <Heading mb={"0px"} fontSize={"4xl"} textAlign={"center"}>
              Sign in to your account
            </Heading>
            <Text color={"gainsboro"} fontFamily={"ubuntu"} fontSize={"lg"}>
              or register
              <NextLink href={"/register"}>
                <Link color={"blue.400"} marginLeft={"0.3em"}>
                  here
                </Link>
              </NextLink>{" "}
            </Text>
          </Stack>

          <CenteredContainer marginTop="20px">
            <Stack spacing={4} w={"100%"}>
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
                        <Box fontFamily={"ubuntu"} textColor={"gainsboro"}>
                          <p>Email</p>
                          <InputField
                            name="email"
                            label=""
                            placeholder="Email"
                          />
                        </Box>
                        <Box
                          mt={4}
                          fontFamily={"ubuntu"}
                          textColor={"gainsboro"}
                        >
                          <p>Password</p>
                          <InputField
                            name="password"
                            label=""
                            placeholder="Password"
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
                          <Checkbox fontFamily={"ubuntu"} color={"gainsboro"}>
                            Remember me
                          </Checkbox>
                          <NextLink href={"/forgot-password"}>
                            <Link fontFamily={"ubuntu"} color={"blue.400"}>
                              Forgot password?
                            </Link>
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
                            isLoading={isSubmitting}
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
            </Stack>
            {/* <LandingDivider
              style={{
                height: "50vh",
                width: "1px",
                margin: "0px 35px 0px 35px",
              }}
            />
            <OAuth OAuthType="login" /> */}
          </CenteredContainer>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
