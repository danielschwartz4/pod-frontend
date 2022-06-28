import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import {
  PodUsersQuery,
  useMeQuery,
  useUpdateProjectMilestoneDatesMutation,
  useUpdateProjectMilestonesMutation,
  useUpdateProjectProgressMutation,
} from "../../generated/graphql";
import {
  FlowNode,
  NodeDate,
  NodeMilestone,
  NodeProgress,
} from "../../types/types";
import init_elements, { sortMilestones } from "../../utils/initElements";
import { generateSms } from "../../utils/projectSmsBody";
import { useGetIntId } from "../../utils/useGetIntId";
import { sendMessages } from "../../utils/messaging/sendMessage";
import ProjectProgressPopover from "./ProjectProgressPopover";

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
  usersData: PodUsersQuery;
  username: string;
}

const FlowChartMain: React.FC<horizontalFlowProps> = (props) => {
  const [canClick, setCanClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currNode, setCurrNode] = useState<FlowNode>({} as FlowNode);

  const { data, loading } = useMeQuery({});
  const projectId = useGetIntId();

  // Update project mutations
  const [updateProjectProgress] = useUpdateProjectProgressMutation();
  const [updateProjectMilestones] = useUpdateProjectMilestonesMutation();
  const [updateProjectMilestoneDates] =
    useUpdateProjectMilestoneDatesMutation();

  // Keep "local" flow chart state for when the flowchart changes
  const [_milestones, _setMilestones] = useState<string[]>(props.milestones);
  const [_milestoneDates, _setMilestoneDates] = useState<string[]>(
    props.milestoneDates
  );
  const [_milestoneProgress, _setMilestoneProgress] = useState<number[]>(
    props.milestoneProgress
  );

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
    props.milestones,
    props.milestoneDates,
    props.milestoneProgress,
    true
  );

  const [elements, setElements] = useState<any[]>(eles);

  //! ---------------------------------------------------------------------------

  useEffect(() => {
    if (props.milestoneProgress && currNode.id != null) {
      let tmp = [];
      props.milestoneProgress.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newProgress["progress"]);
          } else {
            tmp.push(ele);
          }
        }
      });
      props.setMilestoneProgress(tmp);
      _setMilestoneProgress(tmp);
      props.setKeepMounted(false);
    }
  }, [newProgress]);

  useEffect(() => {
    setElements(
      init_elements(
        props.milestones,
        props.milestoneDates,
        _milestoneProgress,
        true
      )
    );
    if (projectId && props.milestoneProgress) {
      updateProjectProgress({
        variables: {
          updateProjectProgressId: projectId,
          milestoneProgress: props.milestoneProgress,
        },
      });
      // !! Only if person is in pod
      if (props.showAlert) {
        const body = generateSms(props.milestoneProgress);
        sendMessages(props.username, props.usersData, body);
      }
    }
  }, [_milestoneProgress]);

  //! ---------------------------------------------------------------------------

  useEffect(() => {
    if (props.milestones && currNode.id != null) {
      let tmp = [];
      props.milestones.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newMilestone["text"]);
          } else {
            tmp.push(ele);
          }
        }
      });
      props.setKeepMounted(false);
      _setMilestones(tmp);
      props.setMilestones(tmp);
    }
  }, [newMilestone]);

  useEffect(() => {
    setElements(
      init_elements(
        _milestones,
        props.milestoneDates,
        props.milestoneProgress,
        true
      )
    );
    if (projectId && props.milestones) {
      updateProjectMilestones({
        variables: {
          updateProjectMilestonesId: projectId,
          milestones: props.milestones,
        },
      });
    }
  }, [_milestones]);

  //! ---------------------------------------------------------------------------

  useEffect(() => {
    if (props.milestoneDates && currNode.id != null) {
      let tmp = [];
      props.milestoneDates.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newMilestoneDate["date"]);
          } else {
            tmp.push(ele);
          }
        }
      });
      const sortedData = sortMilestones(
        props.milestones,
        tmp,
        props.milestoneProgress
      );

      if (sortedData) {
        props.setMilestones(sortedData["milestones"]);
        props.setMilestoneDates(sortedData["dates"]);
        props.setMilestoneProgress(sortedData["progress"]);
      }
      props.setKeepMounted(false);
      _setMilestones(sortedData["milestones"]);
      _setMilestoneDates(sortedData["dates"]);
      _setMilestoneProgress(sortedData["progress"]);
    }
  }, [newMilestoneDate]);

  useEffect(() => {
    setElements(
      init_elements(
        props.milestones,
        _milestoneDates,
        props.milestoneProgress,
        true
      )
    );
    if (projectId && props.milestoneDates) {
      updateProjectMilestoneDates({
        variables: {
          updateProjectMilestoneDatesId: projectId,
          milestoneDates: props.milestoneDates,
        },
      });
    }
  }, [_milestoneDates]);

  //! ---------------------------------------------------------------------------

  const onNodeContextMenu = (event, _) => {
    event.preventDefault();
  };

  const onNodeMouseEnter = (_, node) => {
    if (!isOpen) {
      setCurrNode(node);
      setCanClick(true);
    }
  };

  const onNodeMouseLeave = (_, node) => {
    setCanClick(false);
  };

  const close = () => setIsOpen(false);

  const onClick = () => {
    if (canClick) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Box
      h={"100%"}
      w={"100%"}
      bg={"#1a202c"}
      border={{ base: "1px solid #7e9cd6", md: "none" }}
      borderRadius={"lg"}
    >
      {loading && !data ? (
        <div> loading... </div>
      ) : (
        <>
          <ReactFlow
            unselectable="off"
            nodes={elements[0]}
            edges={elements[1]}
            nodesConnectable={false}
            fitView
            selectNodesOnDrag={false}
            zoomOnPinch={true}
            zoomOnScroll={false}
            zoomOnDoubleClick={false}
            panOnDrag={true}
            onNodeContextMenu={onNodeContextMenu}
            suppressHydrationWarning={true}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeMouseLeave={onNodeMouseLeave}
            nodesDraggable={false}
            preventScrolling={false}
            onClick={() => {
              onClick();
            }}
          >
            <Background gap={50} size={2} color="firebrick" />
            <Box>
              <ProjectProgressPopover
                projectId={projectId}
                close={close}
                isOpen={isOpen}
                milestoneDates={props.milestoneDates}
                milestoneProgress={props.milestoneProgress}
                milestones={props.milestones}
                currNode={currNode}
                setNewProgress={setNewProgress}
                setNewMilestone={setNewMilestone}
                setNewMilestoneDate={setNewMilestoneDate}
                setIsOpen={setIsOpen}
                setShowAlert={props.setShowAlert}
                setMilestones={props.setMilestones}
                setMilestoneDates={props.setMilestoneDates}
                setMilestoneProgress={props.setMilestoneProgress}
              />
            </Box>
          </ReactFlow>
        </>
      )}
    </Box>
  );
};

export default FlowChartMain;
