import { FormLabel } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import { type } from "os";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  showTimeSelect?: boolean;
  name?: string;
  label?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = (
  props
  // showTimeSelect = false,
  // name,
  // label,
) => {
  const [startDate, setStartDate] = useState(new Date());
  const [field, { error }] = useField(props.name);
  const { setFieldValue } = useFormikContext();

  return (
    <>
      {props.label != null ? (
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      ) : null}
      <DatePicker
        className="date-picker"
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
