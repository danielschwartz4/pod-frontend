import { Box, Button, Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Section from "./Section";

interface MessagingProps {}
const Messaging: React.FC<MessagingProps> = ({}) => {
  const [checkedItems, setCheckedItems] = React.useState({
    email: [false, false, false],
    phone: [false, false, false],
  });

  return (
    <Section>
      <Box mt={-4}>
        <Text fontSize={24} textColor={"gray.500"}>
          <b>MESSAGING (not functional, coming soon)</b>
        </Text>
      </Box>
      <Flex p={2} justify={"space-between"}>
        <Box>
          <CheckBoxes
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            parent="email"
          />
        </Box>
        <Box>
          <CheckBoxes
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            parent="phone"
          />
        </Box>
      </Flex>
      <Button
        mt={4}
        w={"150px"}
        textColor={"gainsboro"}
        bg={"gray.600"}
        cursor={"pointer"}
      >
        <Text>save</Text>
      </Button>
    </Section>
  );
};

interface CheckBoxesProps {
  parent: string;
  checkedItems: { [key: string]: boolean[] };
  setCheckedItems: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean[] }>
  >;
}

const CheckBoxes: React.FC<CheckBoxesProps> = ({
  parent,
  checkedItems,
  setCheckedItems,
}) => {
  // const [checkedItems, setCheckedItems] = React.useState([false, false, false]);

  const allChecked = checkedItems[parent].every(Boolean);
  const isIndeterminate = checkedItems[parent].some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) =>
          setCheckedItems({
            email: [e.target.checked, e.target.checked, e.target.checked],
            phone: [e.target.checked, e.target.checked, e.target.checked],
          })
        }
      >
        {parent}
      </Checkbox>
      <Stack pl={6} mt={4} spacing={4}>
        <Checkbox
          isChecked={checkedItems[parent][0]}
          onChange={(e) =>
            setCheckedItems({
              email: [
                e.target.checked,
                checkedItems[parent][1],
                checkedItems[parent][2],
              ],
              phone: [
                e.target.checked,
                checkedItems[parent][1],
                checkedItems[parent][2],
              ],
            })
          }
        >
          Pod members' milestone completion
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[parent][1]}
          onChange={(e) =>
            setCheckedItems({
              email: [
                checkedItems[parent][0],
                e.target.checked,
                checkedItems[parent][2],
              ],
              phone: [
                checkedItems[parent][0],
                e.target.checked,
                checkedItems[parent][2],
              ],
            })
          }
        >
          Milestone approaching
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[parent][2]}
          onChange={(e) =>
            setCheckedItems({
              email: [
                checkedItems[parent][0],
                checkedItems[parent][1],
                e.target.checked,
              ],
              phone: [
                checkedItems[parent][0],
                checkedItems[parent][1],
                e.target.checked,
              ],
            })
          }
        >
          Website updates
        </Checkbox>
      </Stack>
    </>
  );
};

export default Messaging;
