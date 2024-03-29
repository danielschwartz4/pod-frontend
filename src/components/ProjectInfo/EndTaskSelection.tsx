import { Box, FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { EndOptionsSelectorType } from "../../types/types";

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
    <Box width={"240px"} color={"gainsboro"}>
      <FormControl isInvalid={!!error}>
        <Select
          {...field}
          height={"44px"}
          textColor={endOptionsSelector == "none" ? "grey" : "gainsboro"}
          label="End Task"
          borderColor={"gainsboro"}
          cursor={"pointer"}
          name="dropdown"
          placeholder={"End this task..."}
          value={endOptionsSelector}
          onChange={(e) => {
            setEndOptionsSelector(e.target.value as EndOptionsSelectorType);
          }}
        >
          <option style={{ color: "black" }} value="date">
            After a certain date{" "}
          </option>
          <option style={{ color: "black" }} value="repetitions">
            After a number of successful weeks
          </option>
          <option style={{ color: "black" }} value="never">
            Never
          </option>
        </Select>
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default EndTaskSelection;
