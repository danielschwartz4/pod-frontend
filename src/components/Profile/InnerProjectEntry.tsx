import { Box } from "@chakra-ui/react";
import { ProjectQuery } from "../../generated/graphql";
import formatDate from "../../utils/formatDate";
import { generateProgress } from "../../utils/smsBody";

interface Props {
  project: ProjectQuery["project"]["project"];
}

export const ProjectVis: React.FC<Props> = ({ project }) => {
  let progress = project?.milestoneProgress;
  let progressVis: string;
  if (progress?.length > 7) {
    progress = progress.slice(0, 7);
    progressVis = generateProgress(progress) + " ...";
  } else {
    progressVis = generateProgress(progress);
  }
  return <Box>{progressVis}</Box>;
};

export const NextDueDate: React.FC<Props> = ({ project }) => {
  const today = new Date();
  let nextDueDate = project?.milestoneDates?.find((date) => {
    let d = new Date(date);
    return d > today;
  });
  if (!nextDueDate) {
    nextDueDate = project?.milestoneDates?.find((date) => {
      return date != "";
    });

    if (nextDueDate == undefined) {
      return <Box>Next target date: NA</Box>;
    }
    return <Box>Next target date: {formatDate(nextDueDate)}*</Box>;
  }

  return <Box>Next target date: {formatDate(nextDueDate)}</Box>;
};
