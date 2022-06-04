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
import Section from "./Section";

interface removalProps extends accountProps {}

const Removal: React.FC<removalProps> = ({ refetch }) => {
  const [deleteUser] = useDeleteUserMutation();
  const [getProjectsData, { data: projectsData }] = useProjectsLazyQuery();
  const [removeProjectFromPod] = useRemoveProjectFromPodMutation();
  const [updateProjectPod] = useUpdateProjectPodMutation();

  return (
    <Section>
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
                  // update project pod
                  await updateProjectPod({
                    variables: {
                      podId: 0,
                      updateProjectPodId: project?.id,
                    },
                  });
                  // remove project from pod
                  const pod = await removeProjectFromPod({
                    variables: {
                      removeProjectFromPodId: project?.podId,
                      projectId: project?.id,
                    },
                  });
                }
              });
              //  Then delete user
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
    </Section>
  );
};

export default Removal;
