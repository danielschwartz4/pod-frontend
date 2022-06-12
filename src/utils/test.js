// export type EntryType = { idx: number; date: Date };

function numOccurrencesBetweenTwoDates(start, end, dayIdxs) {
  let dayCount = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  for (var d = start, i; d <= end; d.setDate(d.getDate() + 1)) {
    const dayIdx = d.getDay();
    if (dayIdxs.has(dayIdx)) {
      let currDay = dayCount[dayIdx];

      let prev = currDay[currDay.length - 1];
      let newCount = prev == undefined ? 1 : prev["idx"] + 1;

      let j = new Date(d);
      let entry = { idx: newCount, date: j };
      currDay.push(entry);
      dayCount[dayIdx] = currDay;
    }
  }
  return dayCount;
}

const date = new Date(2022, 6, 12);
const twoWeeks = new Date(+date + 12096e5);
console.log(twoWeeks);

console.log(
  numOccurrencesBetweenTwoDates(
    new Date(2022, 6, 12),
    new Date(twoWeeks),
    new Set([1, 3, 5])
  )
);
