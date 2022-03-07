import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  PodDocument,
  PodQuery,
  ProjectDocument,
  ProjectQuery,
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
  const { data: availablePodsData } = useFindPodQuery({
    variables: {
      cap: cap,
      projectId: projectData?.project?.project.id,
    },
  });

  const [podCreated, setPodCreated] = useState(
    projectData?.project?.project?.podId != 0 &&
      projectData?.project?.project?.podId != null
      ? true
      : false
  );
  // !! Exit doesn't stay on refresh so usePodQuery or nogic not working
  const { data: podData } = usePodQuery({
    variables: { podId: projectData?.project?.project.podId },
  });

  // !! Make this less trash
  // !! Make it so you can't add duplicate project or user ids to same pod
  // !! Pretty sure we need to cache this mutation too
  const joinPod = async () => {
    if (availablePodsData?.findPod?.errors) {
      const pod = await createPod({
        variables: {
          cap: cap,
        },
      });
      updateProjectPod({
        variables: {
          podId: pod.data.createPod.id,
          updateProjectPodId: projectData?.project?.project.id,
        },
        update: (cache, { data }) => {
          cache.writeQuery<ProjectQuery>({
            query: ProjectDocument,
            data: {
              __typename: "Query",
              project: {
                errors: projectData?.project?.errors,
                project: projectData?.project?.project,
              },
            },
          });
        },
      });
      addProjectToPod({
        variables: {
          addProjectToPodId: pod.data.createPod.id,
          projectId: projectData?.project?.project.id,
        },
        update: (cache, { data }) => {
          cache.writeQuery<PodQuery>({
            query: PodDocument,
            data: {
              __typename: "Query",
              pod: {
                errors: podData?.pod?.errors,
                pod: podData?.pod?.pod,
              },
            },
          });
        },
      });
    } else {
      const pod = availablePodsData?.findPod?.pod;
      updateProjectPod({
        variables: {
          podId: pod.id,
          updateProjectPodId: projectData?.project?.project.id,
        },
        update: (cache, { data }) => {
          cache.writeQuery<ProjectQuery>({
            query: ProjectDocument,
            data: {
              __typename: "Query",
              project: {
                errors: projectData?.project?.errors,
                project: projectData?.project?.project,
              },
            },
          });
        },
      });
      addProjectToPod({
        variables: {
          addProjectToPodId: pod.id,
          projectId: projectData?.project?.project.id,
        },
        update: (cache, { data }) => {
          cache.writeQuery<PodQuery>({
            query: PodDocument,
            data: {
              __typename: "Query",
              pod: {
                errors: podData?.pod?.errors,
                pod: podData?.pod?.pod,
              },
            },
          });
        },
      });
    }
    setPodCreated(true);
  };

  // !! Cache mutation for when we change the pod data
  const exitPod = () => {
    let pod = podData;
    updateProjectPod({
      variables: {
        podId: 0,
        updateProjectPodId: projectData?.project?.project.id,
      },
      update: (cache, { data }) => {
        cache.writeQuery<ProjectQuery>({
          query: ProjectDocument,
          data: {
            __typename: "Query",
            project: {
              errors: projectData?.project?.errors,
              project: projectData?.project?.project,
            },
          },
        });
      },
    });
    removeProjectFromPod({
      variables: {
        removeProjectFromPodId: pod?.pod.pod.id,
        projectId: projectData?.project?.project.id,
      },
      update: (cache, { data }) => {
        cache.writeQuery<PodQuery>({
          query: PodDocument,
          data: {
            __typename: "Query",
            pod: {
              errors: podData?.pod?.errors,
              pod: podData?.pod?.pod,
            },
          },
        });
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
