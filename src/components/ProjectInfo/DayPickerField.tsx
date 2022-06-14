import { Box, Flex, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { DaysType } from "../../types/types";

interface DayPickerProps {
  name: string;
}

const DayPicker: React.FC<DayPickerProps> = ({ name }) => {
  const [field, { error }] = useField(name);
  const { setFieldValue } = useFormikContext();

  const daysInit: DaysType = {
    0: { abr: "S", isSelected: false, duration: null },
    1: { abr: "M", isSelected: false, duration: null },
    2: { abr: "T", isSelected: false, duration: null },
    3: { abr: "W", isSelected: false, duration: null },
    4: { abr: "T", isSelected: false, duration: null },
    5: { abr: "F", isSelected: false, duration: null },
    6: { abr: "S", isSelected: false, duration: null },
  };

  const [days, setDays] = React.useState<DaysType>(daysInit);

  useEffect(() => {
    setFieldValue(name, days);
  }, [days]);

  return (
    <FormControl isInvalid={!!error}>
      <Flex className="days" {...field}>
        {Object.keys(days).map((key, index) => (
          <Box mx={[1, 2]} key={index} day={key}>
            <Circle day={key} days={days} setDays={setDays} />
          </Box>
        ))}
      </Flex>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

const Circle: React.FC<{
  setDays: React.Dispatch<React.SetStateAction<{}>>;
  day: string;
  days: {};
}> = ({ setDays, days, day }) => {
  return (
    <Box
      width={["36px", "48px"]}
      height={["36px", "48px"]}
      cursor={"pointer"}
      onClick={() => {
        const newDays = { ...days };
        newDays[day].isSelected = !newDays[day].isSelected;
        setDays(newDays);
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="12"
          fill={days[day].isSelected ? "#F6793D" : "#7e9cd6"}
          strokeWidth={"3"}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontFamily="auto"
          fontSize={12}
          strokeWidth="1px"
          fill="gainsboro"
          dy=".3em"
        >
          {days[day].abr}
        </text>
      </svg>
    </Box>
  );
};

const Mobile: React.FC<{ days: {}; day: string }> = ({ days, day }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="12"
        fill={days[day].isSelected ? "#F6793D" : "#7e9cd6"}
        strokeWidth={"3"}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fontFamily="auto"
        fontSize={12}
        strokeWidth="1px"
        fill="gainsboro"
        dy=".3em"
      >
        {days[day].abr}
      </text>
    </svg>
  );
};

export default DayPicker;
