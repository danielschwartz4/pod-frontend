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
    <Box>
      <p
        style={{
          margin: 0,
          marginBottom: "15px",
          fontSize: "36px",
          textAlign: "center",
        }}
      >
        💛
      </p>
      <div
        style={{
          width: "418px",
          padding: "3px",
          backgroundColor: "#FFDC93",
          borderRadius: "10px",
        }}
      >
        <Box
          width={"400px"}
          height={"800px"}
          maxH={"800px"}
          overflow={"scroll"}
          color={"white"}
          backgroundColor={"black"}
          rounded={"md"}
          p={"2"}
        >
          {recentPodSingleTasksData?.recentPodSingleTasks?.singleTasks?.map(
            (note) => (
              <Box p="1" minH="48px">
                <Font style={{ color: "grey", fontSize: "16px" }}>
                  <b style={{ color: "gainsboro" }}>{note.user.username}</b>{" "}
                  {formatDate(note.updatedAt, true)}
                </Font>
                <Font style={{ fontSize: "16px" }}>{note.notes}</Font>
              </Box>
            )
          )}

          {/* {[...Array(80)].map((_, i) => (
            <Box key={i} minH="48px" borderBottom="1px solid">
              {`Item ${i}`}
            </Box>
          ))} */}
        </Box>
      </div>
    </Box>
  );
};

export default NotifCenter;