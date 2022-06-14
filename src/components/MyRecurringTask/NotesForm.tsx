import { Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../Inputs/InputField";

interface NotesFormProps {}

const NotesForm: React.FC<NotesFormProps> = ({}) => {
  return (
    <Formik
      initialValues={{ notes: "" }}
      onSubmit={() => {
        console.log("submitted");
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box mr={8}>
            <InputField
              textColor={"black"}
              isField
              placeholder="wow this sucked today... but I did it"
              label=""
              name="notes"
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default NotesForm;
