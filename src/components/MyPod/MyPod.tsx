import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
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
  useUpdateProjectGroupSizeMutation,
  useUpdateProjectPodMutation,
} from "../../generated/graphql";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";
import { PodCreated } from "./PodCreated";

interface MyPodProps {}

export const MyPod: React.FC<MyPodProps> = ({}) => {
  useIsAuth();

  const [podSize, setPodSize] = useState(1);

  const { data: projectData, loading: projectDataLoading } =
    useGetProjectFromUrl();
  const [addProjectToPod] = useAddProjectToPodMutation();
  const [removeProjectFromPod] = useRemoveProjectFromPodMutation();
  const [updateProjectPod] = useUpdateProjectPodMutation();
  const [updateProjectGroupSize] = useUpdateProjectGroupSizeMutation();
  const [createPod] = useCreatePodMutation();

  const { data: availablePodsData } = useFindPodQuery({
    variables: {
      cap: podSize,
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
    <div>
      {podJoined ? (
        <div>
          <PodCreated>
            <Button onClick={() => exitPod()}>exit pod</Button>
          </PodCreated>
        </div>
      ) : (
        <div>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {podSize == 1 ? "Select pod size" : podSize}
            </MenuButton>
            <MenuList>
              <MenuItem
                value={2}
                onClick={(e) => {
                  let size = parseInt((e.target as HTMLTextAreaElement).value);
                  setPodSize(size);
                }}
              >
                2
              </MenuItem>
              <MenuItem
                value={3}
                onClick={(e) => {
                  let size = parseInt((e.target as HTMLTextAreaElement).value);
                  setPodSize(size);
                }}
              >
                3
              </MenuItem>
              <MenuItem
                value={4}
                onClick={(e) => {
                  let size = parseInt((e.target as HTMLTextAreaElement).value);
                  setPodSize(size);
                }}
              >
                4
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            onClick={() => {
              updateProjectGroupSize({
                variables: {
                  groupSize: podSize,
                  updateProjectGroupSizeId: projectData?.project?.project.id,
                },
              });
              joinPod(podSize);
            }}
          >
            join pod
          </Button>
        </div>
      )}
    </div>
  );
};
