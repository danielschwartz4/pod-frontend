import { SingleTasksQuery } from "../generated/graphql";

export const getConsistencyPercentage = (
  startDate: Date,
  endDate: Date,
  singleTaskData: SingleTasksQuery
) => {
  const numDays = getDaysBetween(startDate, endDate);
  singleTaskData?.singleTasks?.singleTasks.some((task) => {
    return;
  });

  return;
};

export const getDaysBetween = (startDate: Date, endDate: Date) => {
  const mili = endDate.getTime() - startDate.getTime();
  return mili / (1000 * 60 * 60 * 24);
};
