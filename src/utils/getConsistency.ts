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
  // try {
  singleTasks.forEach((task) => {
    if (task?.status == "completed") compCount++;
  });
  //     const tmpDate = new Date(task?.actionDate);
  //     const daysAreEqual = daysEqual(today, tmpDate);
  //     if (daysAreEqual) {
  //       throw BreakException;
  //     }
  //   });
  // } catch (e) {
  //   if (e !== BreakException) throw e;
  // }
  return compCount;
};

export const getDaysBetween = (startDate: Date, endDate: Date) => {
  const mili = endDate.getTime() - startDate.getTime();
  return mili / (1000 * 60 * 60 * 24);
};

export const daysEqual = (date1: Date, date2: Date) => {
  let isEqual = false;
  isEqual =
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear();
  // console.log(isEqual);
  // return date1.toDateString() == date2.toDateString();
  return isEqual;
};

export const beforeToday = (otherDate: Date, today: Date) => {
  // let isBefore = false;
  // isBefore = otherDate.getFullYear() <= today.getFullYear();
  // if (isBefore) {
  //   isBefore = otherDate.getMonth() <= today.getMonth();
  // }
  // if (isBefore) {
  //   isBefore = otherDate.getDate() < today.getDate();
  // }

  // return isBefore;
  return otherDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
};
