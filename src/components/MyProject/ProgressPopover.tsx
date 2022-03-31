import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import {
  DeleteIcon,
  EditIcon,
  InfoIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";

interface ProgressPopoverProps {
  close;
  isOpen: boolean;
  completionDate: string;
}

const ProgressPopover: React.FC<ProgressPopoverProps> = ({
  close,
  isOpen,
  completionDate,
  children,
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

          {children}
          <Divider variant="dashed" orientation="horizontal" />
          <Flex alignItems={"center"}>
            <Button
              margin={".3em"}
              colorScheme={"tomato"}
              variant="outline"
              cursor={"pointer"}
              w={6}
              h={6}
            >
              <EditIcon />
            </Button>
            <Button
              margin={".3em"}
              colorScheme={"tomato"}
              variant="outline"
              cursor={"pointer"}
              w={6}
              h={6}
            >
              <DeleteIcon />
            </Button>
            <Button
              margin={".3em"}
              colorScheme={"tomato"}
              variant="outline"
              cursor={"pointer"}
              w={6}
              h={6}
            >
              <InfoOutlineIcon />
            </Button>
            <Box ml={"auto"} mr={"1em"}>
              DOC: {completionDate}
            </Box>
          </Flex>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProgressPopover;
