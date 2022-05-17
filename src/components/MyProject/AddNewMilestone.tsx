import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import {
  ProjectDocument,
  useUpdateProjectMilestoneDatesMutation,
  useUpdateProjectMilestonesMutation,
  useUpdateProjectProgressMutation,
} from "../../generated/graphql";

interface AddNewMilestoneProps {
  milestones: string[];
  milestoneDates: string[];
  milestoneProgress: number[];
  projectId: number;
  setMilestones: React.Dispatch<React.SetStateAction<string[]>>;
  setMilestoneDates: React.Dispatch<React.SetStateAction<string[]>>;
  setMilestoneProgress: React.Dispatch<React.SetStateAction<number[]>>;
}

const AddNewMilestone: React.FC<AddNewMilestoneProps> = ({
  milestoneDates,
  milestones,
  milestoneProgress,
  projectId,
  setMilestones,
  setMilestoneDates,
  setMilestoneProgress,
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
                });
                if (response.data?.updateProjectMilestones) {
                  console.log("success");
                }
                const response2 = await updateProjectMilestoneDates({
                  variables: {
                    updateProjectMilestoneDatesId: projectId,
                    milestoneDates: _milestoneDates,
                  },
                });
                if (response2.data?.updateProjectMilestoneDates) {
                  console.log("success");
                }
                const response3 = await updateProjectProgress({
                  variables: {
                    updateProjectProgressId: projectId,
                    milestoneProgress: _milestoneProgress,
                  },
                });
                if (response3.data?.updateProjectProgress) {
                  setMilestones(_milestones);
                  setMilestoneDates(_milestoneDates);
                  setMilestoneProgress(_milestoneProgress);
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
