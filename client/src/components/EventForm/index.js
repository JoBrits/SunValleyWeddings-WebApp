import { useState } from "react";

// Styles
import classNames from "classnames";
import styles from "./EventForm.module.scss";

// Hooks
import { useEventForm } from "../../hooks/useEventForm";

const EventForm = ({
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
  const [eventGuests, setEventGuests] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  // from bookingForm hook
  const { request, error, isLoading } = useEventForm();

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
      guests: eventGuests,
    };

    let updatedEvents = [...events];
    
    if (editingEvent) { // editing event
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event
      );
    } else { // new event
      updatedEvents.push(newEvent);
      handleRequest(newEvent);
    }

    // sort events
    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // setEvents([...events, newEvent]);
    setEvents(updatedEvents);
    setEventTime({ hours: "00", minutes: "00" });
    setEventGuests("");
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
    setEventGuests(event.text);
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
  const handleRequest = async (newEventRequest) => {

    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Date:", date);
    // console.log("Time:", time);
    // console.log("Text:", text);

    // use custom hook to send a request to backend
    await request(newEventRequest.name, newEventRequest.email, newEventRequest.date, newEventRequest.time, newEventRequest.text);

  };

  return (
    <form className="general-form">
      {showEventPopup && (
        <>
          <h2>Event request details for </h2>
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
          <label>Number Of Guests:</label>
          <input
              type="number"
              name="guests"
              value={eventGuests}
              onChange={(e) => setEventGuests(e.target.value)}
            />
          <hr />
          <button disabled={isLoading} className="button" onClick={handleEventsSubmit}>
            {editingEvent ? "Update" : "Book"}
          </button>
        </>
      )}

      {error && <div className="error">{error}</div>}

      {/* List  closed when new and editing an event */}
      {!showEventPopup && events.length > 0 && (
        <>
          <h2>You have booked the below date/s</h2>
          <p>
            Send a confirmation email for the booking request
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

export default EventForm;
