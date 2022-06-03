import { Flex, Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { accountProps } from "./Account";

interface entryProps extends accountProps {
  title: string;
  data: any;
  removable?: boolean;
  editable?: boolean;
}

const Entry: React.FC<entryProps> = ({
  meData,
  title,
  data,
  removable,
  editable,
  // children,
}) => {
  return (
    <Flex alignItems={"center"}>
      <Box>
        <Text>
          <b> {title} </b>
        </Text>
        {meData?.me?.[data] != null && meData?.me?.[data] != "" ? (
          <Text mt={"-.8em"} textColor={"gainsboro"}>
            {meData?.me?.[data]}
          </Text>
        ) : (
          <Text mt={"-.8em"} textColor={"gainsboro"}>
            Not set
          </Text>
        )}
      </Box>

      {editable ? (
        <Flex alignItems={"center"} textColor={"gainsboro"} ml={"auto"}>
          {removable ? (
            <Text cursor={"pointer"} onClick={() => console.log("hello")}>
              <b> remove </b>
            </Text>
          ) : (
            <></>
          )}
          <Button
            ml={removable ? "1em" : "0"}
            textColor={"gainsboro"}
            bg={"gray.600"}
            cursor={"pointer"}
          >
            <Text>Edit</Text>
          </Button>
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default Entry;
