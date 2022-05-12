import { Box, Button, Flex } from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import {
  useUpdateProjectMilestoneDatesMutation,
  useUpdateProjectMilestonesMutation,
  useUpdateProjectProgressMutation,
} from "../../generated/graphql";
import DatePickerInput from "../Inputs/DatePickerInput";
import { InputField } from "../Inputs/InputField";

interface NewMilestoneProps {
  milestones: string[];
  milestoneDates: string[];
  milestoneProgress: number[];
  projectId: number;
}

const NewMilestone: React.FC<NewMilestoneProps> = ({
  milestoneDates,
  milestones,
  milestoneProgress,
  projectId,
}) => {
  const [updateProjectMilestoneDates] =
    useUpdateProjectMilestoneDatesMutation();
  const [updateProjectMilestones] = useUpdateProjectMilestonesMutation();
  const [updateProjectProgress] = useUpdateProjectProgressMutation();
  let _milestones = Object.assign([], milestones);
  let _milestoneDates = Object.assign([], milestoneDates);
  let _milestoneProgress = Object.assign([], milestoneProgress);
  return (
    <Box>
      <Formik
        initialValues={{
          description: "",
          completionDate: "",
        }}
        onSubmit={async ({ description, completionDate }, { setErrors }) => {
          _milestones.push(description);
          _milestoneDates.push(completionDate);
          _milestoneProgress.push(1);
          const response = await updateProjectMilestones({
            variables: {
              updateProjectMilestonesId: projectId,
              milestones: _milestones,
            },
          });

          if (response.data?.updateProjectMilestones) {
            const response2 = await updateProjectMilestoneDates({
              variables: {
                updateProjectMilestoneDatesId: projectId,
                milestoneDates: _milestoneDates,
              },
            });
            if (response2.data?.updateProjectMilestoneDates) {
              console.log("success");
            }
          }
          const response3 = await updateProjectProgress({
            variables: {
              updateProjectProgressId: projectId,
              milestoneProgress: _milestoneProgress,
            },
          });
          if (response3.data?.updateProjectProgress) {
            console.log("success");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Flex alignItems={"center"} mt={4}>
                <Box>
                  <InputField
                    name={"description"}
                    placeholder="milestone"
                    label={"Milestone"}
                    autoComplete="off"
                  />
                </Box>
                <Box>
                  <DatePickerInput
                    name={"completeionDate"}
                    label="Completion date"
                    showTimeSelect
                  />
                  <ErrorMessage
                    name={"completeionDate"}
                    component="div"
                    className="field-error"
                  />
                </Box>
                <Box ml={"50px"} mt={"28px"}>
                  <Button
                    type="submit"
                    isLoading={isSubmitting ? true : false}
                    cursor="pointer"
                  >
                    Add milestone
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default NewMilestone;
