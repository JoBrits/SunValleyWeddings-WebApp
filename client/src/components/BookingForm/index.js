import { useCallback, useState, useEffect } from "react";

// Styles
import classNames from "classnames";
import styles from "./BookingForm.module.scss";

// Hooks
import { useBookingContext } from "../../hooks/useBookingContext";

// Booking Form list component

const BookingForm = ({
  selectedDate,
  setSelectedDate,
  setShowEventPopup,
  events,
  setEvents,
  editingEvent,
  setEditingEvent,
  isLoading,
  setIsLoading,
}) => {
  // fetch dispatch from useBookingContext
  const { dispatch } = useBookingContext();

  // Form fields state
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventGuests, setEventGuests] = useState(0);
  const [eventNote, setEventNote] = useState("");

  // Error, Empty and Character Limit fields fields returned from backend
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [characterLimitFields, setCharacterLimitFields] = useState([]);

  // Function to update states
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update local storage
    let storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      _id: editingEvent ? editingEvent._id : "", //handle creating new and existing event
      title,
      name,
      surname,
      email,
      eventDate: selectedDate,
      eventTime: `${eventTime.hours.padStart(
        2,
        "0"
      )} : ${eventTime.minutes.padStart(2, "0")}`,
      eventGuests,
      eventNote,
    };

    // Update Frontend UI
    let updatedEvents = [...events];

    if (editingEvent) {
      // Update existing booking in backend
      const response = await fetch(`/api/bookings/${newBooking._id}`, {
        method: "PUT",
        body: JSON.stringify(newBooking),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error); // return error message from backend/mongoose
        console.log("error = " + json.error);

        if (json.setCharacterLimitFields) {
          setCharacterLimitFields(json.setCharacterLimitFields); // set Character Limit fields returned from backend
          console.log("characterLimitFields = " + characterLimitFields);
        }

        if (json.emptyFields) {
          setEmptyFields(json.emptyFields); // set empty fields returned from backend
          console.log("emptyFields = " + emptyFields);
        }
      }

      if (response.ok) {
        // Save to local storage
        storedBookings = storedBookings.map((storedBooking) => {
          if (storedBooking._id === newBooking._id) {
            console.log("newBooking = " + newBooking);
          }

          return storedBooking._id === newBooking._id
            ? newBooking
            : storedBooking;
        });
        // console.log("booking updated", json);

        // Dispatch Booking State
        dispatch({ type: "UPDATE_BOOKING", payload: json });

        // Update existing booking
        updatedEvents = updatedEvents.map((event) =>
          event._id === editingEvent._id ? newBooking : event
        );
        // sort and update events
        updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        // Save updated bookings to localStorage
        localStorage.setItem("bookings", JSON.stringify(storedBookings));
      }
    } else {
      // Create new booking
      const response = await fetch("/api/bookings/", {
        method: "POST",
        body: JSON.stringify(newBooking),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error); // return error message from backend/mongoose
        console.log("error = " + json.error);

        if (json.setCharacterLimitFields) {
          setCharacterLimitFields(json.setCharacterLimitFields); // set Character Limit fields returned from backend
          console.log("characterLimitFields = " + characterLimitFields);
        }

        if (json.emptyFields) {
          setEmptyFields(json.emptyFields); // set empty fields returned from backend
          console.log("emptyFields = " + emptyFields);
        }
      }

      if (response.ok) {
        // Save to local storage
        console.log(json);
        localStorage.setItem(
          "bookings",
          JSON.stringify([json, ...storedBookings])
        );

        // console.log("new booking added", json);

        // Dispatch Booking State
        dispatch({ type: "CREATE_BOOKING", payload: json });

        // sort and update events
        updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        updatedEvents.push(newBooking);

        // Reset form fields
        setTitle("");
        setName("");
        setSurname("");
        setEmail("");
        setEventTime({ hours: "00", minutes: "00" });
        setEventGuests("");
        setEventNote("");
        setSelectedDate("");

        // Reset error states
        setError(null);
        setEmptyFields([]);
        setCharacterLimitFields([]);

        // Update Events for UI
        setEvents(updatedEvents);
        setEditingEvent(null);
        setShowEventPopup(false);
      }
    }
  };

  // Memoized function to prevent unnecessary re-renders
  const handleEditEvents = useCallback(
    (event) => {
      if (!event) return;
      setTitle(event.title);
      setName(event.name);
      setSurname(event.surname);
      setEmail(event.email);
      setSelectedDate(new Date(event.eventDate));
      setEventTime({
        hours: event.eventTime.split(" : ")[0],
        minutes: event.eventTime.split(" : ")[1],
      });
      setEventGuests(event.eventGuests);
      setEventNote(event.eventNote);
    },
    [setSelectedDate]
  );

  useEffect(() => {
    handleEditEvents(editingEvent);
  }, [editingEvent, handleEditEvents]); // Now handleEditEvents is memoized, preventing infinite loops

  // Format time correctly function
  const handleTimeChange = (e) => {
    const { name, value } = e.target; // destructure time

    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, "0"),
    })); // insures correct time render
  };

  // Convert event date string to a Date object
  const bookingDate = new Date(selectedDate);

  // Format the date for display (fallback if date is invalid)
  const formattedBookingDate = bookingDate
    ? bookingDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Invalid Date";

  return (
    <form className="general-form" onSubmit={handleSubmit}>
      <h2>Booking request details for </h2>
      <div className="general-form-date">
        <p>{formattedBookingDate}</p>
        <button
          className={classNames(styles["close-event-popup"])}
          onClick={() => {
            setShowEventPopup(false);
            setSelectedDate("");
          }}
        >
          <i className="bx bx-x"></i>
        </button>
      </div>
      <hr />
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""} // turnery to check if emptyFields include load
      />
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={emptyFields.includes("name") ? "error" : ""} // turnery to check if emptyFields include load
      />
      <label>Surname:</label>
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        className={emptyFields.includes("surname") ? "error" : ""} // turnery to check if emptyFields include load
      />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={emptyFields.includes("email") ? "error" : ""} // turnery to check if emptyFields include load
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
      <label>Number of guests:</label>
      <input
        type="number"
        value={eventGuests}
        onChange={(e) => setEventGuests(e.target.value)}
        className={emptyFields.includes("eventGuests") ? "error" : ""} // turnery to check if emptyFields include load
      />
      <label>Booking Note:</label>
      <textarea
        placeholder="Enter Event Text (Maximum character 120)"
        value={eventNote}
        onChange={(e) => {
          // conditional for maximum characters of 60
          if (e.target.value.length <= 120) {
            setEventNote(e.target.value);
          }
        }}
      ></textarea>
      <hr />
      {/* Highlight Error */}
      {error && <div className="error">{error}</div>}
      <button disabled={isLoading} className="button">
        {editingEvent ? "Update" : "Request a booking"}
      </button>
    </form>
  );
};

export default BookingForm;
