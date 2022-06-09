import { useRecurringTaskQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetTaskFromUrl = () => {
  const intId = useGetIntId();
  return useRecurringTaskQuery({
    skip: intId === -1,
    variables: {
      recurringTaskId: intId,
    },
  });
};
