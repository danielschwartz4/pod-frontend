import { WarningIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import {
  useDeleteUserMutation,
  useProjectsLazyQuery,
  useRemoveProjectFromPodMutation,
  useUpdateProjectPodMutation,
} from "../../generated/graphql";
import { accountProps } from "./Account";

interface removalProps extends accountProps {}

const Removal: React.FC<removalProps> = ({ refetch }) => {
  const [deleteUser] = useDeleteUserMutation();
  const [getProjectsData, { data: projectsData }] = useProjectsLazyQuery();
  const [removeProjectFromPod] = useRemoveProjectFromPodMutation();
  const [updateProjectPod] = useUpdateProjectPodMutation();

  return (
    <Flex
      textColor={"gray.500"}
      fontSize={"lg"}
      justifyContent={"space-between"}
      direction={"column"}
      m={4}
      p={4}
      bg={"gray.800"}
      w={"500px"}
      h={"100px"}
      rounded={"lg"}
    >
      <Box mt={-4}>
        <Text fontSize={24} textColor={"gray.500"}>
          <b>ACCOUNT REMOVAL</b>
        </Text>
      </Box>
      <Flex>
        <Box mr={"auto"}>
          <Button
            colorScheme={"red"}
            onClick={async () => {
              const data = await getProjectsData();
              data?.data?.projects?.forEach(async (project) => {
                if (project?.podId != 0) {
                  await updateProjectPod({
                    variables: {
                      podId: 0,
                      updateProjectPodId: project?.id,
                    },
                  });
                  const pod = await removeProjectFromPod({
                    variables: {
                      removeProjectFromPodId: project?.podId,
                      projectId: project?.id,
                    },
                  });
                }
              });
              const user = await deleteUser();
              if (user) {
                refetch();
              }
            }}
          >
            <Text>delete account</Text>
          </Button>
        </Box>
        <Box>
          <WarningIcon />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Removal;
