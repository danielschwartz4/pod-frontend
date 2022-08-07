import { Box, Flex, FormControl, Input, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Font } from "../../css/styles";
import formatDate from "../../utils/formatDate";
import { Formik, useField } from "formik";
import { InputField } from "../Inputs/InputField";

interface NotifCenterProps {
  recentPodSingleTasksData;
}

const NotifCenter: React.FC<NotifCenterProps> = ({
  recentPodSingleTasksData,
}) => {
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
        <Box width={"310px"} borderRadius={20} ml={8} bgColor={"gray.800"}>
          <Input
            borderRadius={20}
            maxLength={200}
            fontFamily={"ubuntu"}
            textColor={"gainsboro"}
            autoComplete={"off"}
            placeholder={"message"}
            type={"text"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NotifCenter;
