import { Button, ButtonGroup, PopoverFooter, useToast } from "@chakra-ui/react";
import React from "react";
import { SKELETON_UNIT_SIZE, TODAY } from "../../constants";
import {
  RecurringTaskQuery,
  SingleTask,
  useAddSingleTasksChunkMutation,
  useMeLazyQuery,
  usePodLazyQuery,
  usePodUsersLazyQuery,
  useSingleTasksLazyQuery,
  useUpdateCompletedCountMutation,
  useUpdateSingleTaskCompletionStatusMutation,
} from "../../generated/graphql";
import { CompletedCount } from "../../types/types";
import { beforeToday } from "../../utils/getConsistency";
import { generateSms } from "../../utils/taskSmsBody";
import { addDays } from "../../utils/singleTaskUtils";
import { sendMessages } from "../Sms/sendMessage";
import NotesForm from "./NotesForm";

interface TodayUpdateFormProps {
  singleTask: SingleTask;
  setPopupHandler: () => void;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  completedCount: CompletedCount;
  setCompletedCount: React.Dispatch<React.SetStateAction<CompletedCount>>;
  rangeStart: Date;
  task: RecurringTaskQuery;
  _status: string;
}

const TodayUpdateForm: React.FC<TodayUpdateFormProps> = ({
  singleTask,
  setPopupHandler,
  setStatus,
  _status,
  completedCount,
  setCompletedCount,
  rangeStart,
  task,
}) => {
  const [updateSingleTaskCompletionStatus] =
    useUpdateSingleTaskCompletionStatusMutation();
  const [updateCompletedCount] = useUpdateCompletedCountMutation();
  const [addSingleTasksChunk] = useAddSingleTasksChunkMutation();

  const toast = useToast();

  const [singleTasksQuery, { data: singleTasksData }] =
    useSingleTasksLazyQuery();

  const [podQuery, { data: podData }] = usePodLazyQuery();

  const [podUsersQuery, { data: usersData }] = usePodUsersLazyQuery();

  const [meQuery, { data: meData }] = useMeLazyQuery();

  const filterdBelow = singleTasksData?.singleTasks?.singleTasks?.filter(
    (task) => beforeToday(new Date(task?.actionDate), TODAY)
  );

  const filteredData = singleTasksData?.singleTasks?.singleTasks?.filter(
    (task) =>
      !beforeToday(new Date(task?.actionDate), addDays(-14, TODAY)) &&
      beforeToday(
        new Date(task?.actionDate),
        addDays(Math.max(14, 14 + (14 - filterdBelow.length)), TODAY)
      )
  );

  const sendMessageHandler = async () =>
    // usersData: PodUsersQuery,
    // message: string

    {
      if (task?.recurringTask?.task?.podId != 0) {
        await singleTasksQuery({
          variables: { taskId: task?.recurringTask?.task?.id },
        });
        const pq = await podQuery({
          variables: { podId: task?.recurringTask?.task?.podId },
        });
        const users = await podUsersQuery({
          variables: { ids: pq?.data?.pod?.pod?.userIds },
        });
        const me = await meQuery();
        if (usersData?.podUsers && me?.data?.me) {
          // !! Fix this?
          const body = generateSms(
            singleTasksData?.singleTasks?.singleTasks as SingleTask[]
          );
          sendMessages(me?.data?.me?.username, usersData, body);
        }
      }
    };

  const setCompletedCountHandler = (isAdding: boolean) => {
    const tmpDate = new Date(singleTask?.actionDate);
    let c: CompletedCount;
    if (isAdding) {
      if (!beforeToday(tmpDate, rangeStart)) {
        c = {
          allTime: completedCount["allTime"] + 1,
          week: completedCount["week"] + 1,
        };
      } else {
        c = {
          allTime: completedCount["allTime"] + 1,
          week: completedCount["week"],
        };
      }
    } else {
      if (!beforeToday(tmpDate, rangeStart)) {
        c = {
          allTime: completedCount["allTime"] - 1,
          week: completedCount["week"] - 1,
        };
      } else {
        c = {
          allTime: completedCount["allTime"] - 1,
          week: completedCount["week"],
        };
      }
    }
    setCompletedCount(c);
    updateCompletedCount({
      variables: {
        completedCount: {
          allTime: c["allTime"],
          week: c["week"],
        },
        updateCompletedCountId: task?.recurringTask?.task?.id,
      },
    });
  };

  return (
    <NotesForm singleTask={singleTask}>
      <PopoverFooter d="flex" justifyContent="center">
        <ButtonGroup size="sm">
          <Button
            onClick={async () => {
              setPopupHandler();
              const response = await updateSingleTaskCompletionStatus({
                variables: {
                  status: "missed",
                  updateSingleTaskCompletionStatusId: singleTask?.id,
                },
              });
              if (response) {
                setStatus("missed");
                if (
                  _status != "missed" &&
                  _status != "tbd" &&
                  _status != "overdue"
                ) {
                  setCompletedCountHandler(false);
                }
              }
            }}
            type="submit"
            background="#F26D51"
            cursor="pointer"
          >
            Did not complete
          </Button>
          <Button
            onClick={async () => {
              setPopupHandler();
              const response = await updateSingleTaskCompletionStatus({
                variables: {
                  status: "completed",
                  updateSingleTaskCompletionStatusId: singleTask?.id,
                },
              });
              if (response) {
                setStatus("completed");
                if (_status != "completed") {
                  setCompletedCountHandler(true);
                  toast({
                    title: "Congrats!",
                    description: "Your pod has been alerted!.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  await sendMessageHandler();
                }
                // !!MMke this execute on the last day
                // await addSingleTasksChunk({
                //   variables: {
                //     limit: SKELETON_UNIT_SIZE,
                //     recTaskId: task?.recurringTask?.task?.id,
                //   },
                // });
              }
            }}
            type="submit"
            background="#3EE76D"
            cursor={"pointer"}
          >
            Completed!
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </NotesForm>
  );
};

export default TodayUpdateForm;
