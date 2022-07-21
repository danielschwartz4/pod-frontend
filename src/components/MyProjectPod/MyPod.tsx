import { ApolloQueryResult } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Exact,
  MeQuery,
  PodProjectsQuery,
  PodQuery,
  Project,
  ProjectQuery,
  useAddProjectToPodMutation,
  useCreatePodMutation,
  useFindPublicPodQuery,
  useRemoveProjectFromPodMutation,
  useSendEmailsLazyQuery,
  useUpdatePhoneMutation,
  useUpdateProjectPodMutation,
} from "../../generated/graphql";
import { sendMessage } from "../../utils/messaging/sendMessage";
import { useIsAuth } from "../../utils/usIsAuth";
import { COUNTRIES } from "../Inputs/countries";
import { PhoneNumber } from "../Inputs/PhoneNumber";
import { exitPod, joinPod } from "./JoinExit";
import { PodCreated } from "./PodCreated";
import { PodNotCreated } from "./PodNotCreated";
import { Event } from "../../libs/tracking";

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

  const countryOptions = COUNTRIES.map(({ name, iso }) => ({
    label: name,
    value: iso,
  }));

  const [addProjectToPod] = useAddProjectToPodMutation();
  const [removeProjectFromPod] = useRemoveProjectFromPodMutation();
  const [updateProjectPod] = useUpdateProjectPodMutation();
  const [createPod] = useCreatePodMutation();
  const [updatePhone] = useUpdatePhoneMutation();
  const [sendEmails, {}] = useSendEmailsLazyQuery();

  const [podSize, setPodSize] = useState(null);
  const [podJoined, setPodJoined] = useState(
    projectData?.project?.project?.podId != 0
  );
  const [phone, setPhone] = useState(null);

  const { data: availablePodsData } = useFindPublicPodQuery({
    variables: {
      cap: podSize,
      projectId: projectData?.project?.project.id,
      sessionType: "project",
    },
  });

  const [_podProjects, setPodProjects] = useState<Project[]>(
    projectsData?.podProjects as Project[]
  );

  useEffect(() => {
    // Refetch project to update podJoined state
    refetchProject();
    // Refetch projects to update _podProjects state
    // refetchProjects();
    setPodProjects(projectsData?.podProjects as Project[]);
  }, [projectsData, podJoined]);

  return (
    <Box h={"100%"} w={"100%"}>
      {projectsDataLoading || projectDataLoading ? (
        <Box color={"gainsboro"}>loading...</Box>
      ) : podJoined && _podProjects ? (
        <div>
          <PodCreated
            meData={meData}
            podData={podData}
            projectsData={_podProjects}
            podCap={podData?.pod?.pod?.cap}
          />
          <Box mt={"2em"}>
            <Button
              cursor={"pointer"}
              bgColor="gainsboro"
              onClick={async () =>
                Event("Desktop", "MyProjectPod MyPod.tsx Button", "exit pod");
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
                  Event(
                    "Desktop",
                    "MyProjectPod tasks/# MyPod.tsx Button",
                    "Join!"
                  );
                  if (phone) {
                    await updatePhone({
                      variables: {
                        updatePhoneId: projectData?.project?.project?.userId,
                        phone: phone,
                      },
                    });
                  }
                  const pod: PodQuery["pod"]["pod"] = await joinPod(
                    podSize,
                    availablePodsData,
                    projectData,
                    setPodJoined,
                    createPod,
                    updateProjectPod,
                    addProjectToPod
                  );
                  sendEmails({
                    variables: {
                      message: "log into link ",
                      subject:
                        "someone joined your pod! Check out their progress <a href='url'>here</a>",
                      userIds: pod?.userIds,
                    },
                  });

                  sendMessage({
                    to: "+12173817277",
                    body: `${meData?.me?.username}'s project has joined a pod! text/email them
                        Email: ${meData?.me?.email}, 
                        Phone: ${meData?.me?.phone}`,
                  });
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
