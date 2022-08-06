import { Box, Button, Divider, Flex, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import { ADD_TASKS_LIMIT } from "../../constants";
import { Font } from "../../css/styles";
import {
  MeQuery,
  useAddProjectToPodMutation,
  useAddSingleTasksChunkMutation,
  useCreatePodMutation,
  useCreateRecurringTaskMutation,
  useFindPublicPodLazyQuery,
  useUpdateTaskPodMutation,
} from "../../generated/graphql";
import { Event } from "../../libs/tracking";
import {
  DaysType,
  EndOptionsSelectorType,
  TaskTypeSelectorType,
} from "../../types/types";
import { sendMessage } from "../../utils/messaging/sendMessage";
import { toErrorMap } from "../../utils/toErrorMap";
import DatePickerInput from "../Inputs/DatePickerInput";
import { InputField } from "../Inputs/InputField";
import { joinPod } from "../MyTaskPod/JoinExit";
import DayPicker from "./DayPickerField";
import EndTaskSelection from "./EndTaskSelection";
import RepetitionStepper from "./RepetitionStepperField";
import TaskTypeSelection from "./TaskTypeSelection";

interface RecurringTaskProps {
  meData: MeQuery;
}

const RecurringTaskForm: React.FC<RecurringTaskProps> = ({ meData }) => {
  const [endOptionsSelector, setEndOptionsSelector] =
    React.useState<EndOptionsSelectorType>("none");
  const [taskTypeSelector, setTaskTypeSelector] =
    React.useState<TaskTypeSelectorType>("exercise");
  const [createRecurringTask] = useCreateRecurringTaskMutation();
  const [addSingleTasksChunk] = useAddSingleTasksChunkMutation();
  const [findPublicPods, { data, loading: podsLoading }] =
    useFindPublicPodLazyQuery();
  const [createPod] = useCreatePodMutation();
  const [addProjectToPod] = useAddProjectToPodMutation();
  const [updateTaskPod] = useUpdateTaskPodMutation();

  return (
    <Box mt={0} paddingTop={0}>
      <Heading fontSize={20} color={"gainsboro"}>
        Tell us what you'd like to stay consistent with!
      </Heading>
      <Formik
        initialValues={{
          overview: "",
          taskName: "",
          taskType: "exercise",
          startDate: null,
          endOptions: { date: null, repetitions: null, neverEnds: null },
          days: {
            0: { isSelected: false, duration: null },
            1: { isSelected: false, duration: null },
            2: { isSelected: false, duration: null },
            3: { isSelected: false, duration: null },
            4: { isSelected: false, duration: null },
            5: { isSelected: false, duration: null },
            6: { isSelected: false, duration: null },
          } as DaysType,
        }}
        onSubmit={async (
          { overview, taskName, taskType, startDate, endOptions, days },
          { setErrors }
        ) => {
          const response = await createRecurringTask({
            variables: {
              recurringTaskOptions: {
                userId: meData?.me.id,
                overview: overview,
                taskName: taskName,
                taskType: taskType,
                startDate: startDate,
                endOptions: endOptions,
                days: days,
              },
            },
          });
          if (response?.data?.createRecurringTask?.errors) {
            setErrors(toErrorMap(response.data.createRecurringTask.errors));
          } else {
            const singleTasksResponse = await addSingleTasksChunk({
              variables: {
                limit: ADD_TASKS_LIMIT,
                recTaskId: response?.data?.createRecurringTask?.task?.id,
              },
            });
            if (singleTasksResponse) {
              console.log("success");
              const availablePodsData = await findPublicPods({
                variables: {
                  cap: 4,
                  projectId: response?.data?.createRecurringTask?.task?.id,
                  taskType: response?.data?.createRecurringTask?.task?.taskType,
                  sessionType: "task",
                },
              });
              if (!podsLoading) {
                await joinPod(
                  4,
                  availablePodsData?.data,
                  response?.data?.createRecurringTask?.task?.id,
                  response?.data?.createRecurringTask?.task?.taskType,
                  createPod,
                  updateTaskPod,

                  addProjectToPod
                );
              }
            }
            if (
              response?.data?.createRecurringTask?.task?.user?.phone !=
              "+12173817277"
            ) {
              process.env.NODE_ENV === "production"
                ? sendMessage({
                    to: "+12173817277",
                    body: `${meData?.me?.username} has created a recurring task! Invite them to a pod then text/email them to join! 
                        Email: ${meData?.me?.email}, 
                        Phone: ${meData?.me?.phone}`,
                  })
                : null;
            }
            const taskPage =
              "/task/" + response?.data?.createRecurringTask?.task?.id;
            await router.push(taskPage);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Box mr={8} color={"gainsboro"}>
                <Flex
                  display={["block", "flex"]}
                  mb={4}
                  justifyContent={"space-between"}
                >
                  <Box>
                    <Font style={{ fontSize: "18px" }}>End goal</Font>
                    <Box maxW={"200px"}>
                      <InputField
                        color="grey"
                        name="taskName"
                        placeholder="e.g. Getting jacked!"
                        label=""
                      />
                    </Box>
                  </Box>
                  <Box mt={[4, 0]}>
                    <Font style={{ fontSize: "18px" }}>Task category</Font>
                    <Box maxW={"200px"}>
                      <TaskTypeSelection
                        name={"taskType"}
                        taskTypeSelector={taskTypeSelector}
                        setTaskTypeSelector={setTaskTypeSelector}
                      />
                    </Box>
                  </Box>
                </Flex>
                <Box>
                  <Font style={{ fontSize: "18px" }}>Action steps</Font>
                  <InputField
                    color="grey"
                    name="overview"
                    placeholder="e.g. I'm going to run a mile on Mondays, Wednesdays, and Fridays until the end of the summer"
                    label=""
                    isField={true}
                  />
                </Box>
                <Divider mx={"auto"} mt={4} color={"grey"} />

                <Box mt={4} maxW={"200px"}>
                  <Font style={{ fontSize: "18px" }}>Start date</Font>
                  <DatePickerInput
                    name={"startDate"}
                    label=""
                    showTimeSelect={false}
                    placeholder="Date"
                    regularPosition
                  />
                </Box>
                <Flex
                  display={{ sm: "block", md: "flex" }}
                  alignItems={"center"}
                  mt={4}
                >
                  <Box>
                    <Font style={{ fontSize: "18px" }}>End options</Font>
                    <EndTaskSelection
                      endOptionsSelector={endOptionsSelector}
                      name={"endOptions"}
                      setEndOptionsSelector={setEndOptionsSelector}
                    />
                  </Box>
                  <Box ml={{ sm: "none", md: "auto" }} mt={3} maxW="200px">
                    {endOptionsSelector === "date" ? (
                      <>
                        <DatePickerInput
                          name={"endOptions.date"}
                          label="End date"
                          showTimeSelect={false}
                          placeholder="date"
                          regularPosition
                        />
                      </>
                    ) : endOptionsSelector === "repetitions" ? (
                      <RepetitionStepper name={"endOptions.repetitions"} />
                    ) : (
                      <></>
                    )}
                  </Box>
                </Flex>
              </Box>
              <Box mt={6}>
                <Font style={{ fontSize: "18px", marginBottom: "10px" }}>
                  Select the days you would like your task to recur
                </Font>
                <DayPicker name={"days"} />
              </Box>
              <Button
                width={"100%"}
                height={"75px"}
                fontSize={"24px"}
                backgroundColor={"#FFDC93"}
                mx={"auto"}
                mt={8}
                type="submit"
                isLoading={isSubmitting ? true : false}
                cursor="pointer"
                colorScheme="gray.300"
                color="black"
                _hover={{ bg: "#ffecc4" }}
                onClick={() =>
                  Event(
                    "Desktop",
                    "RecurringTaskForm.tsx Button",
                    "Get Started!"
                  )
                }
              >
                Get started!
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RecurringTaskForm;
