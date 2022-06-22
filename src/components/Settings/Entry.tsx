import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useUpdatePhoneMutation } from "../../generated/graphql";
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
  const [updatePhone] = useUpdatePhoneMutation();

  return (
    <Flex display={["flex"]} alignItems={"center"}>
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
            <Text
              cursor={"pointer"}
              onClick={async () => {
                await updatePhone({
                  variables: {
                    updatePhoneId: meData?.me?.id,
                    phone: "",
                  },
                });
                refetch();
              }}
            >
              remove
            </Text>
          ) : (
            <></>
          )}
          <Popup refetch={refetch} meData={meData}>
            <Button
              ml={removable ? "1em" : "0"}
              textColor={"gainsboro"}
              bg={"gray.600"}
              cursor={"pointer"}
            >
              <Text>Edit</Text>
            </Button>
          </Popup>
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default Entry;
