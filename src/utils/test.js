function sortByDate(dates) {
  dates.sort(function (a, b) {
    const aDate = a.actionDate;
    const bDate = b.actionDate;
    return aDate.getTime() < bDate.getTime()
      ? -1
      : aDate.getTime() == bDate.getTime()
      ? 0
      : 1;
  });
  console.log(dates);
}

console.log(new Date(new Date().setDate(new Date().getDate() - 1)));
