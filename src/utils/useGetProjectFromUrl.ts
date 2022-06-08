import { useProjectQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetProjectFromUrl = () => {
  const whole = useGetIntId();
  const type = whole[0];
  const intId = whole[1];
  if (type == "p") {
    return useProjectQuery({
      skip: intId === -1,
      variables: {
        id: intId,
      },
    });
  }
};
