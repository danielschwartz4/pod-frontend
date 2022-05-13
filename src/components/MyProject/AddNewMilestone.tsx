import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import {
  ProjectDocument,
  ProjectQuery,
  useUpdateProjectMilestoneDatesMutation,
  useUpdateProjectMilestonesMutation,
  useUpdateProjectProgressMutation,
} from "../../generated/graphql";

interface AddNewMilestoneProps {
  milestones: string[];
  milestoneDates: string[];
  milestoneProgress: number[];
  projectId: number;
}

const AddNewMilestone: React.FC<AddNewMilestoneProps> = ({
  milestoneDates,
  milestones,
  milestoneProgress,
  projectId,
}) => {
  const [updateProjectMilestoneDates] =
    useUpdateProjectMilestoneDatesMutation();
  const [updateProjectMilestones] = useUpdateProjectMilestonesMutation();
  const [updateProjectProgress] = useUpdateProjectProgressMutation();
  let _milestones = Object.assign([], milestones);
  let _milestoneDates = Object.assign([], milestoneDates);
  let _milestoneProgress = Object.assign([], milestoneProgress);
  return (
    <Box>
      <Box>
        <Flex alignItems={"center"} mt={4}>
          <Box>
            <Button
              h={"48px"}
              type="submit"
              borderRadius={6}
              cursor="pointer"
              onClick={async () => {
                _milestones.push("HOVER TO EDIT TEXT AND DATE 💡📆");
                _milestoneDates.push("");
                _milestoneProgress.push(1);
                const response = await updateProjectMilestones({
                  variables: {
                    updateProjectMilestonesId: projectId,
                    milestones: _milestones,
                  },
                  update: (cache, { data }) => {
                    cache.writeQuery<ProjectQuery>({
                      query: ProjectDocument,
                      data: {
                        __typename: "Query",
                        project: {
                          errors: data?.updateProjectMilestones.errors,
                          project: data?.updateProjectMilestones.project,
                        },
                      },
                    });
                  },
                });
                if (response.data?.updateProjectMilestones) {
                  const response2 = await updateProjectMilestoneDates({
                    variables: {
                      updateProjectMilestoneDatesId: projectId,
                      milestoneDates: _milestoneDates,
                    },
                    update: (cache, { data }) => {
                      cache.writeQuery<ProjectQuery>({
                        query: ProjectDocument,
                        data: {
                          __typename: "Query",
                          project: {
                            errors: data?.updateProjectMilestoneDates.errors,
                            project: data?.updateProjectMilestoneDates.project,
                          },
                        },
                      });
                    },
                  });
                  if (response2.data?.updateProjectMilestoneDates) {
                    console.log("success");
                  }
                }
                const response3 = await updateProjectProgress({
                  variables: {
                    updateProjectProgressId: projectId,
                    milestoneProgress: _milestoneProgress,
                  },
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
                if (response3.data?.updateProjectProgress) {
                  // !! Terrible practice
                  window.location.reload();
                  console.log("success");
                }
              }}
            >
              Add milestone
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default AddNewMilestone;
