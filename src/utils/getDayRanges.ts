import { RANGE_DAYS, TODAY } from "../constants";
import { SingleTask } from "../generated/graphql";
import { beforeToday, daysEqual } from "./getConsistency";

export const singleTasksToTodayHelper = (singleTasks: SingleTask[]) => {
  const res = singleTasks?.filter(
    (task) =>
      beforeToday(new Date(task?.actionDate), TODAY) ||
      daysEqual(new Date(task?.actionDate), TODAY)
  );
  return res;
};

export const singleTasksRangeDaysHelper = (
  singleTasksToToday: SingleTask[]
) => {
  const res = singleTasksToToday.slice(-RANGE_DAYS.week);
  return res;
};
