import { useState } from "react";

// Styles
import classNames from "classnames";
import styles from "./Calendar.module.scss";

const Calendar = ({selectedDate, setSelectedDate, showEventPopup, setShowEventPopup}) => {
  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();

  // State
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Calc Days in currentMonth month
  // currentMonth + 1, 0 =  0 day of the next month gives the number of the days for the previous month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // Calc Day in the week
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // testing
  // console.log("currentMonth = " + currentMonth);
  // console.log("currentYear = " + currentYear);
  // console.log("currentDate = " + currentDate);
  // console.log("daysInMonth = " + daysInMonth);
  // console.log("firstDayOfMonth = " + firstDayOfMonth);
  // console.log("firstDayOfMonth = " + daysOfTheWeek[firstDayOfMonth]);

  // Set previous month
  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  // Set next month
  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  // Calendar function
  const handleDayClicks = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    // Conditional to check for same date, as time stamp will be different
    const isSameDay = (date1, date2) => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };

    // Conditional for only current and future dates can be set
    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      console.log("Selected date:", clickedDate);
      setShowEventPopup(true);
    }
  };

  return (
    <div className={classNames(styles["calendar-container"])}>
      
      <div className={classNames(styles["calendar"])}>
        <div className={classNames(styles["navigate-date"])}>
          <h2 className={classNames(styles["month"])}>
            {monthsOfYear[currentMonth]}
          </h2>
          <h2 className={classNames(styles["year"])}>{currentYear}</h2>
          <div className={classNames(styles["buttons"])}>
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>

        {/* Map through daysOfTheWeek array */}
        <div className={classNames(styles["weekdays"])}>
          {daysOfTheWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className={classNames(styles["days"])}>
          {/* Used spread operator to get empty blocks for calendar*/}
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {/* Used spread operator to get the rest of the days in month*/}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                // Conditional for current-day class
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? classNames(styles["current-day"])
                  : // Conditional for past-day class
                  currentYear < currentDate.getFullYear() ||
                    (currentMonth <= currentDate.getMonth() &&
                      day + 1 < currentDate.getDate())
                  ? classNames(styles["past-day"])
                  : ""
              }
              onClick={() => handleDayClicks(day + 1)} // Event popup
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Calendar;
