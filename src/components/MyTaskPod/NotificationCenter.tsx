import { Box, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { Font } from "../../css/styles";
import formatDate from "../../utils/formatDate";

interface NotifCenterProps {
  recentPodSingleTasksData;
}

const NotifCenter: React.FC<NotifCenterProps> = ({
  recentPodSingleTasksData,
}) => {
  const [message, setMessage] = useState("");

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
        {recentPodSingleTasksData?.recentPodSingleTasks?.singleTasks?.map(
          (note, i) => (
            <Box p="1" minH="48px" key={i}>
              <Font style={{ color: "grey", fontSize: "16px" }}>
                <b style={{ color: "gainsboro" }}>{note.user.username}</b>{" "}
                {formatDate(note.updatedAt, true)}
              </Font>
              <Font style={{ fontSize: "16px" }}>{note.notes}</Font>
            </Box>
          )
        )}
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
          cursor={"pointer"}
          onClick={() => {
            console.log(message);
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
            <AiOutlineSend color="gainsboro" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotifCenter;
