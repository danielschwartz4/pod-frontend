import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/Inputs/InputField";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import firstLogo from "../images/Logos/firstLogo.png";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      m={-2}
    >
      <Flex pos={"absolute"} top={0} left={0} p={6}>
        <NextLink href="/">
          <Image cursor={"pointer"} h={70} w={200} src={firstLogo.src} alt="" />
        </NextLink>
      </Flex>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
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
            <Wrapper variant="small">
              <Formik
                initialValues={{ username: "", email: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
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
                  console.log(response);
                  if (response.data.register.errors) {
                    setErrors(toErrorMap(response.data.register.errors));
                  } else if (response.data.register.user) {
                    router.push("/project-info");
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box maxW={"448px"}>
                      <Box>
                        <InputField
                          name="username"
                          placeholder="username"
                          label="Username"
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
                            width={"100%"}
                            loadingText="Submitting"
                            size="lg"
                            bg={"blue.400"}
                            color={"white"}
                            _hover={{
                              bg: "blue.500",
                            }}
                            type="submit"
                            isLoading={isSubmitting ? true : false}
                            cursor={"pointer"}
                          >
                            Join the community!
                          </Button>
                        </Box>
                      </Stack>
                      <Stack pt={6}>
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
            </Wrapper>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
