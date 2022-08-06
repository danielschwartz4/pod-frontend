import { Box, Button, Flex, Link, Image } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/Inputs/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import { useChangePasswordMutation } from "../../generated/graphql";
import NextLink from "next/link";
import { Font } from "../../css/styles";
import newLogo from "../../images/Logos/newLogo.png";

// Can also pass token through query parameters rather than getInitialProps
const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
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

        <Box
          rounded={"lg"}
          bg={"gray.700"}
          boxShadow={"lg"}
          p={8}
          m={4}
          justifyContent={"center"}
        >
          <Formik
            initialValues={{ newPassword: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await changePassword({
                variables: {
                  newPassword: values.newPassword,
                  token,
                },
              });

              if (response.data?.changePassword.errors) {
                const errorMap = toErrorMap(
                  response.data.changePassword.errors
                );
                if ("token" in errorMap) {
                  setTokenError(errorMap.token);
                }
                setErrors(errorMap);
              } else if (response.data?.changePassword.user) {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mr={8}>
                  <Font style={{ marginBottom: "20px" }}>New Password</Font>
                  <InputField
                    name="newPassword"
                    label=""
                    placeholder="New password"
                    type="password"
                  />
                </Box>
                {tokenError ? (
                  <Flex>
                    <Box mr={8} color="red">
                      {tokenError}
                    </Box>
                    <NextLink href={"/forgot-password"}>
                      <Link>Get a new link here</Link>
                    </NextLink>
                  </Flex>
                ) : null}
                <Button
                  bg="#FFDC93"
                  color="black"
                  type="submit"
                  mt={4}
                  isLoading={isSubmitting}
                >
                  Change password
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Flex>
  );
};

ChangePassword.getInitialProps = (props: any) => {
  return {
    token: props.query.token as string,
  };
};

export default ChangePassword;
