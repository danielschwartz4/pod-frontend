import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactFlow from "react-flow-renderer";
import {
  ProjectDocument,
  ProjectQuery,
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
  milestoneDates: string[];
  milestoneProgress: number[];
  isMainProject?: boolean;
}

const FlowChart: React.FC<horizontalFlowProps> = ({
  milestones,
  milestoneDates,
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
  const [newProgress, setNewProgress] = useState({ id: "", progress: 1 } as {
    id: string;
    progress: number;
  });

  const eles = init_elements(
    milestones,
    milestoneDates,
    milestoneProgress,
    isMainProject
  );
  const [elements, setElements] = useState(eles);

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
    setElements(
      init_elements(milestones, milestoneDates, milestoneProg, isMainProject)
    );
    updateProjectProgress({
      variables: {
        milestoneProgress: milestoneProg,
        updateProjectProgressId: projectId,
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
  }, [milestoneProg]);

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
            onNodeDoubleClick={open}
            nodesDraggable={false}
          >
            {isMainProject ? (
              <Box>
                <ProgressPopover close={close} isOpen={isOpen}>
                  <ButtonGroup size="sm">
                    <Button
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setNewProgress({ id: currNode.id, progress: 1 });
                      }}
                      background="#F26D51"
                    >
                      not yet!
                    </Button>
                    <Button
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setNewProgress({ id: currNode.id, progress: 2 });
                      }}
                      background="#6097F8"
                    >
                      in progress
                    </Button>
                    <Button
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setNewProgress({ id: currNode.id, progress: 3 });
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
