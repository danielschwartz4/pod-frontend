import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactFlow from "react-flow-renderer";
import { useMeQuery } from "../../generated/graphql";
import ProgressPopover from "./ProgressPopover";

interface horizontalFlowProps {
  milestones: string[];
  milestoneProgress: number[];
  isMainProject?: boolean;
}

interface Node {
  id: string;
}

const nodeProgressMap = {
  1: "#F26D51",
  2: "#6097F8",
  3: "#3EE76D",
};

const edgeProgressMap = {
  1: true,
  2: true,
  3: false,
};

function init_elements(
  milestones: string[],
  milestoneProgress: number[],
  isMainProject: boolean
) {
  const elements = [];
  let goingRight: boolean;

  milestones?.forEach((element, i) => {
    if (i % 3 == 0) {
      goingRight = !goingRight;
    }

    elements.push({
      id: "horizontal-" + i,
      sourcePosition: i % 3 == 2 ? "bottom" : goingRight ? "right" : "left",
      targetPosition: i % 3 == 0 ? "top" : goingRight ? "left" : "right",
      type: i == 0 ? "input" : null,
      data: isMainProject ? { label: milestones[i] } : { label: i + 1 },
      position: goingRight
        ? { x: 275 * (i % 3), y: Math.floor(i / 3) * 100 }
        : { x: 275 * (2 - (i % 3)), y: Math.floor(i / 3) * 200 },
      style: {
        background: nodeProgressMap[milestoneProgress[i]],
        color: "black",
        border: "1px solid #222138",
      },
    });

    if (i > 0) {
      elements.push({
        id: "e" + i,
        arrowHeadType: "arrow",
        source: "horizontal-" + (i - 1),
        target: "horizontal-" + i,
        animated: edgeProgressMap[milestoneProgress[i]],
        sourcePosition: i % 3 == 2 ? "bottom" : goingRight ? "right" : "left",
        targetPosition: i % 3 == 2 ? "top" : goingRight ? "left" : "right",
      });
    }
  });
  return elements;
}

const FlowChart: React.FC<horizontalFlowProps> = ({
  milestones,
  milestoneProgress,
  isMainProject = true,
}) => {
  const { data, loading } = useMeQuery({});

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
  }, [milestoneProg]);
  // !! Sometimes pressing a color won't work

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
