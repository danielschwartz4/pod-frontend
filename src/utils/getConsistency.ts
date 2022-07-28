import { SingleTasksQuery } from "../generated/graphql";

const BreakException = {};

const statusMap = {
  completed: 1,
  missed: 0,
  overdue: 0,
  tbd: 0,
};

export const getConsistencyCount = (
  singleTasks: SingleTasksQuery["singleTasks"]["singleTasks"]
) => {
  let compCount = 0;
  singleTasks.forEach((task) => {
    if (task?.status == "completed") compCount++;
  });
  return compCount;
};

export const getDaysBetween = (startDate: Date, endDate: Date) => {
  const mili = endDate.getTime() - startDate.getTime();
  return mili / (1000 * 60 * 60 * 24);
};

export const daysEqual = (date1: Date, date2: Date) => {
  console.log(date1, date2);
  let isEqual = false;
  isEqual =
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear();
  return isEqual;
};

export const beforeToday = (otherDate: Date, today: Date) => {
  return otherDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
};
