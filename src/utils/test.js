// export type EntryType = { idx: number; date: Date };

function numOccurrencesBetweenTwoDates(start, end, dayIdxs) {
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
      const newDate = d;
      const entry = { idx: newCount, date: d };
      dayCount[dayIdx].push(entry);
    }
  }
  return dayCount;
}

console.log(
  numOccurrencesBetweenTwoDates(
    new Date(2022, 6, 12),
    new Date(2022, 6, 19),
    new Set([1, 3, 5])
  )
);
