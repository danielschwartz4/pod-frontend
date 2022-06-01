import {
  Box,
  Flex,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface PhoneNumberProps {
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}

export const PhoneNumber: React.FC<PhoneNumberProps> = (props) => {
  return (
    <Flex flexDirection={"column"}>
      <Text mr={"auto"} ml={2} mb="8px" fontSize={14} color={"gray.500"}>
        Optional phone number to receive pod updates
      </Text>
      <InputGroup w={"250px"} ml={2} mt={"auto"} mr={12}>
        <InputLeftAddon children="+1" />
        <NumberInput>
          <NumberInputField
            textColor={"gainsboro"}
            onChange={(event) => {
              props.setPhone("+1" + event.target.value);
            }}
            placeholder="phone number"
          />
        </NumberInput>
      </InputGroup>
    </Flex>
  );
};
