import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { useGetProjectFromUrl } from "../../utils/useGetProjectFromUrl";
import { useIsAuth } from "../../utils/usIsAuth";

interface MyPodProps {}

export const MyPod: React.FC<MyPodProps> = ({}) => {
  useIsAuth();
  // If the user is not in a pod
  const { data: projectData } = useGetProjectFromUrl();
  if (
    projectData?.project?.project?.podId == 0 ||
    !projectData?.project?.project?.podId
  ) {
    return <div>make project</div>;
  } else {
  }
  return <div>My pod</div>;
};
