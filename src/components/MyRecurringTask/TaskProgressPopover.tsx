import {
  Box,
  Divider,
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { TODAY } from "../../constants";
import { Font } from "../../css/styles";
import { RecurringTaskQuery, SingleTask } from "../../generated/graphql";
import { CompletedCount } from "../../types/types";
import { beforeToday, daysEqual } from "../../utils/getConsistency";
import LateDayUpdateForm from "./LateDayUpdateForm";
import TodayUpdateForm from "./TodayUpdateForm";

interface TaskProgressPopoverProps {
  close: () => void;
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  singleTask: SingleTask;
  setPopupHandler: () => void;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  _status: string;
  completedCount: CompletedCount;
  setCompletedCount: React.Dispatch<React.SetStateAction<CompletedCount>>;
  rangeStart: Date;
  task: RecurringTaskQuery;
  reward;
}

const TaskProgressPopover: React.FC<TaskProgressPopoverProps> = (props) => {
  const tmpDate = new Date(props.singleTask?.actionDate);
  const daysAreEqual = daysEqual(tmpDate, TODAY);
  const isBefore = beforeToday(tmpDate, TODAY);
  const [completedNote, setCompletedNote] = useState(false);

  return (
    <>
      <Popover
        isLazy
        returnFocusOnClose={false}
        isOpen={props.isOpen}
        onClose={props.close}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>{props.children}</PopoverTrigger>
        <PopoverContent p={2} backgroundColor={"white"}>
          {daysAreEqual ? (
            <div>
              <Font
                style={{
                  fontWeight: "bold",
                  color: "black",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                Your notes
              </Font>
              {completedNote ? (
                <br />
              ) : (
                <Font
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontSize: "12px",
                  }}
                >
                  Please take 1 minute to answer today’s question below
                </Font>
              )}
            </div>
          ) : isBefore && props.singleTask?.status == "overdue" ? (
            <PopoverHeader fontWeight="semibold">
              Looks like you forgot to fill this out!
            </PopoverHeader>
          ) : (
            <PopoverHeader fontWeight="semibold">Your notes</PopoverHeader>
          )}
          <PopoverCloseButton cursor={"pointer"} />
          <PopoverBody mt={0} padding={"0px 10px 0px 10px"}>
            {daysAreEqual ||
            (isBefore && props.singleTask?.status == "overdue") ? (
              <TodayUpdateForm
                completedNote={completedNote}
                setCompletedNote={setCompletedNote}
                task={props.task}
                setCompletedCount={props.setCompletedCount}
                completedCount={props.completedCount}
                singleTask={props.singleTask}
                setPopupHandler={props.setPopupHandler}
                setStatus={props.setStatus}
                _status={props._status}
                rangeStart={props.rangeStart}
                reward={props.reward}
              />
            ) : (
              <LateDayUpdateForm
                singleTask={props.singleTask}
                setPopupHandler={props.setPopupHandler}
              />
            )}
          </PopoverBody>
          <Divider variant="dashed" orientation="horizontal" />
          <Flex alignItems={"center"}>
            <Box ml={"auto"} mr={"1em"}>
              Target date:{" "}
              {moment(props.singleTask?.actionDate).utc().format("MM/DD/YYYY")}
            </Box>
          </Flex>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default TaskProgressPopover;
