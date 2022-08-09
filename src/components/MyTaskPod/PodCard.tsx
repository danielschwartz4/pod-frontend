import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect } from "react";
import { TODAY } from "../../constants";
import {
  MeQuery,
  RecurringTask,
  SingleTask,
  useSingleTasksQuery,
} from "../../generated/graphql";
import avatarMap from "../../utils/avatarMap";
import { daysEqual } from "../../utils/getConsistency";
import { singleTasksToTodayHelper } from "../../utils/getDayRanges";
import { MiniProgressGridSkeleton } from "../MyRecurringTask/MiniProgressGridSkeleton";

interface PodCardProps {
  task: RecurringTask;
  meData: MeQuery;
  madeCount: number;
  setMadeCount: React.Dispatch<React.SetStateAction<number>>;
}

const PodCard: React.FC<PodCardProps> = ({
  task,
  meData,
  madeCount,
  setMadeCount,
}) => {
  const { data: singleTasksData, loading: singleTasksDataLoading } =
    useSingleTasksQuery({
      variables: {
        taskId: task?.id,
      },
    });

  let todayStatus = null;
  singleTasksData?.singleTasks?.singleTasks?.forEach((task) => {
    if (daysEqual(TODAY, new Date(task?.actionDate))) {
      todayStatus = task?.status;
    }
  });

  useEffect(() => {
    if (todayStatus == "completed" || todayStatus == null) {
      setMadeCount(madeCount + 1);
    }
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-around"}
      border={"8px"}
      borderColor={
        todayStatus == "completed" || todayStatus == null
          ? "#3EE76D"
          : todayStatus == "missed" || todayStatus == "tbd"
          ? "#F26D51"
          : "gray"
      }
      borderRadius={"50%"}
      bg={"#F8F2E6"}
      height={"275px"}
      width={"275px"}
      fontFamily={"ubuntu"}
    >
      <Flex
        mt={8}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"50px"}
      >
        <Avatar
          size={"md"}
          src={avatarMap(meData?.me?.avatar)}
          alt={"Avatar"}
          mr={3}
          ml={5}
        />
        <Flex
          flexDirection={"column"}
          width={"55%"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          height={"50px"}
        >
          <Text m={0} fontSize={20}>
            <b>
              {meData?.me?.id == task?.userId
                ? meData?.me?.username
                : task?.user?.username}
            </b>
          </Text>
          <Text textAlign={"left"} m={0} mt={2} fontSize={14}>
            Last update: {moment(task?.updatedAt).calendar()}
          </Text>
        </Flex>
      </Flex>
      <MiniProgressGridSkeleton singleTasksData={singleTasksData} task={task} />
      <Flex height={"50px"} justifyContent={"center"}>
        <Text m={0} mb={2} fontSize={20} width="90%">
          {task?.overview}
        </Text>
      </Flex>
    </Box>
  );
};

export default PodCard;
