import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import {
  ProjectDocument,
  ProjectQuery,
  useMeQuery,
  useUpdateProjectMilestonesMutation,
  useUpdateProjectProgressMutation,
} from "../../generated/graphql";
import { FlowNode } from "../../types";
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

  // Popover functionality
  const [isOpen, setIsOpen] = useState(false);
  const open = (_, node) => {
    setCurrNode(node);
    setIsOpen(!isOpen);
  };
  const close = () => setIsOpen(false);

  // Get the current node
  const [currNode, setCurrNode] = useState<FlowNode>({} as FlowNode);

  // Project progress
  const [updateProjectProgress] = useUpdateProjectProgressMutation();

  const [milestoneProg, setMilestoneProg] =
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

  const [milestoneText, setMilestoneText] = useState<string[]>(milestones);

  const [newMilestoneText, setNewMilestoneText] = useState<{
    id: string;
    text: string;
  }>({
    id: "",
    text: "",
    // typeof currNode.id === "string"
    //   ? milestoneText[currNode.id.split("-")[1]]
    //   : null,
  } as {
    id: string;
    text: string;
  });

  // Flowchart elements
  const eles = init_elements(
    milestoneText,
    milestoneDates,
    milestoneProg,
    true
  );

  const [elements, setElements] = useState<any[]>(eles);

  useEffect(() => {
    if (milestoneProg && currNode.id != null) {
      let tmp = [];
      milestoneProg.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newProgress["progress"]);
          } else {
            tmp.push(ele);
          }
        }
      });
      setMilestoneProg(tmp);
    }
  }, [newProgress]);

  useEffect(() => {
    setElements(init_elements(milestones, milestoneDates, milestoneProg, true));
    if (projectId && milestoneProg) {
      updateProjectProgress({
        variables: {
          updateProjectProgressId: projectId,
          milestoneProgress: milestoneProg,
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
        const body = generateSms(milestoneProg);
        sendMessage({ to: "+12173817277", body: body });
      }
    }
  }, [milestoneProg]);

  useEffect(() => {
    if (milestoneText && currNode.id != null) {
      let tmp = [];
      milestoneText.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newMilestoneText["text"]);
          } else {
            tmp.push(ele);
          }
        }
      });
      setMilestoneText(tmp);
    }
  }, [newMilestoneText]);

  useEffect(() => {
    setElements(
      init_elements(milestoneText, milestoneDates, milestoneProg, true)
    );
    if (projectId && milestoneText) {
      updateProjectMilestones({
        variables: {
          updateProjectMilestonesId: projectId,
          milestones: milestoneText,
        },
        // !! Do I actually need this
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
  }, [milestoneText]);

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
            // style={{ width: "100%", height: "100%" }}
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
                milestoneProgress={milestoneProg}
                milestones={milestones}
                currNode={currNode}
                setNewProgress={setNewProgress}
                updatedMilestoneText={milestoneText}
                setNewMilestoneText={setNewMilestoneText}
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
