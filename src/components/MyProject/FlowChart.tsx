import { Box } from "@chakra-ui/react";
import React from "react";
import ReactFlow from "react-flow-renderer";
import { useMeQuery } from "../../generated/graphql";
import ProgressPopover from "./ProgressPopover";

interface horizontalFlowProps {
  milestones?: string[];
  milestoneProgress;
  isMainProject?: boolean;
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

const FlowChart: React.FC<horizontalFlowProps> = ({
  milestones,
  milestoneProgress,
  isMainProject = true,
}) => {
  const { data, loading } = useMeQuery({});

  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  let goingRight;

  const elements = [];
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
            // !! (e, node) => console.log(node)
            nodesDraggable={false}
          >
            {isMainProject ? (
              <Box>
                <ProgressPopover open={open} close={close} isOpen={isOpen} />
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
