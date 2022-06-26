import { Box, Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Section from "./Section";

interface MessagingProps {}
const Messaging: React.FC<MessagingProps> = ({}) => {
  return (
    <Section>
      <Box mt={-4}>
        <Text fontSize={24} textColor={"gray.500"}>
          <b>MESSAGING (not functional, coming soon)</b>
        </Text>
      </Box>
      <Flex p={2} justify={"space-between"}>
        <Box>
          <CheckBoxes parent="Email" />
        </Box>
        <Box>
          <CheckBoxes parent="Sms" />
        </Box>
      </Flex>
    </Section>
  );
};

interface CheckBoxesProps {
  parent: string;
}

const CheckBoxes: React.FC<CheckBoxesProps> = ({ parent }) => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
      >
        {parent}
      </Checkbox>
      <Stack pl={6} mt={4} spacing={4}>
        <Checkbox
          isChecked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          Pod members' milestone completion
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          Milestone approaching
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          Website progress updates
        </Checkbox>
      </Stack>
    </>
  );
};

export default Messaging;
