import { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./BookingFormList.module.scss";

const BookingList = ({
  events,
  setEditingEvent,
  setShowEventPopup,
}) => {
  // State to store the list of events, ensuring re-render when `events` updates
  const [renderedEvents, setRenderedEvents] = useState([]);

  // useEffect runs whenever `events` changes, updating the state
  useEffect(() => {
    setRenderedEvents([...events]); // Spread operator ensures a fresh copy
  }, [events]);

  // Edit Event
  const handleEditEvents = (event) => {
    // console.log("handleEditEvents");
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  // Delete Event
  const handleDeleteEvent = (eventId) => {
    // const updatedEvents = events.filter((event) => event.id !== eventId);
    // setEvents(updatedEvents);
  };

  return (
      <>
        <h2>You have requested the below date/s</h2>
        <p>Please look out for a confirmation email for your booking request</p>
        <hr />
        {renderedEvents.map((event, index) => {
          // Convert event date string to a Date object
          const bookingDate = new Date(event.eventDate);

          // Format the date for display (fallback if date is invalid)
          const formattedBookingDate = bookingDate
            ? bookingDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "Invalid Date";

          return (
            <div className={classNames(styles["event"])} key={index}>
              {/* Wrapper for date and time display */}
              <div className={classNames(styles["event-date-wrapper"])}>
                <div className={classNames(styles["event-date"])}>
                  {formattedBookingDate}
                </div>
                <div className={classNames(styles["event-time"])}>
                  {event.time}
                </div>
              </div>

              {/* Display the event note */}
              <div className={classNames(styles["event-text"])}>
                {event.eventNote}
              </div>

              {/* Action buttons for editing and deleting */}
              <div className={classNames(styles["event-buttons"])}>
                <i
                  className="bx bxs-edit-alt"
                  onClick={() => handleEditEvents(event)}
                ></i>
                <i
                  className="bx bxs-trash-alt"
                  onClick={() => handleDeleteEvent(event.id)}
                ></i>
              </div>
            </div>
          );
        })}
        <hr />
      </>
  );
};

export default BookingList;
