import { RecurringTaskResponse } from "../generated/graphql";
import { DaysType } from "../types/types";

export function convertToSingleTasks(
  responseTask: RecurringTaskResponse["task"],
  selectedDaysIdxs: Set<number>
) {
  let numTasks: number;
  let singleTasksData;
  if (responseTask.endOptions.neverEnds) {
    let endDate = addDays(28, responseTask.startDate);
    singleTasksData = dataBetweenTwoDates(
      new Date(responseTask.startDate),
      endDate,
      selectedDaysIdxs
    );
  } else if (responseTask.endOptions.date) {
    singleTasksData = dataBetweenTwoDates(
      new Date(responseTask.startDate),
      new Date(responseTask.endOptions.date),
      selectedDaysIdxs
    );
  } else {
    numTasks = responseTask.endOptions.repetitions;
    let endDate = addDays(numTasks * 7, responseTask.startDate);
    singleTasksData = dataBetweenTwoDates(
      new Date(responseTask.startDate),
      endDate,
      selectedDaysIdxs
    );
  }
  return singleTasksData;
}

export type EntriesType = {
  idx: number;
  actionDate: Date;
  actionDay: number;
}[];

function dataBetweenTwoDates(start: Date, end: Date, dayIdxs: Set<number>) {
  var dayDict = {
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
      let currDay = dayDict[dayIdx];
      let prev = currDay[currDay.length - 1];
      let newCount = prev == undefined ? 1 : prev["idx"] + 1;
      let newDate = new Date(d);
      let entry = {
        idx: newCount,
        actionDate: newDate,
        actionDay: dayIdx,
      };
      currDay.push(entry);
      dayDict[dayIdx] = currDay;
    }
  }
  return dayDict;
}

export function extractDaysIdxs(days: DaysType) {
  let idxs = new Set<number>();
  Object.keys(days).forEach((day) => {
    if (days[day].isSelected) {
      idxs.add(parseInt(day));
    }
  });
  return idxs;
}

function addDays(days: number, startDate: Date) {
  const newDate = new Date(startDate);
  return new Date(+newDate + 1000 * 60 * 60 * 24 * days);
}
