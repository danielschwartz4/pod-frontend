import {
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React from "react";

interface PhoneNumberProps {
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}

export const PhoneNumber: React.FC<PhoneNumberProps> = (props) => {
  return (
    <InputGroup w={"250px"} ml={2} mr={12}>
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
  );
};
