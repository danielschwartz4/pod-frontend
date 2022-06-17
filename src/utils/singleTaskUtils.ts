import { RecurringTaskResponse } from "../generated/graphql";
import { DaysType } from "../types/types";

export type EntryType = {
  idx: number;
  actionDate: Date;
  actionDay: number;
};

export type EntriesType = EntryType[];

type DayDictType = {
  0: EntriesType;
  1: EntriesType;
  2: EntriesType;
  3: EntriesType;
  4: EntriesType;
  5: EntriesType;
  6: EntriesType;
};

export function convertToSingleTasks(
  recurringTask: RecurringTaskResponse["task"],
  selectedDaysIdxs: Set<number>
) {
  let numTasks: number;
  let singleTasksData: DayDictType;
  if (recurringTask.endOptions.neverEnds) {
    let endDate = addDays(28, recurringTask.startDate);
    singleTasksData = dataBetweenTwoDates(
      new Date(recurringTask.startDate),
      endDate,
      selectedDaysIdxs
    );
  } else if (recurringTask.endOptions.date) {
    singleTasksData = dataBetweenTwoDates(
      new Date(recurringTask.startDate),
      new Date(recurringTask.endOptions.date),
      selectedDaysIdxs
    );
  } else {
    numTasks = recurringTask.endOptions.repetitions;
    let endDate = addDays(numTasks * 7, recurringTask.startDate);
    singleTasksData = dataBetweenTwoDates(
      new Date(recurringTask.startDate),
      endDate,
      selectedDaysIdxs
    );
  }
  return singleTasksData;
}

function dataBetweenTwoDates(start: Date, end: Date, dayIdxs: Set<number>) {
  var dayDict = {
    0: [] as EntriesType,
    1: [] as EntriesType,
    2: [] as EntriesType,
    3: [] as EntriesType,
    4: [] as EntriesType,
    5: [] as EntriesType,
    6: [] as EntriesType,
  } as DayDictType;
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

export function addDays(days: number, startDate: Date) {
  const newDate = new Date(startDate);
  return new Date(+newDate + 1000 * 60 * 60 * 24 * days);
}
