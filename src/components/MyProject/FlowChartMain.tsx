import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import {
  useMeQuery,
  useUpdateProjectMilestoneDatesMutation,
  useUpdateProjectMilestonesMutation,
  useUpdateProjectProgressMutation,
} from "../../generated/graphql";
import { FlowNode, NodeDate, NodeMilestone, NodeProgress } from "../../types";
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
  setKeepMounted?: React.Dispatch<React.SetStateAction<boolean>>;
  setMilestones: React.Dispatch<React.SetStateAction<string[]>>;
  setMilestoneDates: React.Dispatch<React.SetStateAction<string[]>>;
  setMilestoneProgress: React.Dispatch<React.SetStateAction<number[]>>;
}

const FlowChartMain: React.FC<horizontalFlowProps> = ({
  milestones,
  milestoneDates,
  milestoneProgress,
  setShowAlert,
  setKeepMounted,
  showAlert,
  setMilestones,
  setMilestoneDates,
  setMilestoneProgress,
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

  // Project milestones
  const [updateProjectMilestones] = useUpdateProjectMilestonesMutation();
  // Project milestone dates
  const [updateProjectMilestoneDates] =
    useUpdateProjectMilestoneDatesMutation();

  const [_milestones, _setMilestones] = useState<string[]>(milestones);
  const [_milestoneDates, _setMilestoneDates] =
    useState<string[]>(milestoneDates);
  const [_milestoneProgress, _setMilestoneProgress] =
    useState<number[]>(milestoneProgress);

  const [newMilestone, setNewMilestone] = useState<NodeMilestone>({
    id: "",
    text: "",
  } as NodeMilestone);
  const [newMilestoneDate, setNewMilestoneDate] = useState<NodeDate>({
    id: "",
    date: "",
  } as NodeDate);
  const [newProgress, setNewProgress] = useState<NodeProgress>({
    id: "",
    progress: 1,
  } as NodeProgress);

  const eles = init_elements(
    milestones,
    milestoneDates,
    milestoneProgress,
    true
  );

  const [elements, setElements] = useState<any[]>(eles);

  //! ---------------------------------------------------------------------------

  useEffect(() => {
    console.log("1111");
    if (milestoneProgress && currNode.id != null) {
      let tmp = [];
      milestoneProgress.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newProgress["progress"]);
          } else {
            tmp.push(ele);
          }
        }
      });
      setMilestoneProgress(tmp);
      _setMilestoneProgress(tmp);
      setKeepMounted(false);
    }
  }, [newProgress]);

  useEffect(() => {
    console.log("2222");
    setElements(
      init_elements(milestones, milestoneDates, _milestoneProgress, true)
    );

    if (projectId && milestoneProgress) {
      updateProjectProgress({
        variables: {
          updateProjectProgressId: projectId,
          milestoneProgress: milestoneProgress,
        },
      });
      // !! Only if person is in pod
      if (showAlert) {
        const body = generateSms(milestoneProgress);
        sendMessage({ to: "+12173817277", body: body });
      }
    }
  }, [_milestoneProgress]);

  //! ---------------------------------------------------------------------------

  useEffect(() => {
    if (milestones && currNode.id != null) {
      let tmp = [];
      milestones.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newMilestone["text"]);
          } else {
            tmp.push(ele);
          }
        }
      });
      setKeepMounted(false);
      _setMilestones(tmp);
      setMilestones(tmp);
    }
  }, [newMilestone]);

  useEffect(() => {
    setElements(
      init_elements(_milestones, milestoneDates, milestoneProgress, true)
    );
    if (projectId && milestones) {
      updateProjectMilestones({
        variables: {
          updateProjectMilestonesId: projectId,
          milestones: milestones,
        },
      });
    }
  }, [_milestones]);

  //! ---------------------------------------------------------------------------

  useEffect(() => {
    if (milestoneDates && currNode.id != null) {
      let tmp = [];
      milestoneDates.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newMilestoneDate["date"]);
          } else {
            tmp.push(ele);
          }
        }
      });
      setKeepMounted(false);
      _setMilestoneDates(tmp);
      setMilestoneDates(tmp);
    }
  }, [newMilestoneDate]);

  useEffect(() => {
    setElements(
      init_elements(milestones, _milestoneDates, milestoneProgress, true)
    );
    if (projectId && milestoneDates) {
      updateProjectMilestoneDates({
        variables: {
          updateProjectMilestoneDatesId: projectId,
          milestoneDates: milestoneDates,
        },
      });
    }
  }, [_milestoneDates]);

  //! ---------------------------------------------------------------------------

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
            <Background gap={50} size={2} color="firebrick" />
            <Box>
              <ProgressPopover
                projectId={projectId}
                close={close}
                isOpen={isOpen}
                milestoneDates={milestoneDates}
                milestoneProgress={milestoneProgress}
                milestones={milestones}
                currNode={currNode}
                setNewProgress={setNewProgress}
                setNewMilestone={setNewMilestone}
                setNewMilestoneDate={setNewMilestoneDate}
                setIsOpen={setIsOpen}
                setShowAlert={setShowAlert}
                setMilestones={setMilestones}
                setMilestoneDates={setMilestoneDates}
                setMilestoneProgress={setMilestoneProgress}
              />
            </Box>
          </ReactFlow>
        </>
      )}
    </Box>
  );
};

export default FlowChartMain;
