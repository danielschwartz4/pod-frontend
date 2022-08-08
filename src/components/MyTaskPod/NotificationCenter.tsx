import { Box, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { Font } from "../../css/styles";
import {
  RecurringTaskQuery,
  SingleTasksQuery,
  useAddMessageMutation,
  useMessagesQuery,
} from "../../generated/graphql";
import formatDate from "../../utils/formatDate";
import { mergeNotesMessages } from "../../utils/mergeData";

interface NotificationCenterProps {
  myTaskData: RecurringTaskQuery;
  recentPodSingleTasksData: SingleTasksQuery;
  refetchPodSingleTasksData: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  myTaskData,
  recentPodSingleTasksData,
  refetchPodSingleTasksData,
}) => {
  const [message, setMessage] = useState("");
  const [addMessage] = useAddMessageMutation();
  const { data: messagesData, refetch: refetchMessages } = useMessagesQuery({
    variables: {
      podId: myTaskData?.recurringTask?.task?.podId,
    },
  });

  const merged = mergeNotesMessages(recentPodSingleTasksData, messagesData);

  return (
    <Box width={"400px"}>
      <Box
        width={"400px"}
        height={"400px"}
        overflow={"scroll"}
        color={"white"}
        backgroundColor={"black"}
        rounded={"md"}
        p={"2"}
        border={"4px"}
        borderColor={"#FFDC93"}
        borderRadius={16}
      >
        {/* {messagesData?.messages?.messages?.map((message, i) => (
          <Box p="1" minH="48px" key={i}>
            <Font style={{ color: "grey", fontSize: "16px" }}>
              <b style={{ color: "gainsboro" }}>{message.user.username}</b>{" "}
              {formatDate(message.updatedAt, true)}
            </Font>
            <Font style={{ fontSize: "16px" }}>{message.message}</Font>
          </Box>
        ))} */}
        {merged?.map((item, i) => (
          <Box p="1" minH="48px" key={i}>
            <Font style={{ color: "grey", fontSize: "16px" }}>
              <b style={{ color: "gainsboro" }}>{item["username"]}</b>{" "}
              {formatDate(item["date"], true)}
            </Font>
            <Font style={{ fontSize: "16px" }}>{item["text"]}</Font>
          </Box>
        ))}
      </Box>
      <Box
        borderRadius={16}
        ml={2}
        width={"410px"}
        transform={"translate(0px, -48px)"}
        bgColor={"black"}
      >
        <Box
          flex={"flex"}
          width={"310px"}
          borderRadius={20}
          ml={8}
          bgColor={"gray.800"}
          cursor={message == "" ? "default" : "pointer"}
          onClick={async () => {
            const res = await addMessage({
              variables: {
                message: message,
                taskId: myTaskData?.recurringTask?.task?.id,
              },
            });
            if (res) {
              setMessage("");
              refetchMessages({
                podId: myTaskData?.recurringTask?.task?.podId,
              });
            }
          }}
        >
          <Input
            borderRadius={20}
            maxLength={200}
            fontFamily={"ubuntu"}
            textColor={"gainsboro"}
            autoComplete={"off"}
            placeholder={"message"}
            type={"text"}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Box
            zIndex={2}
            position="absolute"
            transform={"translate(310px, -30px)"}
          >
            <AiOutlineSend
              opacity={message == "" ? "50%" : "100%"}
              color="gainsboro"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationCenter;
