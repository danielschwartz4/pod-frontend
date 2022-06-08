import { useRecurringTaskQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetProjectFromUrl = () => {
  const whole = useGetIntId();
  const type = whole[0];
  const intId = whole[1];
  if (type == "t") {
    return useRecurringTaskQuery({
      skip: intId === -1,
      variables: {
        recurringTaskId: intId,
      },
    });
  }
};
