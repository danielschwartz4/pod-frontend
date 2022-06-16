import { Button, ButtonGroup, PopoverFooter } from "@chakra-ui/react";
import React from "react";
import {
  SingleTask,
  useUpdateSingleTaskCompletionStatusMutation,
} from "../../generated/graphql";
import { beforeToday, daysEqual } from "../../utils/getConsistency";
import NotesForm from "./NotesForm";

interface TodayUpdateFormProps {
  singleTask: SingleTask;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupHandler: () => void;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  completedCount: {};
  setCompletedCount: React.Dispatch<React.SetStateAction<{}>>;
  rangeStart: Date;
}

const TodayUpdateForm: React.FC<TodayUpdateFormProps> = ({
  singleTask,
  setShowAlert,
  setPopupHandler,
  setColor,
  completedCount,
  setCompletedCount,
  rangeStart,
}) => {
  const [updateSingleTaskCompletionStatus] =
    useUpdateSingleTaskCompletionStatusMutation();

  const setCompletedCountHandler = (isAdding: boolean) => {
    const tmpDate = new Date(singleTask?.actionDate);
    if (isAdding) {
      if (!beforeToday(tmpDate, rangeStart)) {
        setCompletedCount({
          0: completedCount[0] + 1,
          3: completedCount[3] + 1,
        });
      } else {
        setCompletedCount({
          0: completedCount[0] + 1,
          3: completedCount[3],
        });
      }
    } else {
      if (!beforeToday(tmpDate, rangeStart)) {
        setCompletedCount({
          0: completedCount[0] - 1,
          3: completedCount[3] - 1,
        });
      } else {
        setCompletedCount({
          0: completedCount[0] - 1,
          3: completedCount[3],
        });
      }
    }
  };

  return (
    <NotesForm singleTask={singleTask}>
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
                if (singleTask?.status != "overdue") {
                  setCompletedCountHandler(false);
                }
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
    </NotesForm>
  );
};

export default TodayUpdateForm;
