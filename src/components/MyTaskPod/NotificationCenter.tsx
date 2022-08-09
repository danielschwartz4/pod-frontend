import { Avatar, Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { Font } from "../../css/styles";
import {
  RecurringTaskQuery,
  SingleTasksQuery,
  useAddMessageMutation,
  useMessagesQuery,
} from "../../generated/graphql";
import avatarMap from "../../utils/avatarMap";
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

  const sendMessageHandler = async () => {
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
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      width={{ base: "350px", sm: "350px", lg: "400px" }}
      height={"450px"}
      color={"white"}
      backgroundColor={"black"}
      rounded={"md"}
      border={"2px"}
      borderColor={"#FFDC93"}
      borderRadius={16}
      alignItems={"center"}
    >
      <Box
        width={{ base: "350px", sm: "350px", lg: "390px" }}
        height={"100%"}
        overflow={"scroll"}
        overflowX={"hidden"}
        // style={{ webkitOverflowScrolling: { display: "none" } }}
        // overflowY={"hidden"}
        color={"white"}
        backgroundColor={"black"}
        rounded={"md"}
        borderRadius={16}
        display={"flex"}
        ml={"10px"}
        mt={"10px"}
        mr={"10px"}
        flexDirection={"column-reverse"}
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
          // <Flex
          //   alignItems={"flex-start"}
          //   p="1"
          //   minH="48px"
          //   height="auto"
          //   key={i}
          //   bg={"pink"}
          //   m={2}
          // >
          <Box ml={1} width={"95%"} display={"flex"} mt={2}>
            <Avatar
              size={"sm"}
              src={avatarMap(item["avatar"])}
              alt={"Avatar"}
              mr={1}
              mt={2}
              ml={1}
            />
            <Box>
              <Font
                style={{
                  color: "grey",
                  fontSize: "16px",
                  // backgroundColor: "blue",
                  width: "100%",
                }}
              >
                <b style={{ color: "gainsboro" }}>{item["username"]}</b>{" "}
                <b style={{ color: "gainsboro" }}>
                  {item["isMessage"] == true ? "" : "📝"}
                </b>{" "}
                {formatDate(item["date"], true)}
              </Font>
              <Text
                fontSize="16px"
                fontFamily="ubuntu"
                m={0}
                mx={1}
                maxW={"380px"}
                overflowWrap={"break-word"}
                width={{ base: "75%", sm: "75%", lg: "80%" }}
              >
                {item["text"]}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        borderRadius={20}
        width={{ base: "340px", sm: "350px", lg: "95%" }}
        bgColor={"black"}
        m={1}
        mt={3}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
          borderRadius={20}
          borderColor={"gray.800"}
          border={"1px"}
        >
          <Input
            outline={"none"}
            border={"none"}
            borderRadius={20}
            mr={1}
            maxLength={200}
            fontFamily={"ubuntu"}
            textColor={"gainsboro"}
            autoComplete={"off"}
            placeholder={"Message"}
            type={"text"}
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessageHandler();
              }
            }}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            _focus={{ outline: "none" }}
          />
          <Box mr={3}>
            <AiOutlineSend
              opacity={message == "" ? "50%" : "100%"}
              color="gainsboro"
              cursor={message == "" ? "default" : "pointer"}
              onClick={sendMessageHandler}
              // onClick={async () => {
              //   const res = await addMessage({
              //     variables: {
              //       message: message,
              //       taskId: myTaskData?.recurringTask?.task?.id,
              //     },
              //   });
              //   if (res) {
              //     setMessage("");
              //     refetchMessages({
              //       podId: myTaskData?.recurringTask?.task?.podId,
              //     });
              //   }
              // }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationCenter;
