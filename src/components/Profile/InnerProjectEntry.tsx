import { Box, Heading } from "@chakra-ui/react";
import { TODAY } from "../../constants";
import { ProjectQuery } from "../../generated/graphql";
import formatDate from "../../utils/formatDate";
import { generateProgress } from "../../utils/projectSmsBody";
import { ToProjectPageId } from "./ToPageId";

interface Props {
  project: ProjectQuery["project"]["project"];
}

export const ProjectEntryHeading: React.FC<Props> = ({ project }) => {
  return (
    <Heading fontSize={"xl"}>
      <ToProjectPageId project={project}>
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

export const ProjectVis: React.FC<Props> = ({ project }) => {
  return (
    <Box ml={4}>
      <ToProjectPageId project={project}>
        <_ProjectVis project={project} />
      </ToProjectPageId>
    </Box>
  );
};

const _NextProjectDueDate: React.FC<Props> = ({ project }) => {
  let nextDueDate = project?.milestoneDates?.find((date) => {
    let d = new Date(date);
    return d > TODAY;
  });
  if (!nextDueDate) {
    nextDueDate = project?.milestoneDates?.find((date) => {
      return date != "";
    });
    if (nextDueDate == undefined) {
      return <Box>Next target date: N/A</Box>;
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
