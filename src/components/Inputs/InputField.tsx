import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder: string;
  isField?: boolean;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      {!props.isField ? (
        <Input
          autoComplete={props.autoComplete}
          {...field}
          id={field.name}
          placeholder={props.placeholder}
        />
      ) : (
        <Textarea {...field} id={field.name} placeholder={props.placeholder} />
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
