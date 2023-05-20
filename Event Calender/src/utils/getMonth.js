// require is not working with react
import dayjs from "dayjs";

export function entireMonth(month, year) {
  // gets first date of the month
  const firstDate = dayjs().year(year).month(month).startOf("month");

  // gets last date of the month
  const lastDate = dayjs().year(year).month(month).endOf("month");

  // used to store all dates that will be displayed in the 7 by 7 grid
  const allDates = [];
  const thisMonthsDates = [];
  const nextMonthsDates = [];
  const previousMonthsDates = [];
  const gridDimension = 42; // 6 rows by 7 columns

  // getting the days of the current month to fill the grid
  for (let i = firstDate.date(); i <= lastDate.date(); i++) {
    // get the date of the current day; in this case i
    let date = dayjs().year(year).month(month).date(i).get("date");
    let status = true;

    let dict = {
      date: date,
      status: status,
    };

    // add it in the total dates array
    thisMonthsDates.push(dict);
  }

  // getting the days of the previous month to fill the grid
  for (let i = 1; i < firstDate.day() + 1; i++) {
    let date = dayjs()
      .year(year)
      .month(month)
      .date(i - firstDate.day())
      // 1 of this month is Monday (1), so we subtract 1 to get the last day of the previous month
      .get("date");

    let status = false;
    let dict = {
      date: date,
      status: status,
    };

    previousMonthsDates.push(dict);
  }

  // add the previous month dates to the total dates array
  // as well as the current month dates
  allDates.push(...previousMonthsDates);
  allDates.push(...thisMonthsDates);

  // getting the days of the next month to fill the grid
  for (let i = 1; i <= gridDimension - allDates.length; i++) {
    let date = dayjs().year(year).month(month).date(i).get("date");
    let status = false;

    let dict = {
      date: date,
      status: status,
    };
    nextMonthsDates.push(dict);
  }

  allDates.push(...nextMonthsDates);
  // converting into a 6 by 7 grid
  const grid = [];

  while (allDates.length) grid.push(allDates.splice(0, 7));

  console.log(grid);
  return grid;
}
