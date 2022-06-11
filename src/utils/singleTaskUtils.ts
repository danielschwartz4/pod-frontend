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
      new Date(responseTask.endOptions.date),
      new Set([1, 3, 5])
    );
  } else {
    numTasks = responseTask.endOptions.repetitinos;
  }
  return daysCount;
}

type EntryType = { idx: number; date: Date };

function numOccurrencesBetweenTwoDates(
  start: Date,
  end: Date,
  dayIdxs: Set<number>
) {
  var dayCount = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };
  for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const dayIdx = d.getDay();
    if (dayIdxs.has(dayIdx)) {
      const currDay = dayCount[dayIdx];
      const prev = dayCount[dayIdx][currDay.length - 1];
      const newCount = prev ? prev["idx"] + 1 : 1;
      const entry = { idx: newCount, date: d };
      dayCount[dayIdx].push(entry);
    }
  }
  return dayCount;
}

// function numOccurrencesBetweenTwoDates(start: Date, end: Date) {
//   var dayCount = {
//     0: [{ idx: 0, date: Date() }],
//     1: [{ idx: 0, date: Date() }],
//     2: [{ idx: 0, date: Date() }],
//     3: [{ idx: 0, date: Date() }],
//     4: [{ idx: 0, date: Date() }],
//     5: [{ idx: 0, date: Date() }],
//     6: [{ idx: 0, date: Date() }],
//   };
//   // !! Don't make it so it only works if day is in the set of chosen
//   // !! Incase the person changes their mind about the days (or maybe do at first)

//   // !! We are adding each of these as a row to singleTask data fram so
//   // !! add the meta data: "completed", "notes", "expected completion date to the object"
//   // !! Get all of this done tomorrow bitchh
//   for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
//     const currDay = dayCount[d.getDay()];
//     const prev = dayCount[d.getDay()][currDay.length - 1];
//     const newCount = prev["idx"] + 1;
//     const newDate = d;
//     const entry = { idx: newCount, date: newDate };
//     dayCount[d.getDay()].push(entry);
//   }
//   return dayCount;
// }
