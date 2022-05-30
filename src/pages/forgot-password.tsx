import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/Inputs/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import login from "./login";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <Flex justify={"center"} mt={20}>
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
