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
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { InputField } from "../components/Inputs/InputField";
import OAuth from "../components/OAuth/OAuth";
import { CenteredContainer, LandingDivider } from "../css/styles";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useUpdateFeedbackMutation,
} from "../generated/graphql";
import newLogo from "../images/Logos/newLogo.png";
import { Event, PageView } from "../libs/tracking";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC<{}> = ({}) => {
  useEffect(() => PageView(), []);

  const router = useRouter();
  const [login] = useLoginMutation();
  const [updateFeedback] = useUpdateFeedbackMutation();

  return (
    <Flex
      height={"100vh"}
      minH={"130vh"}
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
              <OAuth OAuthType="login" />
              <LandingDivider
                style={{
                  width: "100%",
                  margin: "35px 0px 0px 0px",
                }}
              />

              <Formik
                initialValues={{ email: "", password: "", feedback: "" }}
                onSubmit={async (
                  { password, email, feedback },
                  { setErrors }
                ) => {
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
                    await updateFeedback({
                      variables: {
                        feedback: feedback,
                      },
                    });
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
                      <Box fontFamily={"ubuntu"} mr={8} textColor={"gainsboro"}>
                        <Box textColor={"gainsboro"}>
                          <p>
                            Email <b style={{ color: "#DC143C" }}> *</b>
                          </p>
                          <InputField
                            name="email"
                            label=""
                            placeholder="Email"
                          />
                        </Box>
                        <Box mt={4} textColor={"gainsboro"}>
                          <p>
                            Password<b style={{ color: "#DC143C" }}> *</b>
                          </p>
                          <InputField
                            name="password"
                            label=""
                            placeholder="Password"
                            type="password"
                            isPassword={true}
                          />
                        </Box>
                        <p>Do you have any feedback for the site?</p>
                        <Box mt={4}>
                          <InputField
                            // type={"feedback"}
                            textColor={"gainsboro"}
                            name="feedback"
                            placeholder="Optional but welcome!"
                            label=""
                            isField={true}
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
          </CenteredContainer>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
