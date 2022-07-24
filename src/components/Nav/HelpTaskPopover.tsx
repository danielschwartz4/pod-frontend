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
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { statusColorMap } from "../../utils/statusColorMap";
import { CircleIcon } from "../MyRecurringTask/TaskCircle";
import notesImage from "../../images/notesImage.png";

interface HelpTaskPopoverProps {
  placement?: "top" | "bottom" | "left" | "right";
}

export const HelpTaskPopover: React.FC<HelpTaskPopoverProps> = ({
  placement = "bottom",
  children,
}) => {
  return (
    <Popover placement={placement} arrowSize={8} gutter={40}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent p={2} backgroundColor={"white"}>
        <PopoverCloseButton />
        <PopoverHeader>
          <b> How it works</b>
        </PopoverHeader>
        <PopoverBody>
          <Box border={"1px"} borderColor={"gray.600"} borderRadius={8} m={0}>
            <Flex h={"170px"}>
              <Box>
                <Flex>
                  {Object.keys(statusColorMap).map((status, index) => (
                    <Flex key={index} mx={"auto"} direction="column">
                      <Text mx={"auto"}>{status}</Text>
                      <CircleIcon
                        mx={1}
                        color={statusColorMap[status]}
                        boxSize={14}
                      />
                    </Flex>
                  ))}
                </Flex>
                <Text px={2}>
                  Overdue tasks will be counted as incomplete until you update
                  them ‼️
                </Text>
              </Box>
            </Flex>
            <Divider w={"30%"} variant={"dashed"} />
            <Flex h={"180px"} p={2}>
              <Text>
                Update your tasks each day to alert your pod members of your
                progress. 📈 <br />
                <br /> This will keep you on track and keep your pod members
                motivated. 🏃‍♂️
                <br />
                <br /> You'll get alerts too if you add your phone number in
                settings 🤳
              </Text>
            </Flex>
            <Divider w={"30%"} variant={"dashed"} />
            <Flex h={"150px"} p={2}>
              <Box>
                <Text>
                  Each day, your pod members' notes from the previous day will
                  appear at the bottom of the screen 📝
                </Text>
                <Flex>
                  <Image mr={"auto"} width={"260px"} src={notesImage.src} />
                </Flex>
              </Box>
            </Flex>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
