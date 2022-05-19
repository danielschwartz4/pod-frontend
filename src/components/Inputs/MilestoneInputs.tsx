import { Box, Button, Flex } from "@chakra-ui/react";
import { ErrorMessage, FieldArray } from "formik";
import React, { useState } from "react";
import DatePickerInput from "./DatePickerInput";
import { InputField } from "./InputField";

interface milestoneInputsProps {
  values;
}

const MilestoneInputs: React.FC<milestoneInputsProps> = ({ values }) => {
  const maxNumMilestones = 9;

  const [numMilestones, setNumMilestones] = useState(1);

  return (
    <FieldArray name="milestone">
      {({ insert, remove, push }) => (
        <div>
          {values.milestone.length > 0 &&
            values.milestone.map((milestone, index) => (
              <Flex alignItems={"end"} mt={4} key={index}>
                <Box w={"300px"}>
                  <InputField
                    name={`milestone.${index}.description`}
                    placeholder={"milestone"}
                    label={"Milestone " + (index + 1)}
                    autoComplete="off"
                  />
                </Box>
                <Box ml={50}>
                  <DatePickerInput
                    name={`milestone.${index}.completionDate`}
                    label="Completion date"
                    showTimeSelect
                    placeholder="date"
                  />
                  <ErrorMessage
                    name={`milestone.${index}.completionDate`}
                    component="div"
                    className="field-error"
                  />
                </Box>
                <Box ml={50} mb={0.5}>
                  <Button
                    size={"sm"}
                    onClick={() => {
                      setNumMilestones(numMilestones - 1);
                      remove(index);
                    }}
                  >
                    -
                  </Button>
                </Box>
              </Flex>
            ))}
          <Box mt={2}>
            {numMilestones < maxNumMilestones ? (
              <Button
                onClick={() => {
                  if (numMilestones >= maxNumMilestones) {
                    return;
                  }
                  push({ description: "", completionDate: "" });
                  setNumMilestones(numMilestones + 1);
                }}
              >
                +
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </div>
      )}
    </FieldArray>
    // </div>
  );
};
export default MilestoneInputs;
