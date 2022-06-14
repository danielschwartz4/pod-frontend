import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { exitPod, joinPod } from "./JoinExit";
import { PodCreated } from "./PodCreated";
import { PodNotCreated } from "./PodNotCreated";
import { PhoneNumber } from "../Inputs/PhoneNumber";

import {
  MeQuery,
  PodProjectsQuery,
  PodQuery,
  PodTasksQuery,
  RecurringTaskQuery,
  useAddProjectToPodMutation,
  useCreatePodMutation,
  useFindPublicPodQuery,
  useRemoveProjectFromPodMutation,
  useUpdatePhoneMutation,
  useUpdateTaskPodMutation,
} from "../../generated/graphql";
import { useIsAuth } from "../../utils/usIsAuth";
import { COUNTRIES } from "../Inputs/countries";

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
  useIsAuth();
  const countryOptions = COUNTRIES.map(({ name, iso }) => ({
    label: name,
    value: iso,
  }));

  const [podJoined, setPodJoined] = useState(
    myTaskData?.recurringTask?.task?.podId != 0
  );

  const [updateTaskPod] = useUpdateTaskPodMutation();
  const [removeProjectFromPod] = useRemoveProjectFromPodMutation();
  const [updatePhone] = useUpdatePhoneMutation();
  const [createPod] = useCreatePodMutation();
  const [addProjectToPod] = useAddProjectToPodMutation();

  const [_podTasks, setPodTasks] = useState(tasksData?.podTasks);
  const [podSize, setPodSize] = useState(null);
  const [phone, setPhone] = useState(null);

  const { data: availablePodsData } = useFindPublicPodQuery({
    variables: {
      cap: podSize,
      projectId: myTaskData?.recurringTask?.task?.id,
    },
  });

  return (
    <Box h={"100%"} w={"100%"}>
      {tasksDataLoading || taskDataLoading ? (
        <Box color={"gainsboro"}>loading...</Box>
      ) : podJoined && _podTasks ? (
        <div>
          <PodCreated tasksData={_podTasks} />
          <Box mt={"2em"}>
            <Button
              cursor={"pointer"}
              bgColor="gainsboro"
              onClick={async () =>
                await exitPod(
                  removeProjectFromPod,
                  myTaskData,
                  podData,
                  setPodJoined,
                  updateTaskPod
                )
              }
            >
              exit pod
            </Button>
          </Box>
        </div>
      ) : (
        <PodNotCreated setPodSize={setPodSize} podSize={podSize}>
          {podSize != null ? (
            <>
              {meData?.me?.phone == null ? (
                <PhoneNumber
                  country="US"
                  options={countryOptions}
                  placeholder="Enter phone number"
                  setPhone={setPhone}
                />
              ) : null}
              <Button
                w={"100px"}
                mt={"8"}
                ml={2}
                bgColor="gainsboro"
                cursor={"pointer"}
                onClick={async () => {
                  if (phone) {
                    await updatePhone({
                      variables: {
                        updatePhoneId: myTaskData?.recurringTask?.task?.userId,
                        phone: phone,
                      },
                    });
                  }
                  await joinPod(
                    podSize,
                    availablePodsData,
                    myTaskData,
                    setPodJoined,
                    createPod,
                    updateTaskPod,
                    addProjectToPod
                  );
                }}
              >
                Join!
              </Button>
            </>
          ) : null}
        </PodNotCreated>
      )}
    </Box>
  );
};
