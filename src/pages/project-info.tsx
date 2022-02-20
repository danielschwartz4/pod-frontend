import { Box, Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useAddProjectInfoMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
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
            milestones: "",
            milestoneDates: "",
            overview: "",
            projectName: "",
          }}
          onSubmit={async (
            { groupSize, milestones, overview, milestoneDates, projectName },
            { setErrors }
          ) => {
            const response = await addProjectInfo({
              variables: {
                projectOptions: {
                  userId: data?.me.id,
                  groupSize: parseInt(groupSize),
                  milestones: [milestones],
                  overview: overview,
                  milestoneDates: [milestoneDates],
                  projectName: projectName,
                },
              },
            });
            if (response.data.addProjectInfo.errors) {
              setErrors(toErrorMap(response.data.addProjectInfo.errors));
            } else if (response.data.addProjectInfo.project) {
              router.push("/home");
            }
          }}
        >
          {({ isSubmitting }) => (
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
                <Box mt={4}>
                  <InputField
                    name="milestones"
                    placeholder="milestones"
                    label="Milestones"
                  ></InputField>
                </Box>
                <Box mt={4}>
                  <InputField
                    name="milestoneDates"
                    placeholder="milestone dates"
                    label="Milestone Dates"
                  ></InputField>
                </Box>
                <Box mt={4}>
                  <InputField
                    name="groupSize"
                    placeholder="0-4"
                    label="Group size"
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
      </Wrapper>
    </Layout>
  );
};

export default ProjectInfo;
