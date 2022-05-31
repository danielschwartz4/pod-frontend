import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import React, { useState } from "react";
import { InputField } from "../components/Inputs/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import firstLogo from "../images/Logos/firstLogo.png";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <Flex justify={"center"} mt={20}>
      <Flex pos={"absolute"} top={0} left={0} p={4}>
        <NextLink href="/">
          <Image cursor={"pointer"} h={70} w={200} src={firstLogo.src} alt="" />
        </NextLink>
      </Flex>
      <Box w={"300px"}>
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
                <Box mt={4}>
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
    </Flex>
  );
};

export default ForgotPassword;
