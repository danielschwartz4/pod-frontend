import { ApolloQueryResult } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Exact,
  PodProjectsQuery,
  PodQuery,
  ProjectQuery,
  useAddProjectToPodMutation,
  useCreatePodMutation,
  useFindPodQuery,
  useRemoveProjectFromPodMutation,
  useUpdatePhoneMutation,
  useUpdateProjectGroupSizeMutation,
  useUpdateProjectPodMutation,
} from "../../generated/graphql";
import { useIsAuth } from "../../utils/usIsAuth";
import { PhoneNumber } from "../Inputs/PhoneNumber";
import { PodCreated } from "./PodCreated";
import { PodNotCreated } from "./PodNotCreated";

interface MyPodProps {
  projectData: ProjectQuery;
  projectDataLoading: boolean;
  refetchProject: (
    variables?: Partial<
      Exact<{
        id: number;
      }>
    >
  ) => Promise<ApolloQueryResult<ProjectQuery>>;
  podData: PodQuery;
  projectsData: PodProjectsQuery;
  projectsDataLoading: boolean;
  refetchProjects: (
    variables?: Partial<
      Exact<{
        podId: number;
      }>
    >
  ) => Promise<ApolloQueryResult<PodProjectsQuery>>;
  userPhone: string;
}

export const MyPod: React.FC<MyPodProps> = ({
  projectData,
  projectDataLoading,
  refetchProject,
  podData,
  projectsData,
  projectsDataLoading,
  refetchProjects,
  userPhone,
}) => {
  useIsAuth();

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

  const [_podProjects, setPodProjects] = useState(projectsData?.podProjects);

  useEffect(() => {
    setPodJoined(projectData?.project?.project?.podId != 0);
  }, [projectData]);

  useEffect(() => {
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
          podId: pod?.data?.createPod?.id,
          updateProjectPodId: projectData?.project?.project.id,
        },
      });
      await addProjectToPod({
        variables: {
          addProjectToPodId: pod?.data?.createPod?.id,
          projectId: projectData?.project?.project.id,
        },
      });
    } else {
      const pod = availablePodsData?.findPod?.pod;
      await addProjectToPod({
        variables: {
          addProjectToPodId: pod?.id,
          projectId: projectData?.project?.project.id,
        },
      });
      await updateProjectPod({
        variables: {
          podId: pod.id,
          updateProjectPodId: projectData?.project?.project.id,
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
    });
    await removeProjectFromPod({
      variables: {
        removeProjectFromPodId: podData?.pod.pod.id,
        projectId: projectData?.project?.project.id,
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
              {userPhone == null ? <PhoneNumber setPhone={setPhone} /> : null}
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
