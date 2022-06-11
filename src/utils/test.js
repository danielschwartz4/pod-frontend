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
    console.log(dayIdx);
    // if (dayIdxs.has(dayIdx)) {
    let currDay = Object.assign([], dayCount[dayIdx]);
    console.log("CURRDAY", currDay);

    // let prev = currDay[currDay.length - 1];
    // let newCount = prev == undefined ? 1 : prev["idx"] + 1;
    // let entry = { idx: newCount, date: d };
    let j = new Date(d);
    let entry = { date: j };
    console.log("ENTRY", entry);
    currDay.push(entry);
    console.log("CURRDAY2", currDay);
    dayCount[dayIdx] = currDay;
    console.log("DAYCOUNT", dayCount);
    // console.log(dayCount);
    // }
    console.log("--------------------- ");
  }
  return dayCount;
}

console.log(
  numOccurrencesBetweenTwoDates(
    new Date(2022, 6, 12),
    new Date(2022, 6, 29),
    new Set([1, 3, 5])
  )
);
