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
import React from "react";
import { SingleTask } from "../../generated/graphql";
import { beforeToday, daysEqual } from "../../utils/getConsistency";
import LateDayUpdateForm from "./LateDayUpdateForm";
import TodayUpdateForm from "./TodayUpdateForm";

interface TaskProgressPopoverProps {
  close: () => void;
  isOpen: boolean;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  singleTask: SingleTask;
  setPopupHandler: () => void;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  completedCount: {};
  setCompletedCount: React.Dispatch<React.SetStateAction<{}>>;
  today: Date;
  rangeStart: Date;
}

const TaskProgressPopover: React.FC<TaskProgressPopoverProps> = (props) => {
  const tmpDate = new Date(props.singleTask?.actionDate);
  const daysAreEqual = daysEqual(tmpDate, props.today);
  const isBefore = beforeToday(tmpDate, props.today);

  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={props.isOpen}
        onClose={props.close}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>{props.children}</PopoverTrigger>
        <PopoverContent p={2} backgroundColor={"white"}>
          {daysAreEqual ? (
            <PopoverHeader fontWeight="semibold">Progress update</PopoverHeader>
          ) : isBefore && props.singleTask?.status == "overdue" ? (
            <PopoverHeader fontWeight="semibold">
              Looks like you forgot to fill this out!
            </PopoverHeader>
          ) : (
            <PopoverHeader fontWeight="semibold">Your notes</PopoverHeader>
          )}
          <PopoverCloseButton cursor={"pointer"} />
          <PopoverBody>
            {daysAreEqual ||
            (isBefore && props.singleTask?.status == "overdue") ? (
              <TodayUpdateForm
                setCompletedCount={props.setCompletedCount}
                completedCount={props.completedCount}
                singleTask={props.singleTask}
                setShowAlert={props.setShowAlert}
                setPopupHandler={props.setPopupHandler}
                setColor={props.setColor}
                rangeStart={props.rangeStart}
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
