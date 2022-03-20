import React, { useEffect, useState } from "react";
import ReactFlow, { Background, MiniMap } from "react-flow-renderer";
import { ProjectQuery, useMeQuery } from "../../generated/graphql";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";

interface horizontalFlowProps {
  milestones?: string[];
  // onLoad;
  showText?: boolean;
}

const FlowChart: React.FC<horizontalFlowProps> = ({
  milestones,
  // onLoad,
  showText = true,
}) => {
  const { data, loading } = useMeQuery({});

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
      data: showText ? { label: milestones[i] } : { label: i + 1 },
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
          ></ReactFlow>
        </>
      )}
    </>
  );
};

export default FlowChart;
