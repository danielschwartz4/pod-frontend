import { Box, Select } from "@chakra-ui/react";
import React from "react";
import { EndOptionsSelector } from "../../types";

interface EndTaskSelectionProps {
  setEndOptionsSelector: React.Dispatch<
    React.SetStateAction<EndOptionsSelector>
  >;
}

const EndTaskSelection: React.FC<EndTaskSelectionProps> = ({
  setEndOptionsSelector,
}) => {
  return (
    <Box width={"300px"} color={"gainsboro"}>
      <Select
        color={"gainsboro"}
        label="End Task"
        textColor={"gainsboro"}
        cursor={"pointer"}
        name="dropdown"
        placeholder="End this task..."
        onChange={(e) => {
          setEndOptionsSelector(e.target.value as EndOptionsSelector);
        }}
      >
        <option value="date">After a certain date </option>
        <option value="repetitions">
          After a number of successful repetitions
        </option>
        <option value="never">Never</option>
      </Select>
    </Box>
  );
};

export default EndTaskSelection;
