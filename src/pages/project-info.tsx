import { Box, Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import { InputField } from "../components/Inputs/InputField";
import MilestoneInputs from "../components/Inputs/MilestoneInputs";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
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
    <Layout>
      <Wrapper variant="small">
        <Heading color={"white"}>
          Last step! Tell us what you're working on :)
        </Heading>

        <Formik
          initialValues={{
            groupSize: "",
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
                  groupSize: 1,
                  milestones: descriptionArray,
                  overview: overview,
                  milestoneDates: completionDateArray,
                  milestoneProgress: Array(descriptionArray.length).fill(1),
                  projectName: "Untitled project",
                },
              },
            });
            router.push("/profile");
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Box>
                <Box>
                  <InputField
                    name="overview"
                    placeholder="overview"
                    label="Overview"
                    isField={true}
                  ></InputField>
                </Box>
                <MilestoneInputs values={values} />
                <Button
                  mx={"auto"}
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting ? true : false}
                >
                  Get started!
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default ProjectInfo;
