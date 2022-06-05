import { Heading, Box, Divider, Button, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import React from "react";
import { MeQuery, useAddProjectInfoMutation } from "../../generated/graphql";
import { objectToArray } from "../../utils/objectToArray";
import { InputField } from "../Inputs/InputField";
import MilestoneInputs from "../Inputs/MilestoneInputs";

interface EnterProjectProps {
  meData: MeQuery;
}

const EnterProject: React.FC<EnterProjectProps> = ({ meData }) => {
  const [addProjectInfo] = useAddProjectInfoMutation();

  return (
    <>
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
                userId: meData?.me.id,
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
    </>
  );
};

export default EnterProject;
