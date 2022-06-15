import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  RecurringTaskQuery,
  useDeleteRecurringTaskMutation,
  useRemoveProjectFromPodMutation,
  useUpdateTaskNameMutation,
} from "../../generated/graphql";
import { TaskEntryHeading } from "./InnerRecurringTaskEntry";
import useOutsideAlerter from "./nameChangeFunc";
import { ProfileGridItem } from "./ProfileGridItem";
import { ToProjectPageId, ToTaskPageId } from "./ToPageId";

interface RecurringTaskEntryProps {
  task: RecurringTaskQuery["recurringTask"]["task"];
}
const RecurringTaskEntry: React.FC<RecurringTaskEntryProps> = ({ task }) => {
  const [deleteRecurringTask] = useDeleteRecurringTaskMutation();
  const [removeProjectFromPod] = useRemoveProjectFromPodMutation();
  const [updateTaskName] = useUpdateTaskNameMutation();
  const [newName, setNewName] = useState<string>(task?.taskName);

  const [isChangingName, setIsChangingName] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  const handleUpdateName = async () => {
    updateTaskName({
      variables: {
        updateTaskNameId: task?.id,
        taskName: newName,
      },
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsChangingName(false);
      handleUpdateName();
    }
  };

  useOutsideAlerter(
    wrapperRef,
    isChangingName,
    setIsChangingName,
    newName,
    handleUpdateName
  );

  return (
    <ProfileGridItem type="recurringTask">
      <Heading fontSize={"xl"} mx={"auto"}>
        <ToTaskPageId task={task}>
          {task?.podId == 0 ? "not in pod yet" : "pod #: " + task?.podId}
        </ToTaskPageId>
      </Heading>
      <Flex alignItems={"center"} mb={6}>
        <Box ml={"1em"}>
          <Box
            ref={wrapperRef}
            onClick={() => {
              setIsChangingName(true);
            }}
            cursor={isChangingName ? "text" : "pointer"}
          >
            {isChangingName ? (
              <input
                maxLength={30}
                autoFocus={true}
                type="text"
                value={newName}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            ) : (
              newName
            )}
          </Box>
        </Box>
        <Box ml={"auto"} mr={"1em"}>
          <DeleteIcon
            cursor={"pointer"}
            onClick={async () => {
              const pod = task?.podId;
              if (pod != 0) {
                // First remove project from pod
                await removeProjectFromPod({
                  variables: {
                    removeProjectFromPodId: task?.podId,
                    projectId: task?.id,
                  },
                });
              }
              // Then delete project
              await deleteRecurringTask({
                variables: {
                  deleteRecurringTaskId: task?.id,
                },
                update: (cache, { data }) => {
                  if (data?.deleteRecurringTask) {
                    cache.evict({ id: "RecurringTask:" + task?.id });
                  }
                },
              });
            }}
          />
        </Box>
      </Flex>
    </ProfileGridItem>
  );
};

export default RecurringTaskEntry;
