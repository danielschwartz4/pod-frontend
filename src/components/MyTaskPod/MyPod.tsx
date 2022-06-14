import { Box, Button } from "@chakra-ui/react";
import { PhoneNumber } from "libphonenumber-js";
import React, { useState } from "react";
import { exitPod, joinPod } from "./JoinExit";
import { PodCreated } from "./PodCreated";
import { PodNotCreated } from "../MyProjectPod/PodNotCreated";
import {
  MeQuery,
  PodProjectsQuery,
  PodQuery,
  PodTasksQuery,
  RecurringTaskQuery,
  useRemoveProjectFromPodMutation,
  useUpdateTaskPodMutation,
} from "../../generated/graphql";

interface MyPodProps {
  tasksDataLoading: boolean;
  taskDataLoading: boolean;
  meData: MeQuery;
  tasksData: PodTasksQuery;
  myTaskData: RecurringTaskQuery;
  podData: PodQuery;
}

export const MyPod: React.FC<MyPodProps> = ({
  tasksDataLoading,
  taskDataLoading,
  meData,
  tasksData,
  myTaskData,
  podData,
}) => {
  const [podJoined, setPodJoined] = useState(
    myTaskData?.recurringTask?.task?.podId != 0
  );

  const [updateTaskPod] = useUpdateTaskPodMutation();
  const [removeProjectFromPod] = useRemoveProjectFromPodMutation();

  const [_podTasks, setPodTasks] = useState(tasksData?.podTasks);

  return (
    <Box h={"100%"} w={"100%"}>
      {tasksDataLoading || taskDataLoading ? (
        <Box color={"gainsboro"}>loading...</Box>
      ) : podJoined && _podTasks ? (
        // !! Fill out PodCreated
        <div>
          <PodCreated tasksData={_podTasks} />
          <Box mt={"2em"}>
            <Button
              cursor={"pointer"}
              bgColor="gainsboro"
              onClick={async () =>
                await exitPod(
                  myTaskData,
                  podData,
                  setPodJoined,
                  removeProjectFromPod,
                  updateTaskPod
                )
              }
            >
              exit pod
            </Button>
          </Box>
        </div>
      ) : (
        // <PodNotCreated
        //   availablePodsData={availablePodsData}
        //   addProjectToPod={addProjectToPod}
        //   createPod={createPod}
        //   setPodJoined={setPodJoined}
        //   updateProjectPod={updateProjectPod}
        //   projectData={projectData}
        //   podSize={podSize}
        //   setPodSize={setPodSize}
        //   meData={meData}
        // >
        //   {podSize != null ? (
        //     <>
        //       {meData?.me?.phone == null ? (
        //         <PhoneNumber
        //           country="US"
        //           options={countryOptions}
        //           placeholder="Enter phone number"
        //           setPhone={setPhone}
        //         />
        //       ) : null}
        //       <Button
        //         w={"100px"}
        //         mt={"8"}
        //         ml={2}
        //         bgColor="gainsboro"
        //         cursor={"pointer"}
        //         onClick={async () => {
        //           if (phone) {
        //             await updatePhone({
        //               variables: {
        //                 updatePhoneId: projectData?.project?.project?.userId,
        //                 phone: phone,
        //               },
        //             });
        //           }
        //           await joinPod(
        //             podSize,
        //             availablePodsData,
        //             projectData,
        //             setPodJoined,
        //             createPod,
        //             updateProjectPod,
        //             addProjectToPod
        //           );
        //         }}
        //       >
        //         Join!
        //       </Button>
        //     </>
        //   ) : null}
        // </PodNotCreated>
        <></>
      )}
    </Box>
  );
};
