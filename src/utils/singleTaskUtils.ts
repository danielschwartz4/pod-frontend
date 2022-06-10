import { RecurringTaskResponse } from "../generated/graphql";
import { DaysType } from "../types";

export function convertToSingleTasks(
  responseTask: RecurringTaskResponse["task"]
) {
  const days = responseTask.days as DaysType;

  const singleTasks = [];
  let numTasks: number;
  if (responseTask.endOptions.neverEnds) {
    numTasks = 10;
  } else if (responseTask.endOptions.date) {
    const daysCount = numOccurrencesBetweenTwoDates(
      responseTask.startDate,
      responseTask.endOptions.date
    );
  } else {
    numTasks = responseTask.endOptions.repetitinos;
  }
}

function numOccurrencesBetweenTwoDates(start: Date, end: Date) {
  var dayCount = {
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
  }; //0 is sunday and 6 is saturday
  for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
    dayCount[d.getDay()]++;
  }
}
