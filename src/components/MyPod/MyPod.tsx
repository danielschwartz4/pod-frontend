import React from "react";
import { useIsAuth } from "../../utils/usIsAuth";

interface MyPodProps {}

export const MyPod: React.FC<MyPodProps> = ({}) => {
  useIsAuth();
  // If the user is not in a pod

  return <div>My pod</div>;
};
