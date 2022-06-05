import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { Formik, Form, ErrorMessage } from "formik";
import router from "next/router";
import React from "react";
import { EndOptions, EndOptionsSelector } from "../../types";
import { objectToArray } from "../../utils/objectToArray";
import DatePickerInput from "../Inputs/DatePickerInput";
import { InputField } from "../Inputs/InputField";
import MilestoneInputs from "../Inputs/MilestoneInputs";
import EndTaskSelection from "./EndTaskSelection";

interface RecurringTaskProps {}

const RecurringTask: React.FC<RecurringTaskProps> = ({}) => {
  const [endOptionsSelector, setEndOptionsSelector] =
    React.useState<EndOptionsSelector>("none");

  console.log(endOptionsSelector);

  return (
    <Box>
      <Heading fontSize={24} color={"gainsboro"}>
        Tell us what you'd like to stay consistent with!
      </Heading>
      <Text color={"grey"}>
        * you can edit your task as much as you'd like later *
      </Text>
      <Formik
        initialValues={{
          overview: "",
          projectName: "",
          startDate: null,
          endOptions: { date: null, repetitions: null, neverEnds: true },
          days: [
            {
              monday: { isSelected: false, duration: null },
              tuesday: { isSelected: false, duration: null },
              wednesday: { isSelected: false, duration: null },
              thursday: { isSelected: false, duration: null },
              friday: { isSelected: false, duration: null },
              saturday: { isSelected: false, duration: null },
              sunday: { isSelected: false, duration: null },
            },
          ],
        }}
        onSubmit={async ({ overview }, { setErrors }) => {
          console.log("submitted");
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Box>
              <Box mr={8} color={"gainsboro"}>
                <Box>
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
                  <Box mt={4} maxW={"200px"}>
                    {/* <DatePickerInput
                      name={"endDate"}
                      label="End date"
                      showTimeSelect={false}
                      placeholder="date"
                      regularPosition
                    />
                    <ErrorMessage
                      name={"endDate"}
                      component="div"
                      className="field-error"
                    /> */}
                    <Text mb={2} color={"gainsboro"}>
                      End options
                    </Text>

                    <EndTaskSelection
                      setEndOptionsSelector={setEndOptionsSelector}
                    />
                    {endOptionsSelector === "date" ? (
                      <>
                        <DatePickerInput
                          name={"endDate"}
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
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RecurringTask;
