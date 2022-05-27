import { ApolloQueryResult } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Exact,
  MeQuery,
  PodProjectsQuery,
  PodQuery,
  ProjectQuery,
  useAddProjectToPodMutation,
  useCreatePodMutation,
  useFindPublicPodQuery,
  useRemoveProjectFromPodMutation,
  useUpdatePhoneMutation,
  useUpdateProjectGroupSizeMutation,
  useUpdateProjectPodMutation,
} from "../../generated/graphql";
import { useIsAuth } from "../../utils/usIsAuth";
import { PhoneNumber } from "../Inputs/PhoneNumber";
import { exitPod, joinPod } from "./JoinExit";
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
  meData: MeQuery;
}

export const MyPod: React.FC<MyPodProps> = ({
  projectData,
  projectDataLoading,
  refetchProject,
  podData,
  projectsData,
  projectsDataLoading,
  refetchProjects,
  meData,
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

  const { data: availablePodsData } = useFindPublicPodQuery({
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
              onClick={async () =>
                await exitPod(
                  projectData,
                  podData,
                  setPodJoined,
                  removeProjectFromPod,
                  updateProjectPod
                )
              }
            >
              exit pod
            </Button>
          </Box>
        </div>
      ) : (
        <PodNotCreated
          availablePodsData={availablePodsData}
          addProjectToPod={addProjectToPod}
          createPod={createPod}
          setPodJoined={setPodJoined}
          updateProjectPod={updateProjectPod}
          projectData={projectData}
          podSize={podSize}
          setPodSize={setPodSize}
          meData={meData}
        >
          {podSize != null ? (
            <>
              {meData?.me?.phone == null ? (
                <PhoneNumber setPhone={setPhone} />
              ) : null}
              <Button
                w={"100px"}
                mt={"8"}
                ml={2}
                bgColor="gainsboro"
                cursor={"pointer"}
                onClick={async () => {
                  console.log("here ", podSize);
                  // await updateProjectGroupSize({
                  //   variables: {
                  //     groupSize: podSize,
                  //     updateProjectGroupSizeId:
                  //       projectData?.project?.project.id,
                  //   },
                  // });
                  if (phone) {
                    await updatePhone({
                      variables: {
                        updatePhoneId: projectData?.project?.project?.userId,
                        phone: phone,
                      },
                    });
                  }
                  await joinPod(
                    podSize,
                    availablePodsData,
                    projectData,
                    setPodJoined,
                    createPod,
                    updateProjectPod,
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
