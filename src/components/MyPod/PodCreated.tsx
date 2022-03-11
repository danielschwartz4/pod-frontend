import { HStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { usePodQuery, useProjectQuery } from "../../generated/graphql";
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

  // !! Need to call this in resolver instead
  // const projects = [];
  // for (const key in podData?.pod?.pod?.projectIds) {
  //   const { data } = useProjectQuery({
  //     variables: {
  //       id: podData?.pod?.pod?.projectIds[key],
  //     },
  //   });
  //   projects.push(data);
  // }

  const twoProjects = (
    <div>
      <HStack spacing={"48px"} justifyContent={"center"}>
        {/* {projects.map((p, i) => (
          <PodCard
            updatedAt={p.updatedAt}
            createdAt={p.createdAt}
            overview={p.overview}
            projectName={p.projectName}
          />
        ))} */}
      </HStack>

      {children}
    </div>
  );

  if (podData?.pod?.pod?.projectIds.length == 2) {
    return twoProjects;
  }
  if (podData?.pod?.pod?.projectIds.length == 3) {
    return <div>3 projects</div>;
  }
  if (podData?.pod?.pod?.projectIds.length == 4) {
    return <div>4 projects</div>;
  }
  return <div>something went wrong</div>;
};
