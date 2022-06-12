import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import {
  MeQuery,
  useCreateRecurringTaskMutation,
} from "../../generated/graphql";
import { DaysType, EndOptionsSelectorType } from "../../types";
import { toErrorMap } from "../../utils/toErrorMap";
import DatePickerInput from "../Inputs/DatePickerInput";
import { InputField } from "../Inputs/InputField";
import DayPicker from "./DayPickerField";
import EndTaskSelection from "./EndTaskSelection";
import RepetitionStepper from "./RepetitionStepperField";

// !! Don't think I need this file

interface RecurringTaskProps {
  meData: MeQuery;
}

const RecurringTask: React.FC<RecurringTaskProps> = ({ meData }) => {
  const [endOptionsSelector, setEndOptionsSelector] =
    React.useState<EndOptionsSelectorType>("none");
  const [createRecurringTask] = useCreateRecurringTaskMutation();

  return (
    <Box>
      {/* <Heading fontSize={24} color={"gainsboro"}>
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
            router.push("/profile");
          }
        }}
      >
        {({ isSubmitting }) => (
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
                <Divider mx={"auto"} mt={4} color={"grey"} />

                <Box mt={4} maxW={"200px"}>
                  <DatePickerInput
                    name={"startDate"}
                    label="Start date"
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
                    <Text mb={2} color={"gainsboro"}>
                      End options
                    </Text>

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
                <Text color={"gainsboro"}>
                  Select the days you would like your task to recurr
                </Text>
                <DayPicker name={"days"} />
              </Box>
              <Button
                mx={"auto"}
                mt={8}
                type="submit"
                isloading={isSubmitting ? "true" : "false"}
                cursor="pointer"
                colorScheme="gray.300"
              >
                Get started!
              </Button>
            </Box>
          </Form>
        )}
      </Formik> */}
    </Box>
  );
};

export default RecurringTask;
