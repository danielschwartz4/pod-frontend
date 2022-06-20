import { Button, ButtonGroup, PopoverFooter, useToast } from "@chakra-ui/react";
import React from "react";
import {
  RecurringTaskQuery,
  SingleTask,
  useUpdateCompletedCountMutation,
  useUpdateSingleTaskCompletionStatusMutation,
} from "../../generated/graphql";
import { CompletedCount } from "../../types/types";
import { beforeToday, daysEqual } from "../../utils/getConsistency";
import NotesForm from "./NotesForm";

interface TodayUpdateFormProps {
  singleTask: SingleTask;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupHandler: () => void;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  completedCount: CompletedCount;
  setCompletedCount: React.Dispatch<React.SetStateAction<CompletedCount>>;
  rangeStart: Date;
  task: RecurringTaskQuery;
  _status: string;
}

const TodayUpdateForm: React.FC<TodayUpdateFormProps> = ({
  singleTask,
  setShowAlert,
  setPopupHandler,
  setStatus,
  _status,
  completedCount,
  setCompletedCount,
  rangeStart,
  task,
}) => {
  const [updateSingleTaskCompletionStatus] =
    useUpdateSingleTaskCompletionStatusMutation();
  const [updateCompletedCount] = useUpdateCompletedCountMutation();

  const toast = useToast();

  const setCompletedCountHandler = (isAdding: boolean) => {
    console.log("in");
    const tmpDate = new Date(singleTask?.actionDate);
    let c: CompletedCount;
    if (isAdding) {
      if (!beforeToday(tmpDate, rangeStart)) {
        c = {
          allTime: completedCount["allTime"] + 1,
          week: completedCount["week"] + 1,
        };
      } else {
        c = {
          allTime: completedCount["allTime"] + 1,
          week: completedCount["week"],
        };
      }
    } else {
      if (!beforeToday(tmpDate, rangeStart)) {
        c = {
          allTime: completedCount["allTime"] - 1,
          week: completedCount["week"] - 1,
        };
      } else {
        c = {
          allTime: completedCount["allTime"] - 1,
          week: completedCount["week"],
        };
      }
    }
    setCompletedCount(c);
    updateCompletedCount({
      variables: {
        completedCount: {
          allTime: c["allTime"],
          week: c["week"],
        },
        updateCompletedCountId: task?.recurringTask?.task?.id,
      },
    });
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
                // setColor("#F26D51");
                setStatus("missed");
                console.log(completedCount);
                if (
                  // singleTask?.status != "overdue" &&
                  _status != "missed"
                ) {
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
                setStatus("completed");
                if (_status != "completed") {
                  setCompletedCountHandler(true);
                }
              }
              if (_status != "completed") {
                toast({
                  title: "Congrats!",
                  description: "Your pod has been alerted!.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              }
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
