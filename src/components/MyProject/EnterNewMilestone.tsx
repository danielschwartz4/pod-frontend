import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import {
  useUpdateProjectMilestoneDatesMutation,
  useUpdateProjectMilestonesMutation,
  useUpdateProjectProgressMutation,
} from "../../generated/graphql";
import DatePickerInput from "../Inputs/DatePickerInput";
import { InputField } from "../Inputs/InputField";

interface EnterNewMilestoneProps {
  milestones: string[];
  milestoneDates: string[];
  milestoneProgress: number[];
  projectId: number;
  setMilestones: React.Dispatch<React.SetStateAction<string[]>>;
  setMilestoneDates: React.Dispatch<React.SetStateAction<string[]>>;
  setMilestoneProgress: React.Dispatch<React.SetStateAction<number[]>>;
}

const EnterNewMilestone: React.FC<EnterNewMilestoneProps> = (props) => {
  const [updateProjectMilestoneDates] =
    useUpdateProjectMilestoneDatesMutation();
  const [updateProjectMilestones] = useUpdateProjectMilestonesMutation();
  const [updateProjectProgress] = useUpdateProjectProgressMutation();
  let _milestones = Object.assign([], props.milestones);
  let _milestoneDates = Object.assign([], props.milestoneDates);
  let _milestoneProgress = Object.assign([], props.milestoneProgress);
  const [isAddingMilestone, setIsAddingMilestone] = React.useState(false);

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
          console.log(completionDate);
          const response = await updateProjectMilestones({
            variables: {
              updateProjectMilestonesId: props.projectId,
              milestones: _milestones,
            },
          });

          if (response.data?.updateProjectMilestones) {
            const response2 = await updateProjectMilestoneDates({
              variables: {
                updateProjectMilestoneDatesId: props.projectId,
                milestoneDates: _milestoneDates,
              },
            });
            if (response2.data?.updateProjectMilestoneDates) {
              console.log("success");
            }
          }
          const response3 = await updateProjectProgress({
            variables: {
              updateProjectProgressId: props.projectId,
              milestoneProgress: _milestoneProgress,
            },
          });
          if (response3.data?.updateProjectProgress) {
            props.setMilestones(_milestones);
            props.setMilestoneDates(_milestoneDates);
            props.setMilestoneProgress(_milestoneProgress);
            console.log("success");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Flex alignItems={"center"} mt={4}>
                <Box mt={"28px"} mr={4}>
                  <Button
                    cursor="pointer"
                    onClick={() => setIsAddingMilestone(!isAddingMilestone)}
                  >
                    {isAddingMilestone ? (
                      <Text>Cancel</Text>
                    ) : (
                      <Text>Add milestone</Text>
                    )}
                  </Button>
                </Box>
                {isAddingMilestone ? (
                  <Flex>
                    <Box mr={4} textColor="gainsboro">
                      <InputField
                        name={"description"}
                        placeholder="milestone"
                        label={"Milestone"}
                        autoComplete="off"
                      />
                    </Box>

                    <Box mr={12} textColor="gainsboro">
                      <DatePickerInput
                        regularPosition={false}
                        name={"completionDate"}
                        label="Completion date"
                        placeholder="Choose a new Date"
                        showTimeSelect
                      />
                      <ErrorMessage
                        name={"completeionDate"}
                        component="div"
                        className="field-error"
                      />
                    </Box>
                    <Box mt={"28px"}>
                      <Button
                        type="submit"
                        isLoading={isSubmitting ? true : false}
                        cursor="pointer"
                        color={"white"}
                      >
                        Add milestone
                      </Button>
                    </Box>
                  </Flex>
                ) : null}
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EnterNewMilestone;
