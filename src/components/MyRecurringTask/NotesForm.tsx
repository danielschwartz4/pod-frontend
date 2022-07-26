import {
  Box,
  PopoverFooter,
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { FormEvent, useEffect, useState } from "react";
import {
  SingleTask,
  useUpdateSingleTaskNotesMutation,
} from "../../generated/graphql";
import { InputField } from "../Inputs/InputField";

interface NotesFormProps {
  singleTask: SingleTask;
<<<<<<< HEAD
  setCompletedNote: boolean;
=======
  setCompletedNote: React.Dispatch<React.SetStateAction<boolean>>;
>>>>>>> user/kevin
}

const NotesForm: React.FC<NotesFormProps> = ({
  children,
  singleTask,
  setCompletedNote,
}) => {
  const [updateSingleTaskNotes] = useUpdateSingleTaskNotesMutation();
  const handleOnChange = (event: FormEvent) => {
    console.log("Form::onChange", event);
    setCompletedNote(event.target["value"] != "");
  };

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
        <Form onChange={handleOnChange}>
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
            />
          </Box>
          {children}
        </Form>
      )}
    </Formik>
  );
};

export default NotesForm;
