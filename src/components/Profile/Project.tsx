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
  useDeleteProjectMutation,
  useUpdateProjectNameMutation,
} from "../../generated/graphql";

interface ProjectProps {
  project: {
    id: number;
    podId: number;
    projectName: string;
  };
}

export const Project: React.FC<ProjectProps> = ({ project }) => {
  const [deleteProject] = useDeleteProjectMutation();
  const [newName, setNewName] = useState<string>(project.projectName);
  const [isChangingName, setIsChangingName] = useState<boolean>(false);
  const [updateProjectName] = useUpdateProjectNameMutation();

  // Ref for handling outside click
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        console.log(isChangingName);
        if (ref.current && !ref.current.contains(event.target)) {
          console.log("clicked outside");
          setIsChangingName(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsChangingName(false);
    }
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    updateProjectName({
      variables: { updateProjectNameId: project.id, projectName: newName },
    });
  }, [newName]);

  return (
    <GridItem h={"auto"} bg="gray">
      <VStack
        divider={<Divider orientation="horizontal" />}
        spacing={4}
        align="stretch"
        h={"250px"}
      >
        <Box textAlign={"center"} h={"120px"} margin={"auto"}>
          <NextLink href="/project/[id]" as={`/project/${project.id}`}>
            <Link>
              <Heading fontSize="xl">
                {project.podId == 0
                  ? "not in pod yet"
                  : "podId: " + project.podId}
              </Heading>
            </Link>
          </NextLink>
        </Box>
        <Flex alignItems={"center"} mb={"1em"}>
          <Box
            ref={wrapperRef}
            ml={"1em"}
            onClick={() => setIsChangingName(true)}
          >
            {isChangingName ? (
              <input
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

          <Box ml={"auto"} mr={"1em"}>
            <DeleteIcon
              cursor={"pointer"}
              onClick={async () =>
                await deleteProject({
                  variables: {
                    deleteProjectId: project.id,
                  },
                  update: (cache, { data }) => {
                    if (data?.deleteProject) {
                      cache.evict({ id: "Project:" + project.id });
                    }
                  },
                })
              }
            />
          </Box>
        </Flex>
      </VStack>
    </GridItem>
  );
};
