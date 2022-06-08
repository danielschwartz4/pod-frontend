import NextLink from "next/link";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";

import { ProjectQuery } from "../../generated/graphql";
import formatDate from "../../utils/formatDate";
import { generateProgress } from "../../utils/smsBody";

interface Props {
  project: ProjectQuery["project"]["project"];
}

export const ProjectHeading: React.FC<Props> = ({ project }) => {
  return (
    <Heading fontSize={"xl"}>
      <NextLink href="/project/[id]" as={`/project/${project?.id}`}>
        <Link>
          {project?.podId == 0 ? "not in pod yet" : "pod #: " + project?.podId}
        </Link>
      </NextLink>
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
      <NextLink href="/project/[id]" as={`/project/${project?.id}`}>
        <Link>
          <_ProjectVis project={project} />
        </Link>
      </NextLink>
    </Box>
  );
};

const _NextDueDate: React.FC<Props> = ({ project }) => {
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

export const NextDueDate: React.FC<Props> = ({ project }) => {
  return (
    <NextLink href="/project/[id]" as={`/project/${project?.id}`}>
      <Link>
        <Box ml={4}>
          <_NextDueDate project={project} />
        </Box>
      </Link>
    </NextLink>
  );
};
