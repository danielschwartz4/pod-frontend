import { utimes } from "fs";
import { useRouter } from "next/router";
import { useProjectQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetProjectFromUrl = () => {
  const intId = useGetIntId();
  return useProjectQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
};
