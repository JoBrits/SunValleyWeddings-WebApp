import { useState } from "react";

// Styles
import classNames from "classnames";
import styles from "./BookingForm.module.scss";

// Hooks
import { useBookingForm } from "../../hooks/useBookingForm";

const BookingForm = ({
  selectedDate,
  setSelectedDate,
  showEventPopup,
  setShowEventPopup,
}) => {
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

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  // from bookingForm hook
  const { request, error, isLoading } = useBookingForm();

  // Events Functions
  // Add event
  const handleEventsSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(), //handle creating new and existing event
      name: name,
      email: email,
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, "0")} : ${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };

    // editing event
    let updatedEvents = [...events];
    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event
      );
    } else {
      updatedEvents.push(newEvent);
      handleRequest(newEvent);
    }

    // sort events
    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // setEvents([...events, newEvent]);
    setEvents(updatedEvents);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
    setEditingEvent(null);
  };

  // Edit Event
  const handleEditEvents = (event) => {
    setSelectedDate(new Date(event.date));
    setEventTime({
      hours: event.time.split(":")[0],
      minutes: event.time.split(":")[1],
    });
    setEventText(event.text);
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  // Delete Event
  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  // Format time correctly function
  const handleTimeChange = (e) => {
    const { name, value } = e.target; // destructure time

    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, "0"),
    })); // insures correct time render
  };

  // API Request function
  const handleRequest = async (requested) => {
   
    // use custom hook to send a request to backend
    await request(name, email, requested);

  };

  return (
    <form className="general-form">
      {showEventPopup && (
        <>
          <h2>Booking request details for </h2>
          <div className="general-form-date">
            <p>
              {selectedDate.getDate()}{" "}
              {monthsOfYear[`${selectedDate.getMonth()}`]}
            </p>
            <button
              className={classNames(styles["close-event-popup"])}
              onClick={() => setShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
          <hr />
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Time:</label>
          <div className={classNames(styles["time-input"])}>
            <input
              type="number"
              name="hours"
              min={0}
              max={24}
              className={classNames(styles["hours"])}
              value={eventTime.hours}
              onChange={handleTimeChange}
            />
            <p>:</p>
            <input
              type="number"
              name="minutes"
              min={0}
              max={60}
              className={classNames(styles["minutes"])}
              value={eventTime.minutes}
              onChange={handleTimeChange}
            />
          </div>
          <label>Booking Details:</label>
          <textarea
            placeholder="Enter Event Text (Maximum character 60)"
            value={eventText}
            onChange={(e) => {
              // conditional for maximum characters of 60
              if (e.target.value.length <= 60) {
                setEventText(e.target.value);
              }
            }}
          ></textarea>
          <hr />
          <button disabled={isLoading} className="button" onClick={handleEventsSubmit}>
            {editingEvent ? "Update" : "Request a booking"}
          </button>
        </>
      )}

      {error && <div className="error">{error}</div>}

      {/* List  closed when new and editing an event */}
      {!showEventPopup && events.length > 0 && (
        <>
          <h2>You have requested the below date/s</h2>
          <p>
            Please look out for a confirmation email for your booking request
          </p>
          <hr />
          {events.map((event, index) => (
            <div className={classNames(styles["event"])} key={index}>
              <div className={classNames(styles["event-date-wrapper"])}>
                <div className={classNames(styles["event-date"])}>{`${
                  monthsOfYear[event.date.getMonth()]
                } ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
                <div className={classNames(styles["event-time"])}>
                  {event.time}
                </div>
              </div>
              <div className={classNames(styles["event-text"])}>
                {event.text}
              </div>
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
          ))}
          <hr />
        </>
      )}
    </form>
  );
};

export default BookingForm;
