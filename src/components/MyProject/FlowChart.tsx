import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactFlow from "react-flow-renderer";
import {
  useMeQuery,
  useUpdateProjectProgressMutation,
} from "../../generated/graphql";
import ProgressPopover from "./ProgressPopover";
import init_elements from "../../utils/initElements";
import { useGetIntId } from "../../utils/useGetIntId";

interface Node {
  id: string;
}

interface horizontalFlowProps {
  milestones: string[];
  milestoneProgress: number[];
  isMainProject?: boolean;
}

const FlowChart: React.FC<horizontalFlowProps> = ({
  milestones,
  milestoneProgress,
  isMainProject = true,
}) => {
  const { data, loading } = useMeQuery({});

  const [updateProjectProgress] = useUpdateProjectProgressMutation();
  const projectId = useGetIntId();

  const [isOpen, setIsOpen] = useState(false);
  const open = (e, node) => {
    setCurrNode(node);
    setIsOpen(!isOpen);
  };
  const close = () => setIsOpen(false);

  const [milestoneProg, setMilestoneProg] = useState(milestoneProgress);
  const [currNode, setCurrNode] = useState({} as Node);
  const [newProgress, setNewProgress] = useState(1);

  const eles = init_elements(milestones, milestoneProgress, isMainProject);
  const [elements, setElements] = useState(eles);

  useEffect(() => {
    if (milestoneProg && currNode.id != null) {
      let tmp = [];
      milestoneProg.forEach((ele, i) => {
        if (typeof currNode.id === "string") {
          if (i == parseInt(currNode.id.split("-")[1])) {
            tmp.push(newProgress);
          } else {
            tmp.push(ele);
          }
        }
      });
      console.log(tmp);
      setMilestoneProg(tmp);
    }
  }, [newProgress]);

  useEffect(() => {
    setElements(init_elements(milestones, milestoneProg, isMainProject));
    updateProjectProgress({
      variables: {
        milestoneProgress: milestoneProg,
        updateProjectProgressId: projectId,
      },
    });
  }, [milestoneProg]);

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
  };

  const onLoad = (instance) => setTimeout(() => instance.fitView(), 0);

  return (
    <>
      {loading && !data ? (
        <div> loading... </div>
      ) : (
        <>
          <ReactFlow
            style={{ width: "100%", height: "100%" }}
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
            onNodeDoubleClick={open}
            nodesDraggable={false}
          >
            {isMainProject ? (
              <Box>
                <ProgressPopover close={close} isOpen={isOpen}>
                  <ButtonGroup size="sm">
                    <Button
                      onClick={() => {
                        // setMilestoneProg(milestoneProgress);
                        setNewProgress(1);
                      }}
                      background="#F26D51"
                    >
                      not yet!
                    </Button>
                    <Button
                      onClick={() => {
                        // setMilestoneProg(milestoneProgress);
                        setNewProgress(2);
                      }}
                      background="#6097F8"
                    >
                      in progress
                    </Button>
                    <Button
                      onClick={() => {
                        // setMilestoneProg(milestoneProgress);
                        setNewProgress(3);
                      }}
                      background="#3EE76D"
                    >
                      all done!
                    </Button>
                  </ButtonGroup>
                </ProgressPopover>
              </Box>
            ) : (
              <></>
            )}
          </ReactFlow>
        </>
      )}
    </>
  );
};

export default FlowChart;
