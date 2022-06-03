import { PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";
import { getCountryTelCode } from "./countries";

interface PhoneNumberProps {
  size?: string;
  country: string;
  options: any;
  placeholder: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}

export const PhoneNumber: React.FC<PhoneNumberProps> = ({
  size,
  country,
  options,
  placeholder,
  setPhone,
  ...rest
}) => {
  let [selectedCountry, setSelectedCountry] = useState(country || "");
  let [countryCode, setCountryCode] = useState(
    getCountryTelCode(country) || ""
  );
  useEffect(() => {
    setSelectedCountry(country);
    setCountryCode(getCountryTelCode(country));
  }, [country]);

  const onCountryChange = (e) => {
    let value = e.target.value;
    let code = getCountryTelCode(value);
    setCountryCode(code);
    setSelectedCountry(value);
  };

  return (
    <Flex flexDirection={"column"}>
      <Text mr={"auto"} ml={2} mb="8px" fontSize={14} color={"gray.500"}>
        Optional phone number to receive pod updates
      </Text>
      <InputGroup w={"250px"} ml={2} mt={"auto"} mr={12}>
        <InputLeftAddon width="4rem">
          <Select
            zIndex={1}
            opacity={0}
            width="90px"
            position="absolute"
            value={selectedCountry}
            onChange={onCountryChange}
          >
            <option value="" />
            {options.map((option, id: number) => (
              <option key={id} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Flex pl={2} width="100%" alignItems="center">
            {selectedCountry ? (
              <Box mr="4px" width="80%">
                <Flag code={selectedCountry || ""} />
              </Box>
            ) : (
              <PhoneIcon />
            )}
          </Flex>
        </InputLeftAddon>
        {/* <InputLeftAddon children="+1" /> */}
        <NumberInput>
          <NumberInputField
            textColor={"gainsboro"}
            onChange={(event) => {
              if (countryCode == undefined) {
                setPhone(`+1${event.target.value}`);
              } else {
                setPhone(`${countryCode}${event.target.value}`);
              }
            }}
            placeholder="phone number"
          />
        </NumberInput>
      </InputGroup>
    </Flex>
  );
};
