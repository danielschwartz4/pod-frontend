import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Box,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface ProgressPopoverProps {
  open;
  close;
  isOpen: boolean;
}

const ProgressPopover: React.FC<ProgressPopoverProps> = ({
  open,
  close,
  isOpen,
}) => {
  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button visibility={"hidden"} colorScheme="pink">
            Popover Target
          </Button>
        </PopoverTrigger>
        <PopoverContent backgroundColor={"white"}>
          <PopoverHeader fontWeight="semibold">Progress update</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Box>Have you completed this milestone?</Box>
          </PopoverBody>
          <PopoverFooter d="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button background="#F26D51">not yet!</Button>
              <Button background="#6097F8">in progress</Button>
              <Button background="#3EE76D">all done!</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProgressPopover;
