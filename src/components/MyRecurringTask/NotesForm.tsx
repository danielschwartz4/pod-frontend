import {
  Box,
  PopoverFooter,
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import {
  SingleTask,
  useUpdateSingleTaskNotesMutation,
} from "../../generated/graphql";
import { InputField } from "../Inputs/InputField";

interface NotesFormProps {
  singleTask: SingleTask;
  setCompletedNote;
}

const NotesForm: React.FC<NotesFormProps> = ({
  children,
  singleTask,
  setCompletedNote,
}) => {
  const [updateSingleTaskNotes] = useUpdateSingleTaskNotesMutation();

  // const handleChange = (e) => {
  //   console.log("LOGDED");
  //   setCompletedNote(e.target.values.notes != "");
  // };

  return (
    <Formik
      initialValues={{ notes: "" }}
      onSubmit={async ({ notes }) => {
        updateSingleTaskNotes({
          variables: {
            notes: notes,
            updateSingleTaskNotesId: singleTask?.id,
          },
        });
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Box mr={8}>
            <InputField
              maxLength={200}
              textColor={"black"}
              isField
              placeholder={
                singleTask?.notes
                  ? singleTask?.notes
                  : // !! Get random quote from randomQuotes.tsx
                    // !! https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373
                    "wow this sucked today... but I did it..."
              }
              label=""
              name="notes"
              // value={values.notes}

              onChange={setCompletedNote(values.notes != "")}
            />
          </Box>
          {children}
        </Form>
      )}
    </Formik>
  );
};

export default NotesForm;
