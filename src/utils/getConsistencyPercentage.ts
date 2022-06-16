import { SingleTasksQuery } from "../generated/graphql";
import { addDays } from "./singleTaskUtils";

const BreakException = {};

const statusMap = {
  completed: 1,
  missed: 0,
  overdue: 0,
  tbd: 0,
};

export const getConsistencyCount = (
  singleTaskData: SingleTasksQuery,
  today: Date
) => {
  let compCount = 0;
  try {
    singleTaskData?.singleTasks?.singleTasks.forEach((task) => {
      const tmpDate = new Date(task?.actionDate);
      const daysAreEqual = daysEqual(today, tmpDate);
      if (daysAreEqual) {
        throw BreakException;
      } else {
        if (task?.status == "completed") compCount++;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }
  return compCount;
};

export const getDaysBetween = (startDate: Date, endDate: Date) => {
  const mili = endDate.getTime() - startDate.getTime();
  return mili / (1000 * 60 * 60 * 24);
};

export const daysEqual = (date1: Date, date2) => {
  let isMatch = false;
  isMatch =
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear();
  return isMatch;
};
