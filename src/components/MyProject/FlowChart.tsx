import React from "react";
import ReactFlow, { Background, MiniMap } from "react-flow-renderer";
import { ProjectQuery, useMeQuery } from "../../generated/graphql";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";

interface horizontalFlowProps {
  milestones?: string[];
}

const HorizontalFlow: React.FC<horizontalFlowProps> = ({ milestones }) => {
  const { data, loading } = useMeQuery({});

  const elements = [];
  let goingRight;

  milestones?.forEach((element, i) => {
    if (i % 3 == 0) {
      goingRight = !goingRight;
    }

    elements.push({
      id: "horizontal-" + i,
      sourcePosition: i % 3 == 2 ? "bottom" : goingRight ? "right" : "left",
      targetPosition: i % 3 == 0 ? "top" : goingRight ? "left" : "right",
      type: i == 0 ? "input" : null,
      data: { label: milestones[i] },
      position: goingRight
        ? { x: 275 * (i % 3), y: Math.floor(i / 3) * 100 }
        : { x: 275 * (2 - (i % 3)), y: Math.floor(i / 3) * 200 },
    });

    if (i > 0) {
      elements.push({
        id: "e" + i,
        arrowHeadType: "arrow",
        source: "horizontal-" + (i - 1),
        target: "horizontal-" + i,
        sourcePosition: i % 3 == 2 ? "bottom" : goingRight ? "right" : "left",
        targetPosition: i % 3 == 2 ? "top" : goingRight ? "left" : "right",
      });
    }
  });

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    console.log("context menu:", node);
  };

  const nodeColor = (node) => {
    switch (node.type) {
      case "input":
        return "red";
      case "default":
        return "#00ff00";
      case "output":
        return "rgb(0,0,255)";
      default:
        return "#eee";
    }
  };

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
          ></ReactFlow>
        </>
      )}
    </>
  );
};

export default HorizontalFlow;
