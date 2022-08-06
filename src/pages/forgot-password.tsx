import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import React, { useState } from "react";
import { InputField } from "../components/Inputs/InputField";
import { Font } from "../css/styles";
import { useForgotPasswordMutation } from "../generated/graphql";
import newLogo from "../images/Logos/newLogo.png";
import { Event } from "../libs/tracking";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

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
            initialValues={{ email: "" }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values.email);
              let res = await forgotPassword({
                variables: values,
              });
              console.log(res);
              setComplete(true);
            }}
          >
            {({ isSubmitting }) =>
              complete ? (
                <Box>
                  <Font>
                    If an account with that email exists, we sent you an email
                    👍
                  </Font>
                </Box>
              ) : (
                <Form>
                  <Box mr={8}>
                    <Font style={{ marginBottom: "20px" }}>
                      Enter email to reset password
                    </Font>
                    <InputField
                      name="email"
                      label=""
                      placeholder="Email"
                      type="email"
                    />
                  </Box>
                  <Button
                    mt={4}
                    isLoading={isSubmitting}
                    bg="#FFDC93"
                    color="black"
                    type="submit"
                    cursor={isSubmitting ? "not-allowed" : "pointer"}
                    onClick={() =>
                      Event(
                        "Desktop",
                        "Forgot Password Button",
                        "Forgot my password"
                      )
                    }
                  >
                    Forgot password
                  </Button>
                </Form>
              )
            }
          </Formik>
        </Box>
      </Box>
    </Flex>
  );
};

export default ForgotPassword;
