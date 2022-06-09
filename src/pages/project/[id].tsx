import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  Text,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DashTabs from "../../components/Dash/DashTabs";
import DashWrapper from "../../components/Dash/DashWrapper";
import { Layout } from "../../components/Layout";
import { MyPod } from "../../components/MyPod/MyPod";
import EnterNewMilestone from "../../components/MyProject/EnterNewMilestone";
import FlowChartMain from "../../components/MyProject/FlowChartMain";
import { Warning } from "../../components/Warning";
import {
  useMeQuery,
  usePodProjectsQuery,
  usePodQuery,
  usePodUsersQuery,
} from "../../generated/graphql";
import { delayAlert } from "../../utils/delay";
import { sortMilestones } from "../../utils/initElements";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";

interface ProjectHomeProps {}

const ProjectHome: React.FC<ProjectHomeProps> = ({}) => {
  useIsAuth();

  const { data: meData } = useMeQuery({});

  const {
    data: projectData,
    loading: projectDataLoading,
    refetch: refetchProject,
  } = useGetProjectFromUrl();

  const { data: podData } = usePodQuery({
    variables: { podId: projectData?.project?.project?.podId },
  });

  const {
    data: projectsData,
    loading: projectsDataLoading,
    refetch: refetchProjects,
  } = usePodProjectsQuery({
    variables: { podId: podData?.pod?.pod?.id },
  });

  const { data: usersData } = usePodUsersQuery({
    variables: { ids: podData?.pod?.pod?.userIds },
  });

  const [showAlert, setShowAlert] = useState(false);
  const [keepMounted, setKeepMounted] = useState(true);

  const [_milestones, setMilestones] = useState<string[]>(
    projectData?.project?.project?.milestones
  );
  const [_milestoneDates, setMilestoneDates] = useState<string[]>(
    projectData?.project?.project?.milestoneDates
  );
  const [_milestoneProgress, setMilestoneProgress] = useState<number[]>(
    projectData?.project?.project?.milestoneProgress
  );

  const [changeTab, useChangeTab] = useState<string>("project");

  useEffect(() => {
    if (projectData?.project?.project) {
      const sortedData = sortMilestones(
        projectData?.project?.project?.milestones,
        projectData?.project?.project?.milestoneDates,
        projectData?.project?.project?.milestoneProgress
      );
      if (sortedData) {
        setMilestones(sortedData["milestones"]);
        setMilestoneDates(sortedData["dates"]);
        setMilestoneProgress(sortedData["progress"]);
      }
    }
  }, [projectData]);

  useEffect(() => {
    refetchProject();
  }, [_milestones, _milestoneDates, _milestoneProgress]);

  // !! -------------------------------------------------- !!

  if (!projectData) {
    return null;
  }

  if (projectData?.project?.errors) {
    return <Warning />;
  }

  if (showAlert == true) {
    delayAlert(4000, setShowAlert, false);
  }

  return (
    <Layout isProfile>
      {_milestones &&
      _milestoneDates &&
      _milestoneProgress &&
      !projectDataLoading ? (
        <DashWrapper>
          <Flex w={{ base: "100%", md: "800px", lg: "1024px" }}>
            <EnterNewMilestone
              changeTab={changeTab}
              milestones={_milestones}
              milestoneDates={_milestoneDates}
              milestoneProgress={_milestoneProgress}
              projectData={projectData}
              setMilestones={setMilestones}
              setMilestoneDates={setMilestoneDates}
              setMilestoneProgress={setMilestoneProgress}
              podData={podData}
            />
            {showAlert ? (
              <Alert
                w={{ base: "55%", md: "75%", lg: "80%" }}
                ml={"auto"}
                mt={"auto"}
                h={"24px"}
                borderRadius={6}
                status="success"
                variant={"solid"}
              >
                <AlertIcon />
                Congrats! Your pod has been alerted!
              </Alert>
            ) : (
              <></>
            )}
          </Flex>
          <DashTabs
            type="project"
            keepMounted={keepMounted}
            useChangeTab={useChangeTab}
            setKeepMounted={setKeepMounted}
          >
            <TabPanels>
              <TabPanel
                h={
                  window.innerWidth < window.innerHeight
                    ? _milestones.length * 120 + "px"
                    : "600px"
                }
                minH={"600px"}
                outlineOffset={-16}
              >
                {!projectDataLoading ? (
                  <FlowChartMain
                    milestones={_milestones}
                    milestoneDates={_milestoneDates}
                    milestoneProgress={_milestoneProgress}
                    setShowAlert={setShowAlert}
                    showAlert={showAlert}
                    setKeepMounted={setKeepMounted}
                    setMilestones={setMilestones}
                    setMilestoneDates={setMilestoneDates}
                    setMilestoneProgress={setMilestoneProgress}
                    usersData={usersData}
                    username={meData?.me?.username}
                  />
                ) : (
                  <Box>Loading...</Box>
                )}
              </TabPanel>

              <TabPanel minH={"600px"}>
                <MyPod
                  projectData={projectData}
                  projectDataLoading={projectDataLoading}
                  refetchProject={refetchProject}
                  podData={podData}
                  projectsData={projectsData}
                  projectsDataLoading={projectsDataLoading}
                  refetchProjects={refetchProjects}
                  meData={meData}
                />
              </TabPanel>
            </TabPanels>
          </DashTabs>
          <Flex w={"80%"} color={"gainsboro"}>
            {changeTab == "project" ? (
              <Text ml={"auto"}>pinch and drag to zoom and pan*</Text>
            ) : (
              <></>
            )}
          </Flex>
        </DashWrapper>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default ProjectHome;
