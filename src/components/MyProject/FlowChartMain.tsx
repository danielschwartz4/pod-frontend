import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import {
  ProjectDocument,
  ProjectQuery,
  useMeQuery,
  useUpdateProjectMilestoneDatesMutation,
  useUpdateProjectMilestonesMutation,
  useUpdateProjectProgressMutation,
} from "../../generated/graphql";
import { FlowNode } from "../../types";
import { delayAlert } from "../../utils/delay";
import init_elements from "../../utils/initElements";
import { generateSms } from "../../utils/smsBody";
import { useGetIntId } from "../../utils/useGetIntId";
import { sendMessage } from "../Sms/sendMessage";
import ProgressPopover from "./ProgressPopover";

interface horizontalFlowProps {
  milestones: string[];
  milestoneDates: string[];
  milestoneProgress: number[];
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  showAlert?: boolean;
}

const FlowChartMain: React.FC<horizontalFlowProps> = ({
  milestones,
  milestoneDates,
  milestoneProgress,
  setShowAlert,
  showAlert,
}) => {
  const { data, loading } = useMeQuery({});

  const projectId = useGetIntId();

  const [nodeActive, setNodeActive] = useState(true);

  // Popover functionality (delaying a second after popover is opened)
  const [isOpen, setIsOpen] = useState(false);
  const open = (_, node) => {
    if (nodeActive) {
      setCurrNode(node);
      setIsOpen(!isOpen);
    }
    delayAlert(1000, setNodeActive, true);
    setNodeActive(false);
  };
  const close = () => setIsOpen(false);

  // Get the current node
  const [currNode, setCurrNode] = useState<FlowNode>({} as FlowNode);

  // Project progress
  const [updateProjectProgress] = useUpdateProjectProgressMutation();

  const [_milestoneProgress, setMilestoneProgress] =
    useState<number[]>(milestoneProgress);

  const [newProgress, setNewProgress] = useState<{
    id: string;
    progress: number;
  }>({
    id: "",
    progress: 1,
  } as {
    id: string;
    progress: number;
  });

  // Project milestones
  const [updateProjectMilestones] = useUpdateProjectMilestonesMutation();

  const [_milestones, setMilestones] = useState<string[]>(milestones);

  const [newMilestone, setNewMilestone] = useState<{
    id: string;
    text: string;
  }>({
    id: "",
    text: "",
  } as {
    id: string;
    text: string;
  });

  // Project milestone dates
  const [updateProjectMilestoneDates] =
    useUpdateProjectMilestoneDatesMutation();

  const [_milestoneDates, setMilestoneDates] =
    useState<string[]>(milestoneDates);

  const [newMilestoneDate, setNewMilestoneDate] = useState<{
    id: string;
    date: string;
  }>({
    id: "",
    date: "",
  } as {
    id: string;
    date: string;
  });

  // Flowchart elements
  const eles = init_elements(
    _milestones,
    _milestoneDates,
    _milestoneProgress,
    true
  );

  const [elements, setElements] = useState<any[]>(eles);

  useEffect(() => {
    if (_milestoneProgress && currNode.id != null) {
      let tmp = [];
      _milestoneProgress.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newProgress["progress"]);
          } else {
            tmp.push(ele);
          }
        }
      });
      setMilestoneProgress(tmp);
    }
  }, [newProgress]);

  useEffect(() => {
    setElements(
      init_elements(_milestones, _milestones, _milestoneProgress, true)
    );
    if (projectId && _milestoneProgress) {
      updateProjectProgress({
        variables: {
          updateProjectProgressId: projectId,
          milestoneProgress: _milestoneProgress,
        },
        // !! Do I actually need this
        update: (cache, { data }) => {
          cache.writeQuery<ProjectQuery>({
            query: ProjectDocument,
            data: {
              __typename: "Query",
              project: {
                errors: data?.updateProjectProgress.errors,
                project: data?.updateProjectProgress.project,
              },
            },
          });
        },
      });
      // !! Only if person is in pod
      if (showAlert) {
        const body = generateSms(_milestoneProgress);
        sendMessage({ to: "+12173817277", body: body });
      }
    }
  }, [_milestoneProgress]);

  useEffect(() => {
    if (_milestones && currNode.id != null) {
      let tmp = [];
      _milestones.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newMilestone["text"]);
          } else {
            tmp.push(ele);
          }
        }
      });
      setMilestones(tmp);
    }
  }, [newMilestone]);

  useEffect(() => {
    setElements(
      init_elements(_milestones, _milestones, _milestoneProgress, true)
    );
    if (projectId && _milestones) {
      updateProjectMilestones({
        variables: {
          updateProjectMilestonesId: projectId,
          milestones: _milestones,
        },
        update: (cache, { data }) => {
          cache.writeQuery<ProjectQuery>({
            query: ProjectDocument,
            data: {
              __typename: "Query",
              project: {
                errors: data?.updateProjectMilestones.errors,
                project: data?.updateProjectMilestones.project,
              },
            },
          });
        },
      });
    }
  }, [_milestones]);

  useEffect(() => {
    if (_milestoneDates && currNode.id != null) {
      let tmp = [];
      _milestoneDates.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newMilestoneDate["date"]);
          } else {
            tmp.push(ele);
          }
        }
      });
      setMilestoneDates(tmp);
    }
  }, [newMilestoneDate]);

  useEffect(() => {
    setElements(
      init_elements(_milestones, _milestoneDates, _milestoneProgress, true)
    );
    if (projectId && _milestoneDates) {
      updateProjectMilestoneDates({
        variables: {
          updateProjectMilestoneDatesId: projectId,
          milestoneDates: _milestoneDates,
        },
        update: (cache, { data }) => {
          cache.writeQuery<ProjectQuery>({
            query: ProjectDocument,
            data: {
              __typename: "Query",
              project: {
                errors: data?.updateProjectMilestoneDates.errors,
                project: data?.updateProjectMilestoneDates.project,
              },
            },
          });
        },
      });
    }
  }, [_milestoneDates]);

  const onNodeContextMenu = (event, _) => {
    event.preventDefault();
  };

  const onLoad = (instance) => setTimeout(() => instance.fitView(), 0);

  return (
    <Box h={"100%"} w={"100%"} bg={"#1a202c"}>
      {loading && !data ? (
        <div> loading... </div>
      ) : (
        <>
          <ReactFlow
            elements={elements}
            nodesConnectable={false}
            onLoad={onLoad}
            selectNodesOnDrag={false}
            zoomOnPinch={false}
            zoomOnScroll={false}
            zoomOnDoubleClick={false}
            paneMoveable={false}
            onNodeContextMenu={onNodeContextMenu}
            suppressHydrationWarning={true}
            onNodeMouseEnter={open}
            nodesDraggable={false}
            preventScrolling={false}
          >
            <Background
              gap={50}
              size={2}
              color="firebrick"
              style={{ background: "gray.800" }}
            />
            <Box>
              <ProgressPopover
                close={close}
                isOpen={isOpen}
                milestoneDates={milestoneDates}
                milestoneProgress={_milestoneProgress}
                milestones={milestones}
                currNode={currNode}
                setNewProgress={setNewProgress}
                updatedMilestones={_milestones}
                setNewMilestone={setNewMilestone}
                updatedMilestoneDates={_milestoneDates}
                setNewMilestoneDate={setNewMilestoneDate}
                setIsOpen={setIsOpen}
                setShowAlert={setShowAlert}
              />
            </Box>
          </ReactFlow>
        </>
      )}
    </Box>
  );
};

export default FlowChartMain;
