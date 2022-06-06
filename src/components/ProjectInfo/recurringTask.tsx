import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import {
  MeQuery,
  useCreateRecurringTaskMutation,
} from "../../generated/graphql";
import { EndOptionsSelectorType } from "../../types";
import DatePickerInput from "../Inputs/DatePickerInput";
import { InputField } from "../Inputs/InputField";
import DayPicker from "./DayPicker";
import EndTaskSelection from "./EndTaskSelection";
import { toErrorMap } from "../../utils/toErrorMap";
import RepetitionStepper from "./RepetitionStepper";

interface RecurringTaskProps {
  meData: MeQuery;
}

const RecurringTask: React.FC<RecurringTaskProps> = ({ meData }) => {
  const [endOptionsSelector, setEndOptionsSelector] =
    React.useState<EndOptionsSelectorType>("none");
  const [createRecurringTask] = useCreateRecurringTaskMutation();

  return (
    <Box>
      <Heading fontSize={24} color={"gainsboro"}>
        Tell us what you'd like to stay consistent with!
      </Heading>

      <Formik
        initialValues={{
          overview: "",
          projectName: "",
          startDate: null,
          endOptions: { date: null, repetitions: null, neverEnds: null },
          endDate: null,
          days:
            // [
            {
              sunday: { isSelected: false, duration: null },
              monday: { isSelected: false, duration: null },
              tuesday: { isSelected: false, duration: null },
              wednesday: { isSelected: false, duration: null },
              thursday: { isSelected: false, duration: null },
              friday: { isSelected: false, duration: null },
              saturday: { isSelected: false, duration: null },
            },
          // ],
        }}
        onSubmit={async (
          { overview, projectName, startDate, endOptions, days, endDate },
          { setErrors }
        ) => {
          console.log(endOptions);
          // const response = await createRecurringTask({
          //   variables: {
          //     recurringTaskOptions: {
          //       userId: meData?.me.id,
          //       overview: overview,
          //       projectName: projectName,
          //       startDate: startDate,
          //       endOptions: endOptions,
          //       days: {...days},
          //     },
          //   },
          // });
          // if (response.data?.login.errors) {
          //   setErrors(toErrorMap(response.data.login.errors));
          // }
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
                <Divider mx={"auto"} mt={4} color={"grey"} />

                <Box mt={4} maxW={"200px"}>
                  <DatePickerInput
                    name={"startDate"}
                    label="Start date"
                    showTimeSelect={false}
                    placeholder="date"
                    regularPosition
                  />
                  <ErrorMessage
                    name={"startDate"}
                    component="div"
                    className="field-error"
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
                      setEndOptionsSelector={setEndOptionsSelector}
                    />
                  </Box>
                  <Box ml={{ sm: "none", md: "auto" }} mt={4} maxW="200px">
                    {endOptionsSelector === "date" ? (
                      <>
                        <DatePickerInput
                          name={"endOptions.endDate"}
                          label="End date"
                          showTimeSelect={false}
                          placeholder="date"
                          regularPosition
                        />
                        <ErrorMessage
                          name={"endDate"}
                          component="div"
                          className="field-error"
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
              <Flex mt={6}>
                <Box>
                  <Text color={"gainsboro"}>
                    Select the days you would like your task to recurr
                  </Text>
                  <DayPicker name={"days"} />
                </Box>
              </Flex>
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
      </Formik>
    </Box>
  );
};

export default RecurringTask;
