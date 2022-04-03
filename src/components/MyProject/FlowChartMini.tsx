import React from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import { useMeQuery } from "../../generated/graphql";
import init_elements from "../../utils/initElements";

interface Node {
  id: string;
  milestoneDates: string[];
  data: {
    label: string;
  };
  date: string;
}

interface horizontalFlowProps {
  milestones: string[];
  milestoneDates: string[];
  milestoneProgress: number[];
}

const FlowChartMini: React.FC<horizontalFlowProps> = ({
  milestones,
  milestoneDates,
  milestoneProgress,
}) => {
  const { data, loading } = useMeQuery({});

  const elements = init_elements(milestones, milestoneDates, milestoneProgress);

  const onNodeContextMenu = (event, _) => {
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
            nodesDraggable={false}
            preventScrolling={false}
          >
            <Background
              gap={50}
              size={2}
              color="firebrick"
              style={{ background: "gray.800" }}
            />
          </ReactFlow>
        </>
      )}
    </>
  );
};

export default FlowChartMini;
