import {
  Box,
  Button,
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
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import newLogo from "../images/Logos/newLogo.png";
import { sendMessage } from "../utils/messaging/sendMessage";
import { toErrorMap } from "../utils/toErrorMap";
import { Event, PageView } from "../libs/tracking";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  useEffect(() => PageView(), []);

  const router = useRouter();
  const [register] = useRegisterMutation();

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
            <Heading fontSize={"4xl"} textAlign={"center"} color={"gainsboro"}>
              Join the community!
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features 🔥
            </Text>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
          >
            <Stack spacing={4} p={8}>
              <Formik
                initialValues={{ username: "", email: "", password: "" }}
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
                      <Box mr={8} textColor={"gainsboro"}>
                        <InputField
                          name="username"
                          placeholder="username"
                          label="Username (feel free to use an alias)"
                        />
                        <Box mt={4}>
                          <InputField
                            name="email"
                            placeholder="email"
                            label="Email"
                          />
                        </Box>
                        <Box mt={4}>
                          <InputField
                            type={"password"}
                            name="password"
                            placeholder="password"
                            label="Password"
                          />
                        </Box>
                      </Box>
                      <Stack spacing={10} pt={2}>
                        <Box>
                          <Button
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
                            isloading={isSubmitting ? "true" : "false"}
                            cursor={"pointer"}
                          >
                            Join the community!
                          </Button>
                        </Box>
                        <Text align={"center"}>
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
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Register;
