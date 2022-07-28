import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React, { useState } from "react";
import { ADD_TASKS_LIMIT } from "../../constants";
import {
  FindPublicPodQuery,
  MeQuery,
  PodQuery,
  useAddProjectToPodMutation,
  useAddSingleTaskMutation,
  useAddSingleTasksChunkMutation,
  useCreatePodMutation,
  useCreateRecurringTaskMutation,
  useFindPublicPodLazyQuery,
  useUpdateTaskPodMutation,
} from "../../generated/graphql";
import { DaysType, EndOptionsSelectorType } from "../../types/types";
import { sendMessage } from "../../utils/messaging/sendMessage";
import { toErrorMap } from "../../utils/toErrorMap";
import DatePickerInput from "../Inputs/DatePickerInput";
import { InputField } from "../Inputs/InputField";
import DayPicker from "./DayPickerField";
import EndTaskSelection from "./EndTaskSelection";
import RepetitionStepper from "./RepetitionStepperField";
import { Event } from "../../libs/tracking";
import { joinPod } from "../MyTaskPod/JoinExit";
import { Font } from "../../css/styles";

interface RecurringTaskProps {
  meData: MeQuery;
}

const RecurringTaskForm: React.FC<RecurringTaskProps> = ({ meData }) => {
  const [endOptionsSelector, setEndOptionsSelector] =
    React.useState<EndOptionsSelectorType>("none");
  const [createRecurringTask] = useCreateRecurringTaskMutation();
  const [addSingleTask] = useAddSingleTaskMutation();
  const [addSingleTasksChunk] = useAddSingleTasksChunkMutation();
  const [findPublicPods, { data, loading: podsLoading }] =
    useFindPublicPodLazyQuery();
  const [createPod] = useCreatePodMutation();
  const [addProjectToPod] = useAddProjectToPodMutation();
  const [updateTaskPod] = useUpdateTaskPodMutation();

  return (
    <Box paddingTop={0}>
      <Heading fontSize={20} color={"gainsboro"}>
        Tell us what you'd like to stay consistent with!
      </Heading>
      <Formik
        initialValues={{
          overview: "",
          projectName: "",
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
          { overview, projectName, startDate, endOptions, days },
          { setErrors }
        ) => {
          const response = await createRecurringTask({
            variables: {
              recurringTaskOptions: {
                userId: meData?.me.id,
                overview: overview,
                projectName: projectName,
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
                  sessionType: "task",
                },
              });
              if (!podsLoading) {
                await joinPod(
                  4,
                  availablePodsData?.data,
                  response?.data?.createRecurringTask?.task?.id,
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
            const project_pod_page =
              "/task/" + response?.data?.createRecurringTask?.task?.id;
            await router.push(
              "/task/" + response?.data?.createRecurringTask?.task?.id
            );
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Box mr={8} color={"gainsboro"}>
                <Font style={{ fontSize: "18px" }}>Overview</Font>
                <InputField
                  color="grey"
                  name="overview"
                  placeholder="Enter a brief overview of your project for your pod members"
                  label=""
                  isField={true}
                />
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
