import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, PopoverFooter } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  SingleTask,
  useUpdateSingleTaskNotesMutation,
} from "../../generated/graphql";
import { InputField } from "../Inputs/InputField";

interface NotesFormProps {
  singleTask: SingleTask;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupHandler;
}

const NotesForm: React.FC<NotesFormProps> = ({
  singleTask,
  setShowAlert,
  setPopupHandler,
}) => {
  const [updateSingleTaskNotes] = useUpdateSingleTaskNotesMutation();
  const setAlertHandler = () => {
    setShowAlert(true);
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
      {({ isSubmitting }) => (
        <Form>
          <Box mr={8}>
            <InputField
              maxLength={200}
              textColor={"black"}
              isField
              placeholder="wow this sucked today... but I did it"
              label=""
              name="notes"
            />
          </Box>
          <PopoverFooter d="flex" justifyContent="center">
            <ButtonGroup size="sm">
              <Button
                onClick={() => {
                  setPopupHandler();
                }}
                type="submit"
                background="#F26D51"
                cursor="pointer"
              >
                Did not complete
              </Button>
              <Button
                onClick={() => {
                  setPopupHandler();
                  // props.setShowAlert(true);
                }}
                type="submit"
                background="#3EE76D"
                cursor={"pointer"}
              >
                Completed!
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </Form>
      )}
    </Formik>
  );
};

export default NotesForm;
