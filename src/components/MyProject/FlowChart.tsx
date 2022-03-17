import React from "react";
import ReactFlow from "react-flow-renderer";
import { ProjectQuery, useMeQuery } from "../../generated/graphql";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";

interface horizontalFlowProps {
  milestones?: string[];
}

const HorizontalFlow: React.FC<horizontalFlowProps> = ({ milestones }) => {
  const { data, loading } = useMeQuery({});

  // const { data: projectData } = useGetProjectFromUrl();
  // !! Delete this and git push
  // !! If something breaks, change milestones in FlowChart, MyProject, and PodCard back to projectData
  const elements = [];
  // projectData?.project?.project?.milestones.forEach((element, i) => {
  milestones?.forEach((element, i) => {
    elements.push({
      id: "horizontal-" + i,
      sourcePosition: "right",
      targetPosition: "left",
      type: i == 0 ? "input" : null,
      // data: { label: projectData?.project?.project?.milestones[i] },
      data: { label: milestones[i] },
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
          style={{ width: "100%", height: "100%" }}
          elements={elements}
          nodesConnectable={false}
          onLoad={onLoad}
          selectNodesOnDrag={false}
          zoomOnPinch={false}
          zoomOnScroll={true}
          zoomOnDoubleClick={false}
          paneMoveable={true}
          onNodeContextMenu={onNodeContextMenu}
        />
      )}
    </>
  );
};

export default HorizontalFlow;
