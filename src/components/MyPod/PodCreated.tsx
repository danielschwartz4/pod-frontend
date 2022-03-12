import { HStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  usePodProjectsQuery,
  usePodQuery,
  useProjectQuery,
} from "../../generated/graphql";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import PodCard from "./PodCard";

interface PodCreatedProps {}
// !! If length of users is 1 then say waiting for more users
export const PodCreated: React.FC<PodCreatedProps> = ({ children }) => {
  const { data: projectData, loading: projectDataLoading } =
    useGetProjectFromUrl();

  const { data: podData } = usePodQuery({
    variables: { podId: projectData?.project?.project.podId },
  });

  if (podData?.pod?.errors) {
    return <div>No pod data!</div>;
  }

  const { data: projectsData } = usePodProjectsQuery({
    variables: { podId: podData?.pod?.pod?.id },
  });

  const twoProjects = (
    <div>
      <HStack spacing={"48px"} justifyContent={"center"}>
        {projectsData?.podProjects.map((p, i) => (
          <PodCard
            updatedAt={p.updatedAt}
            createdAt={p.createdAt}
            overview={p.overview}
            projectName={p.projectName}
            key={p.id}
          />
        ))}
      </HStack>
    </div>
  );

  if (podData?.pod?.pod?.projectIds.length == 2) {
    return (
      <div>
        {twoProjects}
        {children}
      </div>
    );
  }
  if (podData?.pod?.pod?.projectIds.length == 3) {
    return (
      <div>
        3 projects
        {children}
      </div>
    );
  }
  if (podData?.pod?.pod?.projectIds.length == 4) {
    return (
      <div>
        4 projects
        {children}
      </div>
    );
  }
  return (
    <div>
      something went wrong
      {children}
    </div>
  );
};
