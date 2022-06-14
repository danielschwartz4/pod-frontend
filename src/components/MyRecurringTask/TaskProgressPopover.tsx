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
import NotesForm from "./NotesForm";

interface TaskProgressPopoverProps {
  close: () => void;
  isOpen: boolean;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  singleTask: SingleTask;
  setPopupHandler: () => void;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const TaskProgressPopover: React.FC<TaskProgressPopoverProps> = (props) => {
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
          <PopoverHeader fontWeight="semibold">Progress update</PopoverHeader>
          <PopoverCloseButton cursor={"pointer"} />
          <PopoverBody>
            <NotesForm
              singleTask={props.singleTask}
              setShowAlert={props.setShowAlert}
              setPopupHandler={props.setPopupHandler}
              setColor={props.setColor}
            />
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
