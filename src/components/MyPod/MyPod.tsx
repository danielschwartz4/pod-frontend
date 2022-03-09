import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  PodDocument,
  PodQuery,
  ProjectDocument,
  ProjectQuery,
  useAddProjectToPodMutation,
  useCreatePodMutation,
  useFindPodQuery,
  usePodQuery,
  usePodsQuery,
  useRemoveProjectFromPodMutation,
  useUpdateProjectPodMutation,
} from "../../generated/graphql";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";

interface MyPodProps {}

export const MyPod: React.FC<MyPodProps> = ({}) => {
  useIsAuth();
  const cap = 2;

  const { data: projectData, loading: projectDataLoading } =
    useGetProjectFromUrl();
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
  const { data: podsData } = usePodsQuery();

  const { data: podData, refetch } = usePodQuery({
    variables: { podId: projectData?.project?.project.podId },
  });

  const [podJoined, setPodJoined] = useState(
    podData?.pod?.errors != "no pod with this id"
  );

  // !! Read thinking in react
  useEffect(() => {
    setPodJoined(podData?.pod?.errors != "no pod with this id");
    console.log(projectData);
    console.log(podJoined);
  }, [podJoined, podData]);

  // ! Make it so you can't add duplicate project or user ids to same pod
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
                errors: data?.updateProjectPod.errors,
                project: data?.updateProjectPod.project,
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
                errors: data?.addProjectToPod.errors,
                pod: data?.addProjectToPod.pod,
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
                errors: data?.updateProjectPod.errors,
                project: data?.updateProjectPod.project,
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
                errors: data?.addProjectToPod.errors,
                pod: data?.addProjectToPod.pod,
              },
            },
          });
        },
      });
    }
    setPodJoined(true);
  };

  const exitPod = () => {
    console.log(podData);
    console.log(projectData?.project?.project.podId);
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
              errors: data?.updateProjectPod.errors,
              project: data?.updateProjectPod.project,
            },
          },
        });
      },
    });
    removeProjectFromPod({
      variables: {
        removeProjectFromPodId: podData?.pod.pod.id,
        projectId: projectData?.project?.project.id,
      },
      update: (cache, { data }) => {
        cache.writeQuery<PodQuery>({
          query: PodDocument,
          data: {
            __typename: "Query",
            pod: {
              errors: data?.removeProjectFromPod.errors,
              pod: data?.removeProjectFromPod.pod,
            },
          },
        });
      },
    });
    setPodJoined(false);
  };

  return (
    <div>
      {!podData?.pod?.errors && podJoined ? (
        <div>
          <Button onClick={() => exitPod()}>exit pod</Button>
        </div>
      ) : (
        <Button onClick={() => joinPod()}>join pod</Button>
      )}
    </div>
  );
};
