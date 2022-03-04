import React from "react";
import ReactFlow from "react-flow-renderer";
import { useMeQuery } from "../../generated/graphql";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";

interface horizontalFlowProps {}

const HorizontalFlow: React.FC<horizontalFlowProps> = ({}) => {
  const { data, loading } = useMeQuery({});

  const { data: projectData } = useGetProjectFromUrl();

  const elements = [];
  projectData?.project?.project?.milestones.forEach((element, i) => {
    elements.push({
      id: "horizontal-" + i,
      sourcePosition: "right",
      targetPosition: "left",
      type: i == 0 ? "input" : null,
      data: { label: projectData?.project?.project?.milestones[i] },
      position: { x: 200 * (i % 4), y: Math.floor(i / 4) * 100 },
    });
    if (i > 0) {
      elements.push({
        id: "e" + i,
        source: "horizontal-" + (i - 1),
        target: "horizontal-" + i,
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

  return (
    <>
      {loading && !data ? (
        <div> loading... </div>
      ) : (
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
        />
      )}
    </>
  );
};

export default HorizontalFlow;
