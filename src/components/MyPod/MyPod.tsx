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
  useRemoveProjectFromPodMutation,
  useUpdateProjectPodMutation,
} from "../../generated/graphql";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";
import { PodCreated } from "./PodCreated";

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

  const { data: podData, refetch } = usePodQuery({
    variables: { podId: projectData?.project?.project.podId },
  });

  const [podJoined, setPodJoined] = useState(
    projectData?.project?.project?.podId != 0
  );

  useEffect(() => {
    setPodJoined(projectData?.project?.project?.podId != 0);
  });

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
    console.log("HERE");
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
      {/* {!podData?.pod?.errors && podJoined ? ( */}
      {podJoined ? (
        <div>
          <PodCreated>
            <Button onClick={() => exitPod()}>exit pod</Button>
          </PodCreated>
        </div>
      ) : (
        <Button onClick={() => joinPod()}>join pod</Button>
      )}
    </div>
  );
};
