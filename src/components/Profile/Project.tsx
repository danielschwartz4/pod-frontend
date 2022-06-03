import { DeleteIcon } from "@chakra-ui/icons";
import {
  GridItem,
  VStack,
  Divider,
  Box,
  Heading,
  Flex,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  ProjectQuery,
  useDeleteProjectMutation,
  useRemoveProjectFromPodMutation,
  useUpdateProjectNameMutation,
} from "../../generated/graphql";
import formatDate from "../../utils/formatDate";
import { generateProgress, generateSms } from "../../utils/smsBody";

interface ProjectProps {
  project: ProjectQuery["project"]["project"];
}

export const Project: React.FC<ProjectProps> = ({ project }) => {
  const [deleteProject] = useDeleteProjectMutation();
  const [newName, setNewName] = useState<string>(project?.projectName);
  const [isChangingName, setIsChangingName] = useState<boolean>(false);
  const [updateProjectName] = useUpdateProjectNameMutation();
  const [removeProjectFromPod] = useRemoveProjectFromPodMutation();

  const handleUpdateProjectName = async () => {
    updateProjectName({
      variables: {
        updateProjectNameId: project?.id,
        projectName: newName,
      },
    });
  };

  // Ref for handling outside click
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          isChangingName
        ) {
          handleUpdateProjectName();
          setIsChangingName(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, isChangingName, newName]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsChangingName(false);
      handleUpdateProjectName();
    }
  };

  return (
    <GridItem borderRadius={8} h={"auto"} bg="#4c5e81">
      <VStack
        divider={
          <Box>
            <Divider
              color={"gray.700"}
              mx={"auto"}
              w={"90%"}
              orientation="horizontal"
              display={""}
            />
          </Box>
        }
        align="stretch"
        h={"250px"}
      >
        <Box textAlign={"center"} margin={"auto"}>
          <Heading fontSize={"xl"}>
            <NextLink href="/project/[id]" as={`/project/${project?.id}`}>
              <Link>
                {project?.podId == 0
                  ? "not in pod yet"
                  : "pod #: " + project?.podId}
              </Link>
            </NextLink>
          </Heading>
        </Box>
        <Box>
          <NextLink href="/project/[id]" as={`/project/${project?.id}`}>
            <Link>
              <Box ml={4}>
                <NextDueDate project={project} />
              </Box>
            </Link>
          </NextLink>
        </Box>
        <Box>
          <Box ml={4}>
            <NextLink href="/project/[id]" as={`/project/${project?.id}`}>
              <Link>
                <ProjectVis project={project} />
              </Link>
            </NextLink>
          </Box>
        </Box>
        <Box>
          <Flex alignItems={"center"} mb={6}>
            <Box ml={"1em"}>
              <Box
                ref={wrapperRef}
                onClick={() => {
                  setIsChangingName(true);
                }}
                cursor={isChangingName ? "text" : "pointer"}
              >
                {isChangingName ? (
                  <input
                    maxLength={30}
                    autoFocus={true}
                    type="text"
                    value={newName}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                  />
                ) : (
                  newName
                )}
              </Box>
            </Box>

            <Box ml={"auto"} mr={"1em"}>
              <DeleteIcon
                cursor={"pointer"}
                onClick={async () => {
                  const pod = project?.podId;
                  if (pod != 0) {
                    // First remove project from pod
                    await removeProjectFromPod({
                      variables: {
                        removeProjectFromPodId: project?.podId,
                        projectId: project?.id,
                      },
                    });
                  }
                  await deleteProject({
                    variables: {
                      deleteProjectId: project?.id,
                    },
                    update: (cache, { data }) => {
                      if (data?.deleteProject) {
                        cache.evict({ id: "Project:" + project?.id });
                      }
                    },
                  });
                }}
              />
            </Box>
          </Flex>
        </Box>
      </VStack>
    </GridItem>
  );
};

const ProjectVis: React.FC<ProjectProps> = ({ project }) => {
  let progress = project?.milestoneProgress;
  let progressVis;
  if (progress.length > 7) {
    progress = progress.slice(0, 7);
    progressVis = generateProgress(progress) + " ...";
  } else {
    progressVis = generateProgress(progress);
  }
  return <Box>{progressVis}</Box>;
};

const NextDueDate: React.FC<ProjectProps> = ({ project }) => {
  const today = new Date();
  let nextDueDate = project?.milestoneDates.find((date) => {
    let d = new Date(date);
    return d > today;
  });
  if (!nextDueDate) {
    nextDueDate = project?.milestoneDates.find((date) => {
      return date != "";
    });

    if (nextDueDate == undefined) {
      return <Box>Next target date: NA</Box>;
    }
    return <Box>Next target date: {formatDate(nextDueDate)}*</Box>;
  }

  return <Box>Next target date: {formatDate(nextDueDate)}</Box>;
};
