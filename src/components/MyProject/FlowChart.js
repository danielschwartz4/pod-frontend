import { dividerClasses } from "@mui/material";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";

import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import { useMeQuery, useProjectsQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const onNodeContextMenu = (event, node) => {
  event.preventDefault();
  console.log("context menu:", node);
};

const HorizontalFlow = () => {
  const { data, loading } = useMeQuery({});
  // const [x, changeX] = useState(0);

  // !! We are getting Bad Request Error when adding this line

  const { data: projectData } = useProjectsQuery({
    variables: { userId: data?.me?.id },
  });

  const elements = [];
  projectData?.projects[3]?.milestones.forEach((element, i) => {
    elements.push({
      id: "horizontal-" + i,
      sourcePosition: "right",
      targetPosition: "left",
      type: i == 0 ? "input" : null,
      data: { label: projectData?.projects[3]?.milestones[i] },
      position: { x: 200 * (i % 4), y: Math.floor(i / 4) * 100 },
    });
    if (i > 0) {
      elements.push({
        id: "e" + i,
        source: "horizontal-" + (i - 1),
        target: "horizontal-" + i,
      });
    }
    // changeX(x + 100);
  });

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  return (
    <>
      {loading && !data ? (
        <div> loading... </div>
      ) : (
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          nodesConnectable={false}
          onLoad={onLoad}
          selectNodesOnDrag={false}
          zoomOnPinch={false}
          zoomOnScroll={true}
          zoomOnDoubleClick={false}
          paneMoveable={false}
          onNodeContextMenu={onNodeContextMenu}
        />
      )}
    </>
  );
};

export default HorizontalFlow;
