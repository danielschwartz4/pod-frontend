import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
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
            <NotesForm />
          </PopoverBody>
          <PopoverFooter d="flex" justifyContent="center">
            <ButtonGroup size="sm">
              <Button
                onClick={() => {
                  // props.setIsOpen(!props.isOpen);
                  console.log("did not complete");
                }}
                background="#F26D51"
                cursor="pointer"
              >
                Did not complete
              </Button>
              <Button
                onClick={() => {
                  // props.setIsOpen(!props.isOpen);
                  // props.setShowAlert(true);
                  console.log("did not complete");
                }}
                background="#3EE76D"
                cursor={"pointer"}
              >
                Completed!
              </Button>
            </ButtonGroup>
          </PopoverFooter>
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
