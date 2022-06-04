import { Box, Button, Divider, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import { InputField } from "../components/Inputs/InputField";
import MilestoneInputs from "../components/Inputs/MilestoneInputs";
import { Layout } from "../components/Layout";
import { useAddProjectInfoMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { objectToArray } from "../utils/objectToArray";
import { useIsAuth } from "../utils/usIsAuth";

interface ProjectInfoProps {}

const ProjectInfo: React.FC<ProjectInfoProps> = ({}) => {
  useIsAuth();
  const [addProjectInfo] = useAddProjectInfoMutation();

  const { data, loading, error } = useMeQuery({
    // !! Look up wtf this is!!!!!!!!
    skip: isServer(),
  });
  return (
    <Layout isProfile={true}>
      <Box h={"100%"} minH={"60vh"}>
        <Box
          mt={20}
          mx={{ base: 2, sm: "auto" }}
          padding={4}
          border="4px"
          borderColor={"gray.600"}
          borderRadius={12}
          maxW={"600px"}
          justifyContent={"center"}
        >
          <Heading fontSize={24} color={"gainsboro"}>
            Tell us what you're working on so we can build a flow for you!
          </Heading>
          <Text color={"grey"}>
            * you can edit your project as much as you'd like later *
          </Text>
          <Formik
            initialValues={{
              milestone: [
                {
                  description: "",
                  completionDate: "",
                },
              ],
              overview: "",
              projectName: "",
            }}
            onSubmit={async ({ milestone, overview }, { setErrors }) => {
              const descriptionArray = objectToArray(milestone, "description");
              const completionDateArray = objectToArray(
                milestone,
                "completionDate"
              );
              const response = await addProjectInfo({
                variables: {
                  projectOptions: {
                    userId: data?.me.id,
                    milestones: descriptionArray,
                    overview: overview,
                    milestoneDates: completionDateArray,
                    milestoneProgress: Array(descriptionArray.length).fill(1),
                    projectName: "Click here to name project",
                  },
                },
              });
              router.push("/profile");
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <Box>
                  <Box mr={8} color={"gainsboro"}>
                    <InputField
                      color="grey"
                      name="overview"
                      placeholder="enter a brief overview of your project for your pod members"
                      label="Overview"
                      isField={true}
                    />
                  </Box>
                  <Divider mt={4} color={"grey"}></Divider>
                  <Text color={"grey"}>
                    * enter your milestones and tentative completion dates *
                  </Text>
                  <Box color={"gainsboro"}>
                    <MilestoneInputs values={values} />
                  </Box>

                  <Button
                    mx={"auto"}
                    mt={4}
                    type="submit"
                    isloading={isSubmitting ? "true" : "false"}
                    cursor="pointer"
                  >
                    Get started!
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProjectInfo;
