import { Box, Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import { type } from "os";
import React from "react";
import { InputField } from "../components/Inputs/InputField";
import MilestoneInputs from "../components/Inputs/MilestoneInputs";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useAddProjectInfoMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { objectToArray } from "../utils/jsonToArray";
import { toErrorMap } from "../utils/toErrorMap";

interface ProjectInfoProps {}

const ProjectInfo: React.FC<ProjectInfoProps> = ({}) => {
  const [addProjectInfo] = useAddProjectInfoMutation();

  const { data, loading, error } = useMeQuery({
    // !! Look up wtf this is!!!!!!!!
    skip: isServer(),
  });
  return (
    <Layout>
      <Wrapper variant="small">
        <Heading>Last step! Tell us what you're working on :)</Heading>

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
          onSubmit={async (
            { groupSize, milestone, overview, projectName },
            { setErrors }
          ) => {
            const descriptionArray = objectToArray(milestone, "description");
            const completionDateArray = objectToArray(
              milestone,
              "completionDate"
            );

            const response = await addProjectInfo({
              variables: {
                projectOptions: {
                  userId: data?.me.id,
                  groupSize: parseInt(groupSize),
                  milestones: descriptionArray,
                  overview: overview,
                  milestoneDates: completionDateArray,
                  projectName: projectName,
                },
              },
            });
            console.log(response);

            if (response.data.addProjectInfo.errors) {
              setErrors(toErrorMap(response.data.addProjectInfo.errors));
            } else if (response.data.addProjectInfo.project) {
              router.push("/profile");
            }
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
                <Box mt={4}>
                  <InputField
                    name="groupSize"
                    placeholder="0-4"
                    label="Group size"
                    autoComplete="off"
                  ></InputField>
                </Box>
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
