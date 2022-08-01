import { Box, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Font } from "../../css/styles";
import formatDate from "../../utils/formatDate";

interface NotifCenterProps {
  recentPodSingleTasksData;
}

const NotifCenter: React.FC<NotifCenterProps> = ({
  recentPodSingleTasksData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
  );
};

export default NotifCenter;
