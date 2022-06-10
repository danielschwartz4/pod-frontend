function numOccurrencesBetweenTwoDates(start, end) {
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
    const newDate = new Date(d);
    const entry = { idx: newCount, date: newDate };
    dayCount[d.getDay()].push(entry);
  }
  return dayCount;
}

console.log(numOccurrencesBetweenTwoDates(new Date(), new Date(2023, 06, 10)));
