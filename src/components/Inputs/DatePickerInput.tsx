import { FormLabel } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  showTimeSelect?: boolean;
  name?: string;
  placeholder?: string;
  label?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = (props) => {
  const [field, { error }] = useField(props.name);
  const { setFieldValue } = useFormikContext();

  return (
    <>
      {props.label != null ? (
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      ) : null}
      <DatePicker
        width={"fill-available"}
        className="date-picker"
        placeholderText={props.placeholder}
        {...field}
        {...props}
        autoComplete="off"
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
    </>
  );
};

export default DatePickerInput;
