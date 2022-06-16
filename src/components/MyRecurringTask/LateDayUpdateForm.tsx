import { CheckIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { SingleTask } from "../../generated/graphql";
import NotesForm from "./NotesForm";

interface LateDayUpdateFormProps {
  singleTask: SingleTask;
  setPopupHandler: () => void;
}

const LateDayUpdateForm: React.FC<LateDayUpdateFormProps> = ({
  singleTask,
  setPopupHandler,
}) => {
  return (
    <NotesForm singleTask={singleTask}>
      <Button
        mt={1}
        type="submit"
        w={"100%"}
        cursor={"pointer"}
        onClick={() => {
          setPopupHandler();
        }}
      >
        <CheckIcon />
      </Button>
    </NotesForm>
  );
};

export default LateDayUpdateForm;
