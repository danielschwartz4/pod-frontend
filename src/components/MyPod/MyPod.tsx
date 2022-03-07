import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useAddProjectToPodMutation,
  useCreatePodMutation,
  useFindPodQuery,
  useMeQuery,
  usePodQuery,
  useRemoveProjectFromPodMutation,
  useUpdateProjectPodMutation,
} from "../../generated/graphql";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";

interface MyPodProps {}

export const MyPod: React.FC<MyPodProps> = ({}) => {
  useIsAuth();
  const cap = 3;

  const { data: projectData } = useGetProjectFromUrl();
  const { data: meData } = useMeQuery();
  const [addProjectToPod] = useAddProjectToPodMutation();
  const [removeProjectFromPod] = useRemoveProjectFromPodMutation();
  const [updateProjectPod] = useUpdateProjectPodMutation();
  const [createPod] = useCreatePodMutation();
  const {
    data: availablePodsData,
    loading,
    error,
  } = useFindPodQuery({
    variables: {
      cap: cap,
      projectId: projectData?.project?.project.id,
    },
  });
  const [podCreated, setPodCreated] = useState(
    projectData?.project?.project?.podId != 0 &&
      projectData?.project?.project?.podId
      ? true
      : false
  );
  const { data: podData } = usePodQuery({
    variables: { podId: projectData?.project?.project.podId },
  });

  const joinPod = () => {
    let pod;
    if (availablePodsData?.findPod?.errors) {
      pod = createPod({
        variables: {
          cap: cap,
          projectId: projectData?.project?.project.id,
        },
      });
    } else {
      pod = availablePodsData?.findPod?.pod;
    }
    console.log(pod.podId);
    updateProjectPod({
      variables: {
        podId: pod.podId,

        updateProjectPodId: projectData?.project?.project.id,
      },
    });

    addProjectToPod({
      variables: {
        addProjectToPodId: pod.podId,
        projectId: projectData?.project?.project.id,
      },
    });

    setPodCreated(true);
  };

  const exitPod = () => {
    let pod = podData;
    updateProjectPod({
      variables: {
        podId: 0,
        updateProjectPodId: projectData?.project?.project.id,
      },
    });
    removeProjectFromPod({
      variables: {
        removeProjectFromPodId: pod?.pod.pod.id,
        projectId: projectData?.project?.project.id,
      },
    });
    setPodCreated(false);
  };

  return (
    <div>
      {podCreated ? (
        <div>
          <Button onClick={() => exitPod()}>exit pod</Button>
        </div>
      ) : (
        <Button onClick={() => joinPod()}>join pod</Button>
      )}
    </div>
  );
};
