import { RecurringTaskResponse } from "../generated/graphql";
import { DaysType } from "../types";

export function convertToSingleTasks(
  responseTask: RecurringTaskResponse["task"]
) {
  const days = responseTask.days as DaysType;

  const singleTasks = [];
  let numTasks: number;
  let daysCount;
  if (responseTask.endOptions.neverEnds) {
    numTasks = 10;
  } else if (responseTask.endOptions.date) {
    daysCount = numOccurrencesBetweenTwoDates(
      new Date(responseTask.startDate),
      new Date(responseTask.endOptions.date)
    );
  } else {
    numTasks = responseTask.endOptions.repetitinos;
  }
  return daysCount;
}

function numOccurrencesBetweenTwoDates(start: Date, end: Date) {
  var dayCount = {
    0: [{ idx: 0, date: Date() }],
    1: [{ idx: 0, date: Date() }],
    2: [{ idx: 0, date: Date() }],
    3: [{ idx: 0, date: Date() }],
    4: [{ idx: 0, date: Date() }],
    5: [{ idx: 0, date: Date() }],
    6: [{ idx: 0, date: Date() }],
  };
  for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const currDay = dayCount[d.getDay()];
    const prev = dayCount[d.getDay()][currDay.length - 1];
    const newCount = prev["idx"] + 1;
    const newDate = d;
    const entry = { idx: newCount, date: newDate };
    dayCount[d.getDay()].push(entry);
  }
  return dayCount;
}
