import {
  Box,
  Button,
  ButtonGroup,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import {
  ProjectDocument,
  ProjectQuery,
  useMeQuery,
  useUpdateProjectProgressMutation,
} from "../../generated/graphql";
import init_elements from "../../utils/initElements";
import { generateSms } from "../../utils/smsBody";
import { useGetIntId } from "../../utils/useGetIntId";
import { sendMessage } from "../Sms/sendMessage";
import ProgressPopover from "./ProgressPopover";

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
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  showAlert?: boolean;
}

const FlowChartMain: React.FC<horizontalFlowProps> = ({
  milestones,
  milestoneDates,
  milestoneProgress,
  setShowAlert,
  showAlert,
}) => {
  const { data, loading } = useMeQuery({});

  const [updateProjectProgress] = useUpdateProjectProgressMutation();
  const projectId = useGetIntId();

  const [isOpen, setIsOpen] = useState(false);
  const open = (_, node) => {
    setCurrNode(node);
    setIsOpen(!isOpen);
  };
  const close = () => setIsOpen(false);

  const [milestoneProg, setMilestoneProg] =
    useState<number[]>(milestoneProgress);

  const [currNode, setCurrNode] = useState<Node>({} as Node);

  const [newProgress, setNewProgress] = useState<{
    id: string;
    progress: number;
  }>({
    id: "",
    progress: 1,
  } as {
    id: string;
    progress: number;
  });

  const eles = init_elements(milestones, milestoneDates, milestoneProg);
  const [elements, setElements] = useState<any[]>(eles);

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
    setElements(init_elements(milestones, milestoneDates, milestoneProg));
    if (projectId && milestoneProg) {
      updateProjectProgress({
        variables: {
          updateProjectProgressId: projectId,
          milestoneProgress: milestoneProg,
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
      // !! Only if person is in pod
      if (showAlert) {
        const body = generateSms(milestoneProg);
        sendMessage({ to: "+12173817277", body: body });
      }
    }
  }, [milestoneProg]);

  const onNodeContextMenu = (event, _) => {
    event.preventDefault();
  };

  const onLoad = (instance) => setTimeout(() => instance.fitView(), 0);

  return (
    <Box h={"100%"} bg={"#1a202c"}>
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
            onNodeMouseEnter={open}
            nodesDraggable={false}
            preventScrolling={false}
          >
            <Background
              gap={50}
              size={2}
              color="firebrick"
              style={{ background: "gray.800" }}
            />
            <Box>
              <ProgressPopover
                close={close}
                isOpen={isOpen}
                completionDate={
                  typeof currNode.id === "string"
                    ? milestoneDates[currNode.id.split("-")[1]].split(" 00")[0]
                    : null
                }
              >
                <PopoverBody>
                  <Box>
                    {typeof currNode.id === "string"
                      ? milestones[currNode.id.split("-")[1]]
                      : null}
                  </Box>
                </PopoverBody>

                <PopoverFooter d="flex" justifyContent="center">
                  <ButtonGroup size="sm">
                    <Button
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setNewProgress({ id: currNode.id, progress: 1 });
                      }}
                      background="#F26D51"
                    >
                      not started!
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
                        setShowAlert(true);
                      }}
                      background="#3EE76D"
                    >
                      all done!
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </ProgressPopover>
            </Box>
          </ReactFlow>
        </>
      )}
    </Box>
  );
};

export default FlowChartMain;