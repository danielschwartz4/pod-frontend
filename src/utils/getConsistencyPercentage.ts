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
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  let isMatch = false;
  let compCount = 0;
  try {
    singleTaskData?.singleTasks?.singleTasks.forEach((task) => {
      const tmpDate = new Date(task?.actionDate);
      isMatch =
        tmpDate.getDate() == todayDate &&
        tmpDate.getMonth() == todayMonth &&
        tmpDate.getFullYear() == todayYear;
      if (isMatch) {
        throw BreakException;
      } else {
        if (task?.status == "completed") compCount++;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }
  console.log(compCount);
  return compCount;
};

export const getDaysBetween = (startDate: Date, endDate: Date) => {
  const mili = endDate.getTime() - startDate.getTime();
  return mili / (1000 * 60 * 60 * 24);
};
