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

type EntriesType = [{ idx: number; date: Date }?];

// !! We are adding each of these as a row to singleTask data fram so
// !! add the meta data: "completed", "notes" to the object"

function numOccurrencesBetweenTwoDates(
  start: Date,
  end: Date,
  dayIdxs: Set<number>
) {
  var dayCount = {
    0: [] as EntriesType,
    1: [] as EntriesType,
    2: [] as EntriesType,
    3: [] as EntriesType,
    4: [] as EntriesType,
    5: [] as EntriesType,
    6: [] as EntriesType,
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

function extractDaysIdxs(days: DaysType) {}
