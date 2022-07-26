import { Box, PopoverFooter, ButtonGroup, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import {
  SingleTask,
  useUpdateSingleTaskNotesMutation,
} from "../../generated/graphql";
import { InputField } from "../Inputs/InputField";

interface NotesFormProps {
  singleTask: SingleTask;
  setCompletedNote: boolean;
}

const NotesForm: React.FC<NotesFormProps> = ({ children, singleTask }) => {
  const [updateSingleTaskNotes] = useUpdateSingleTaskNotesMutation();

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
      {({ isSubmitting }) => (
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
            />
          </Box>
          {children}
        </Form>
      )}
    </Formik>
  );
};

export default NotesForm;
