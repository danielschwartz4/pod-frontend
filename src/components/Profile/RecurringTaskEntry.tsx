import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import {
  RecurringTaskQuery,
  useDeleteRecurringTaskMutation,
} from "../../generated/graphql";
import { TaskEntryHeading } from "./InnerRecurringTaskEntry";
import { ProfileGridItem } from "./ProfileGridItem";
import { ToProjectPageId, ToTaskPageId } from "./ToPageId";

interface RecurringTaskEntryProps {
  task: RecurringTaskQuery["recurringTask"]["task"];
}
const RecurringTaskEntry: React.FC<RecurringTaskEntryProps> = ({ task }) => {
  const [deleteRecurringTask] = useDeleteRecurringTaskMutation();

  return (
    <ProfileGridItem type="recurringTask">
      <Heading fontSize={"xl"} mx={"auto"}>
        <ToTaskPageId task={task}>
          {task?.podId == 0 ? "not in pod yet" : "pod #: " + task?.podId}
        </ToTaskPageId>
      </Heading>

      <Box ml={"auto"} mr={"1em"}>
        <DeleteIcon
          cursor={"pointer"}
          onClick={async () => {
            const pod = task?.podId;
            if (pod != 0) {
              //!! First remove project from pod
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
    </ProfileGridItem>
  );
};

export default RecurringTaskEntry;
