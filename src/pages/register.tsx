import { Box, Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import { InputField } from "../components/Inputs/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [register] = useRegisterMutation();

  return (
    <Layout>
      <Wrapper variant="small">
        <Heading>Enter your info!</Heading>

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
              <Box>
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                ></InputField>
                <Box mt={4}>
                  <InputField
                    name="email"
                    placeholder="email"
                    label="Email"
                  ></InputField>
                </Box>
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                  ></InputField>
                </Box>
                <Button
                  mx={"auto"}
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting ? true : false}
                >
                  Register
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        {/* </Box> */}
      </Wrapper>
    </Layout>
  );
};

export default Register;
