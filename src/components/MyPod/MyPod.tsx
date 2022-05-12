import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  PodDocument,
  PodQuery,
  ProjectDocument,
  ProjectQuery,
  useAddProjectToPodMutation,
  useCreatePodMutation,
  useFindPodQuery,
  usePodProjectsQuery,
  usePodQuery,
  useRemoveProjectFromPodMutation,
  useUpdatePhoneMutation,
  useUpdateProjectGroupSizeMutation,
  useUpdateProjectPodMutation,
} from "../../generated/graphql";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";
import { PhoneNumber } from "../Inputs/PhoneNumber";
import { PodCreated } from "./PodCreated";
import { PodNotCreated } from "./PodNotCreated";

interface MyPodProps {}

export const MyPod: React.FC<MyPodProps> = ({}) => {
  useIsAuth();

  const {
    data: projectData,
    loading: projectDataLoading,
    refetch: refetchProject,
  } = useGetProjectFromUrl();
  const [addProjectToPod] = useAddProjectToPodMutation();
  const [removeProjectFromPod] = useRemoveProjectFromPodMutation();
  const [updateProjectPod] = useUpdateProjectPodMutation();
  const [updateProjectGroupSize] = useUpdateProjectGroupSizeMutation();
  const [createPod] = useCreatePodMutation();
  const [updatePhone] = useUpdatePhoneMutation();

  const [podSize, setPodSize] = useState(null);
  const [podJoined, setPodJoined] = useState(
    projectData?.project?.project?.podId != 0
  );
  const [phone, setPhone] = useState(null);

  const { data: availablePodsData } = useFindPodQuery({
    variables: {
      cap: podSize,
      projectId: projectData?.project?.project.id,
    },
  });
  const { data: podData } = usePodQuery({
    variables: { podId: projectData?.project?.project.podId },
  });
  const {
    data: projectsData,
    loading: projectsDataLoading,
    refetch: refetchProjects,
  } = usePodProjectsQuery({
    variables: { podId: podData?.pod?.pod?.id },
  });

  const [_podProjects, setPodProjects] = useState(projectsData?.podProjects);

  useEffect(() => {
    setPodJoined(projectData?.project?.project?.podId != 0);
  }, [projectData]);

  useEffect(() => {
    // refetchProjects();
    refetchProject();
  }, [podJoined]);

  useEffect(() => {
    refetchProjects();
    setPodProjects(projectsData?.podProjects);
  }, [projectsData]);

  // ! Make it so you can't add duplicate project or user ids to same pod
  const joinPod = async (cap: number) => {
    if (availablePodsData?.findPod?.errors) {
      const pod = await createPod({
        variables: {
          cap: cap,
        },
      });
      await updateProjectPod({
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
      await addProjectToPod({
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
      await addProjectToPod({
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
      await updateProjectPod({
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
    }
    setPodJoined(true);
  };

  const exitPod = async () => {
    await updateProjectPod({
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
    await removeProjectFromPod({
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
    <Box h={"100%"} w={"100%"}>
      {projectsDataLoading || projectDataLoading ? (
        <Box color={"white"}>loading...</Box>
      ) : podJoined && _podProjects ? (
        <div>
          <PodCreated projectsData={_podProjects} />
          <Box mt={"2em"}>
            <Button
              cursor={"pointer"}
              bgColor="gainsboro"
              onClick={() => exitPod()}
            >
              exit pod
            </Button>
          </Box>
        </div>
      ) : (
        <PodNotCreated podSize={podSize} setPodSize={setPodSize}>
          {podSize != null ? (
            <>
              <PhoneNumber setPhone={setPhone} />
              <Button
                ml={2}
                bgColor="gainsboro"
                cursor={"pointer"}
                onClick={async () => {
                  await updateProjectGroupSize({
                    variables: {
                      groupSize: podSize,
                      updateProjectGroupSizeId:
                        projectData?.project?.project.id,
                    },
                  });
                  if (phone) {
                    await updatePhone({
                      variables: {
                        updatePhoneId: projectData?.project?.project?.userId,
                        phone: phone,
                      },
                    });
                  }
                  joinPod(podSize);
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
