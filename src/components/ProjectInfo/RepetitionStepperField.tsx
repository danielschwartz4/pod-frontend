import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React from "react";

interface RepetitionStepperProps {
  name: string;
}

const RepetitionStepper: React.FC<RepetitionStepperProps> = ({ name }) => {
  const [field, { error }] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <Box className={name} {...field}>
      <NumberInput
        onChange={(value) => setFieldValue(name, value)}
        id={name}
        mr={4}
        min={1}
        mt={8}
        defaultValue={0}
      >
        <NumberInputField textColor={"gainsboro"} />
        <NumberInputStepper>
          <NumberIncrementStepper mr={-12} />
          <NumberDecrementStepper mr={-12} />
        </NumberInputStepper>
      </NumberInput>
      <FormErrorMessage>{error}</FormErrorMessage>
    </Box>
  );
};

export default RepetitionStepper;
