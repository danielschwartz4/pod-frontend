import { Box, FormErrorMessage, Select } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { EndOptionsSelectorType } from "../../types";

interface EndTaskSelectionProps {
  setEndOptionsSelector: React.Dispatch<
    React.SetStateAction<EndOptionsSelectorType>
  >;
  name: string;
  endOptionsSelector: EndOptionsSelectorType;
}

const EndTaskSelection: React.FC<EndTaskSelectionProps> = ({
  name,
  setEndOptionsSelector,
  endOptionsSelector,
}) => {
  const [field, { error }] = useField(name);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    // Accounts for the never field
    let val = { date: null, repetitions: null, neverEnds: null };
    if (endOptionsSelector === "never") {
      val.neverEnds = true;
    }
    setFieldValue(name, val);
  }, [endOptionsSelector]);

  return (
    <Box width={"250px"} color={"gainsboro"}>
      <Select
        {...field}
        color={"gainsboro"}
        label="End Task"
        textColor={"gainsboro"}
        cursor={"pointer"}
        name="dropdown"
        placeholder={
          endOptionsSelector == "none" ? "End this task..." : endOptionsSelector
        }
        onChange={(e) => {
          setEndOptionsSelector(e.target.value as EndOptionsSelectorType);
        }}
      >
        <option value="date">After a certain date </option>
        <option value="repetitions">
          After a number of successful repetitions
        </option>
        <option value="never">Never</option>
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </Box>
  );
};

export default EndTaskSelection;
