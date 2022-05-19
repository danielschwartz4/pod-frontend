import { Box, FormLabel } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  showTimeSelect?: boolean;
  name?: string;
  placeholder?: string;
  label?: string;
  regularPosition?: boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  showTimeSelect,
  name,
  placeholder,
  label,
  regularPosition = true,
}) => {
  const [field, { error }] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <>
      {label != null ? (
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
      ) : null}
      <Box>
        <DatePicker
          // width={"fill-available"}
          className="date-picker"
          placeholderText={placeholder}
          {...field}
          showTimeSelect={showTimeSelect}
          autoComplete="off"
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
          dateFormat="MMMM d, yyyy h:mm aa"
          popperPlacement={!regularPosition ? "top-end" : "top-start"}
          popperModifiers={[
            {
              name: "offset",
              options: {
                offset: !regularPosition ? [100, -100] : [0, 0],
              },
            },
          ]}
        />
      </Box>
    </>
  );
};

export default DatePickerInput;
