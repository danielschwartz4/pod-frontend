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

  const { data: projectData, loading: projectDataLoading } =
    useGetProjectFromUrl();
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
  const { data: projectsData, loading: projectsDataLoading } =
    usePodProjectsQuery({
      variables: { podId: podData?.pod?.pod?.id },
    });

  useEffect(() => {
    setPodJoined(projectData?.project?.project?.podId != 0);
  });

  // ! Make it so you can't add duplicate project or user ids to same pod
  const joinPod = async (cap: number) => {
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
      // console.log(availablePodsData);
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
    <Box h={"100%"} w={"100%"}>
      {podJoined ? (
        <div>
          <PodCreated projectsData={projectsData?.podProjects} />
          <Box mt={"2em"}>
            <Button onClick={() => exitPod()}>exit pod</Button>
          </Box>
        </div>
      ) : (
        <PodNotCreated podSize={podSize} setPodSize={setPodSize}>
          {podSize != null ? (
            <>
              <PhoneNumber setPhone={setPhone} />
              <Button
                ml={2}
                colorScheme={"gray"}
                onClick={() => {
                  updateProjectGroupSize({
                    variables: {
                      groupSize: podSize,
                      updateProjectGroupSizeId:
                        projectData?.project?.project.id,
                    },
                  });
                  if (phone) {
                    updatePhone({
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
