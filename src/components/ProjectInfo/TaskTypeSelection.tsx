import { Box, FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React, { useEffect } from "react";
import {
  EndOptionsSelectorType,
  TaskTypeSelectorType,
} from "../../types/types";

interface TaskTypeSelectionProps {
  name: string;
  taskTypeSelector: TaskTypeSelectorType;
  setTaskTypeSelector: React.Dispatch<
    React.SetStateAction<TaskTypeSelectorType>
  >;
}

const TaskTypeSelection: React.FC<TaskTypeSelectionProps> = ({
  name,
  taskTypeSelector,
  setTaskTypeSelector,
}) => {
  const [field, { error }] = useField(name);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    // Accounts for the never field
    let val = taskTypeSelector;
    setFieldValue(name, val);
  }, [taskTypeSelector]);

  return (
    <Box width={"240px"} color={"gainsboro"}>
      <FormControl isInvalid={!!error}>
        <Select
          {...field}
          label="End Task"
          height={"44px"}
          borderColor={"gainsboro"}
          textColor={"gainsboro"}
          cursor={"pointer"}
          name="dropdown"
          value={taskTypeSelector}
          onChange={(e) => {
            setTaskTypeSelector(e.target.value as TaskTypeSelectorType);
          }}
        >
          <option style={{ color: "black" }} value="exercise">
            Exercising
          </option>
          <option style={{ color: "black" }} value="study">
            Studying
          </option>
          <option style={{ color: "black" }} value="other">
            Other
          </option>
        </Select>
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default TaskTypeSelection;
