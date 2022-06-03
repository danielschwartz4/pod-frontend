import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { accountProps } from "./Account";
import Popup from "./Popup";

interface entryProps extends accountProps {
  title: string;
  data: any;
  removable?: boolean;
  editable?: boolean;
  refetch: () => void;
}

const Entry: React.FC<entryProps> = ({
  meData,
  title,
  data,
  removable,
  editable,
  refetch,
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
        <Popup refetch={refetch} meData={meData}>
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
        </Popup>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default Entry;
