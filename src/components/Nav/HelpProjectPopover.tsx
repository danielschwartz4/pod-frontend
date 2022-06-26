import {
  Popover,
  Text,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Box,
  Flex,
  Divider,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { statusColorMap } from "../../utils/statusColorMap";
import { CircleIcon } from "../MyRecurringTask/TaskCircle";

interface HelpProjectPopoverProps {}

export const HelpProjectPopover: React.FC<HelpProjectPopoverProps> = ({
  children,
}) => {
  return (
    <Popover arrowSize={8} gutter={40}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent p={2} backgroundColor={"white"}>
        <PopoverCloseButton />
        <PopoverHeader>
          <b> How it works</b>
        </PopoverHeader>
        <PopoverBody>
          <Box border={"1px"} borderColor={"gray.600"} borderRadius={8} m={0}>
            <Flex h={"130px"}>
              <Box>
                <Flex>
                  {Object.keys(statusColorMap).map((status, index) => (
                    <Flex ml={2} key={index} direction="column">
                      <Text mx={"auto"}>{status}</Text>
                      <CircleIcon
                        mx={1}
                        color={statusColorMap[status]}
                        boxSize={14}
                      />
                    </Flex>
                  ))}
                </Flex>
              </Box>
            </Flex>
            <Divider w={"30%"} variant={"dashed"} />
            <Flex h={"180px"} p={2}>
              <Text>
                Update your projects to alert your pod members of your progress.
                📈 <br />
                <br /> This will keep you on track and keep your pod members
                motivated. 🏃‍♂️
                <br />
                <br /> You'll get alerts too if you add your phone number in
                settings 🤳
              </Text>
            </Flex>
            {/* <Divider w={"30%"} variant={"dashed"} />
            <Flex h={"90px"} p={2}>
              <Box>
                <Text>
                  Each day, your pod members' notes from the previous day will
                  appear at the bottom of the screen 📝
                </Text>
              </Box>
            </Flex> */}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
