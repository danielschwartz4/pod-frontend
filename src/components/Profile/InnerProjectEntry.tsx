import { Box, Heading } from "@chakra-ui/react";
import { ProjectQuery } from "../../generated/graphql";
import formatDate from "../../utils/formatDate";
import { generateProgress } from "../../utils/smsBody";
import { ToProjectPageId } from "./ToPageId";

interface Props {
  project: ProjectQuery["project"]["project"];
}

interface ExtProps extends Props {
  toId: string;
}

export const ProjectEntryHeading: React.FC<ExtProps> = ({ project, toId }) => {
  return (
    <Heading fontSize={"xl"}>
      <ToProjectPageId toId={toId}>
        {project?.podId == 0 ? "not in pod yet" : "pod #: " + project?.podId}
      </ToProjectPageId>
    </Heading>
  );
};

const _ProjectVis: React.FC<Props> = ({ project }) => {
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

export const ProjectVis: React.FC<ExtProps> = ({ project, toId }) => {
  return (
    <Box ml={4}>
      <ToProjectPageId toId={toId}>
        <_ProjectVis project={project} />
      </ToProjectPageId>
    </Box>
  );
};

const _NextProjectDueDate: React.FC<Props> = ({ project }) => {
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

export const NextProjectDueDate: React.FC<Props> = ({ project }) => {
  return (
    <Box ml={4}>
      <_NextProjectDueDate project={project} />
    </Box>
  );
};
