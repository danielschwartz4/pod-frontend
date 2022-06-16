import { Box, Button, ButtonGroup, PopoverFooter } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  SingleTask,
  useUpdateSingleTaskCompletionStatusMutation,
  useUpdateSingleTaskNotesMutation,
} from "../../generated/graphql";
import { InputField } from "../Inputs/InputField";

interface NotesFormProps {
  singleTask: SingleTask;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupHandler: () => void;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  completedCount: number;
  setCompletedCount: React.Dispatch<React.SetStateAction<number>>;
}

const NotesForm: React.FC<NotesFormProps> = ({
  singleTask,
  setShowAlert,
  setPopupHandler,
  setColor,
  completedCount,
  setCompletedCount,
}) => {
  const [updateSingleTaskNotes] = useUpdateSingleTaskNotesMutation();
  const [updateSingleTaskCompletionStatus] =
    useUpdateSingleTaskCompletionStatusMutation();
  const setCompletedCountHandler = (isAdding: boolean) => {
    if (isAdding) {
      setCompletedCount(completedCount + 1);
    } else {
      setCompletedCount(completedCount - 1);
    }
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
                  const response = updateSingleTaskCompletionStatus({
                    variables: {
                      status: "missed",
                      updateSingleTaskCompletionStatusId: singleTask?.id,
                    },
                  });
                  if (response) {
                    setColor("#F26D51");
                    setCompletedCountHandler(false);
                  }
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
                  const response = updateSingleTaskCompletionStatus({
                    variables: {
                      status: "completed",
                      updateSingleTaskCompletionStatusId: singleTask?.id,
                    },
                  });
                  if (response) {
                    setColor("#3EE76D");
                    setCompletedCountHandler(true);
                  }
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
