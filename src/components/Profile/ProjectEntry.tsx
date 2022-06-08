import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  GridItem,
  Heading,
  Link,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import {
  ProjectQuery,
  useDeleteProjectMutation,
  useRemoveProjectFromPodMutation,
  useUpdateProjectNameMutation,
} from "../../generated/graphql";
import { NextDueDate, ProjectVis } from "./InnerProjectEntry";
import useOutsideAlerter from "./nameChangeFunc";

interface ProjectProps {
  project: ProjectQuery["project"]["project"];
  isChangingName: boolean;
  setIsChangingName: React.Dispatch<React.SetStateAction<boolean>>;
  wrapperRef: React.MutableRefObject<HTMLDivElement>;
}

export const Project: React.FC<ProjectProps> = ({
  project,
  isChangingName,
  setIsChangingName,
  wrapperRef,
}) => {
  const [deleteProject] = useDeleteProjectMutation();
  const [newName, setNewName] = useState<string>(project?.projectName);
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsChangingName(false);
      handleUpdateProjectName();
    }
  };

  useOutsideAlerter(
    wrapperRef,
    isChangingName,
    setIsChangingName,
    newName,
    handleUpdateProjectName
  );

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
                  // Then delete project
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
