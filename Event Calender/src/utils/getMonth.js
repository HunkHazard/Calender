// require is not working with react
import dayjs from "dayjs";

export function entireMonth(month, year) {
  const firstDate = dayjs().year(year).month(month).startOf("month");
  const lastDate = dayjs().year(year).month(month).endOf("month");

  const allDates = [];
  const gridDimension = 7 * 7;

  for (let i = firstDate.date(); i <= lastDate.date(); i++) {
    let date = dayjs().year(year).month(month).date(i).get("date");
    allDates.push(date);
  }

  // getting the days of the previous month to fill the grid
  for (let i = 1; i < firstDate.day() + 1; i++) {
    let date = dayjs()
      .year(year)
      .month(month)
      .date(i - firstDate.day())
      .get("date");
    allDates.unshift(date);
  }

  // getting the days of the next month to fill the grid
  for (let i = 1; i <= gridDimension - allDates.length; i++) {
    let date = dayjs().year(year).month(month).date(i).get("date");
    allDates.push(date);
  }

  console.log(allDates);
  return allDates;
}
