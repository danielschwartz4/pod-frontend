import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { InputField } from "../components/Inputs/InputField";
import { CenteredContainer } from "../css/styles";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import newLogo from "../images/Logos/newLogo.png";
import { Event, PageView } from "../libs/tracking";
import { sendMessage } from "../utils/messaging/sendMessage";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  useEffect(() => PageView(), []);

  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Flex
      height={"100vh"}
      minH={"120vh"}
      alignItems={"flex-start"}
      justifyContent={"center"}
      bg={"gray.800"}
      m={-2}
    >
      <Box
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"center"}
        w={"750px"}
        mt={"100px"}
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
            <Heading
              mt={"0px"}
              mb={"0px"}
              fontSize={"4xl"}
              textAlign={"center"}
            >
              Join the community!
            </Heading>
            <Text color={"gainsboro"} fontFamily={"ubuntu"} fontSize={"lg"}>
              to enjoy all of our cool features 🔥
            </Text>
          </Stack>

          <CenteredContainer marginTop="20px">
            <Stack spacing={4} width={"100%"}>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  feedback: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  Event(
                    "Desktop",
                    "Register register.tsx Button",
                    "Join the community"
                  );
                  const response = await register({
                    variables: {
                      options: {
                        ...values,
                      },
                    },
                    update: (cache, { data }) => {
                      cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                          __typename: "Query",
                          me: data?.register.user,
                        },
                      });
                    },
                  });
                  if (response.data.register.errors) {
                    setErrors(toErrorMap(response.data.register.errors));
                  } else if (response.data.register.user) {
                    process.env.NODE_ENV === "production"
                      ? sendMessage({
                          to: "+12173817277",
                          body: `${values.username} has joined the community! Their email is ${values.email}`,
                        })
                      : null;
                    router.push("/profile");
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box>
                      <Box mr={8} fontFamily={"ubuntu"} textColor={"gainsboro"}>
                        <p>Username (feel free to use an alias)</p>
                        <InputField
                          name="username"
                          placeholder="Username"
                          label=""
                        />
                        <p>Email</p>
                        <Box mt={4}>
                          <InputField
                            name="email"
                            placeholder="Email"
                            label=""
                          />
                        </Box>
                        <p>Password</p>
                        <Box mt={4}>
                          <InputField
                            type={"password"}
                            name="password"
                            placeholder="Password"
                            label=""
                            isPassword={true}
                          />
                        </Box>
                        <p>
                          What do you think are successes and challenges for you
                          when having accountability groups?
                        </p>
                        <Box mt={4}>
                          <InputField
                            type={"feedback"}
                            textColor={"gainsboro"}
                            name="feedback"
                            placeholder="ex. I’m able to talk daily to my accountability partners"
                            label=""
                            isField={true}
                          />
                        </Box>
                      </Box>

                      <Stack spacing={5} pt={2}>
                        <Box>
                          <Button
                            border={"none"}
                            mt={4}
                            w={"100%"}
                            loadingText="Submitting"
                            size="lg"
                            bg={"blue.400"}
                            color={"white"}
                            _hover={{
                              bg: "blue.500",
                            }}
                            type="submit"
                            // isloading={isSubmitting ? "true" : "false"}
                            isLoading={isSubmitting}
                            cursor={"pointer"}
                          >
                            Join the community!
                          </Button>
                        </Box>
                        <Text
                          textColor={"gainsboro"}
                          mt={"0px"}
                          fontFamily={"ubuntu"}
                          align={"center"}
                        >
                          Already a user?{" "}
                          <NextLink href={"/login"}>
                            <Link color={"blue.400"} ml="auto">
                              Login
                            </Link>
                          </NextLink>
                        </Text>
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
            <OAuth OAuthType="register" /> */}
          </CenteredContainer>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Register;
