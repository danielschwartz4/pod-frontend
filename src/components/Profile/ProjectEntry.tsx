import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  ProjectQuery,
  useDeleteProjectMutation,
  useRemoveProjectFromPodMutation,
  useUpdateProjectNameMutation,
} from "../../generated/graphql";
import {
  NextProjectDueDate,
  ProjectEntryHeading,
  ProjectVis,
} from "./InnerProjectEntry";
import useOutsideAlerter from "./nameChangeFunc";
import { ProfileGridItem } from "./ProfileGridItem";

interface ProjectEntryProps {
  project: ProjectQuery["project"]["project"];
  isChangingName: boolean;
  setIsChangingName: React.Dispatch<React.SetStateAction<boolean>>;
  wrapperRef: React.MutableRefObject<HTMLDivElement>;
  toId: string;
}

const ProjectEntry: React.FC<ProjectEntryProps> = ({
  project,
  isChangingName,
  setIsChangingName,
  wrapperRef,
  toId,
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
    <ProfileGridItem type={"project"}>
      <Box textAlign={"center"} margin={"auto"}>
        <ProjectEntryHeading toId={toId} project={project} />
      </Box>
      <Box>
        <NextProjectDueDate project={project} />
      </Box>
      <Box>
        <ProjectVis toId={toId} project={project} />
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
    </ProfileGridItem>
  );
};

export default ProjectEntry;
