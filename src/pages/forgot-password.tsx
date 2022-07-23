import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import React, { useState } from "react";
import { InputField } from "../components/Inputs/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import newLogo from "../images/Logos/newLogo.png";

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
        <Flex pos={"absolute"} top={0} left={0} p={4}>
          <NextLink href="/">
            <Image cursor={"pointer"} h={70} w={200} src={newLogo.src} alt="" />
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
              await forgotPassword({
                variables: values,
              });
              setComplete(true);
            }}
          >
            {({ isSubmitting }) =>
              complete ? (
                <Box>
                  if an account with that email exists, we sent you an email
                </Box>
              ) : (
                <Form>
                  <Box mt={4} mr={8}>
                    <InputField
                      name="email"
                      label="Enter email to reset password"
                      placeholder="email"
                      type="email"
                    />
                  </Box>
                  <Button
                    mt={4}
                    isLoading={isSubmitting}
                    colorScheme="teal"
                    type="submit"
                    cursor={isSubmitting ? "not-allowed" : "pointer"}
                  >
                    forgot password
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
