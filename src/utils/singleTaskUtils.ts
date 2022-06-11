import { RecurringTaskResponse } from "../generated/graphql";
import { DaysType } from "../types";

export function convertToSingleTasks(
  responseTask: RecurringTaskResponse["task"]
) {
  const days = responseTask.days as DaysType;
  const dayIdxs = extractDaysIdxs(days);

  const singleTasks = [];
  let numTasks: number;
  let daysCount;
  if (responseTask.endOptions.neverEnds) {
    numTasks = 10;
  } else if (responseTask.endOptions.date) {
    daysCount = numOccurrencesBetweenTwoDates(
      new Date(responseTask.startDate),
      new Date(responseTask.endOptions.date),
      // new Set([1, 3, 5])
      dayIdxs
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
  var dayDict = {
    0: [] as EntriesType,
    1: [] as EntriesType,
    2: [] as EntriesType,
    3: [] as EntriesType,
    4: [] as EntriesType,
    5: [] as EntriesType,
    6: [] as EntriesType,
  };
  console.log("HERE", dayDict);
  for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const dayIdx = d.getDay();
    if (dayIdxs.has(dayIdx)) {
      const currDay = dayDict[dayIdx];
      const prev = dayDict[dayIdx][currDay.length - 1];
      const newCount = prev ? prev["idx"] + 1 : 1;
      const entry = { idx: newCount, date: d };
      dayDict = dayDict[dayIdx].push(entry);
    }
  }
  return dayDict;
}

function extractDaysIdxs(days: DaysType) {
  let idxs = new Set<number>();
  Object.keys(days).forEach((day) => {
    if (days[day].isSelected) {
      idxs.add(parseInt(day));
    }
  });
  return idxs;
}
