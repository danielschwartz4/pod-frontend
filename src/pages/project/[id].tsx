import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { MyPod } from "../../components/MyPod/MyPod";
import EnterNewMilestone from "../../components/MyProject/EnterNewMilestone";
import FlowChartMain from "../../components/MyProject/FlowChartMain";
import { Warning } from "../../components/Warning";
import { usePodProjectsQuery, usePodQuery } from "../../generated/graphql";
import { delayAlert } from "../../utils/delay";
import { sortMilestones } from "../../utils/initElements";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  useIsAuth();

  const {
    data: projectData,
    loading: projectDataLoading,
    refetch: refetchProject,
  } = useGetProjectFromUrl();

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

  const [showAlert, setShowAlert] = useState(false);

  const [keepMounted, setKeepMounted] = useState(true);

  // !! -------------------------------------------------- !!

  const [_milestones, setMilestones] = useState<string[]>(
    projectData?.project?.project?.milestones
  );
  const [_milestoneDates, setMilestoneDates] = useState<string[]>(
    projectData?.project?.project?.milestoneDates
  );
  const [_milestoneProgress, setMilestoneProgress] = useState<number[]>(
    projectData?.project?.project?.milestoneProgress
  );

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
        <VStack minH={"100vh"} h={"100%"} mt={{ base: 0, md: 16 }}>
          <Flex w={{ base: "100%", md: "800px", lg: "1024px" }}>
            <EnterNewMilestone
              milestones={_milestones}
              milestoneDates={_milestoneDates}
              milestoneProgress={_milestoneProgress}
              projectId={projectData?.project?.project?.id}
              setMilestones={setMilestones}
              setMilestoneDates={setMilestoneDates}
              setMilestoneProgress={setMilestoneProgress}
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
          <Tabs
            border={{ base: "none", md: "1px solid #7e9cd6" }}
            borderRadius={"lg"}
            w={{ base: "100%", md: "800px", lg: "1024px" }}
            isFitted={true}
            variant="enclosed"
            align={"center"}
            defaultIndex={0}
            // ? Made isLazy so tab rerenders flow since flow only appears correctly upon rendering
            isLazy
            lazyBehavior={keepMounted ? "keepMounted" : "unmount"}
          >
            <TabList mb="1em">
              <Tab
                onClick={() => setKeepMounted(true)}
                _selected={{ color: "white", bg: "#1a202c" }}
              >
                My project
              </Tab>
              <Tab
                onClick={() => setKeepMounted(true)}
                _selected={{ color: "white", bg: "#1a202c" }}
              >
                My pod
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel h={"600px"} outlineOffset={-16}>
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
                  />
                ) : (
                  <Box>Loading...</Box>
                )}
              </TabPanel>
              <TabPanel>
                <MyPod
                  projectData={projectData}
                  projectDataLoading={projectDataLoading}
                  refetchProject={refetchProject}
                  podData={podData}
                  projectsData={projectsData}
                  projectsDataLoading={projectsDataLoading}
                  refetchProjects={refetchProjects}
                ></MyPod>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default Home;
