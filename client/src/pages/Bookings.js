import { useState, useEffect, useContext } from "react";

// Components
import Section from "../components/Section";
import HighLightBlock from "../components/HighLightBlock";
import ContentBlock from "../components/ContentBlock";
import Calendar from "../components/Calendar";
import BookingForm from "../components/BookingForm";
import BookingFormList from "../components/BookingFormList";

import { BookingContext } from "../context/BookingContext";

const Bookings = () => {
  // State variables
  const [selectedDate, setSelectedDate] = useState("");
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [dbEvents, setDbEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { confirmedBookings, dispatch } = useContext(BookingContext);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/bookings/bookings");
        const data = await response.json();

        if (Array.isArray(data)) {
          dispatch({ type: "SET_BOOKINGS", payload: data });
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [dispatch]);

  useEffect(() => {
    if (confirmedBookings) {
      const confirmedDates = confirmedBookings.map(
        (booking) => booking.eventDate
      );
      setDbEvents(confirmedDates);
    }
  }, [confirmedBookings]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings"));
    if (storedBookings) {
      setEvents(storedBookings);
    }
  }, []);

  return (
    <Section height={"100vh"} padding={"7.5rem 0"}>
      <HighLightBlock width={60} height={120} left={-10} />

      <ContentBlock start={1} end={5} alignItems={"center"}>
        <div style={{ textAlign: "center" }}>
          <h2 className="section-heading">Bookings</h2>
          <p>Use the calendar below to check available dates</p>
        </div>
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          showEventPopup={showEventPopup}
          setShowEventPopup={setShowEventPopup}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          dbEvents={dbEvents}
        />
      </ContentBlock>

      <ContentBlock start={8} end={12} alignItems={"center"}>
        {showEventPopup && (
          <BookingForm
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            events={events}
            setEvents={setEvents}
            editingEvent={editingEvent}
            setEditingEvent={setEditingEvent}
            showEventPopup={showEventPopup}
            setShowEventPopup={setShowEventPopup}
          />
        )}
        {!showEventPopup && (
          <BookingFormList
            events={events}
            setEvents={setEvents}
            dbEvents={dbEvents}
            editingEvent={editingEvent}
            setEditingEvent={setEditingEvent}
            showEventPopup={showEventPopup}
            setShowEventPopup={setShowEventPopup}
          />
        )}
      </ContentBlock>
    </Section>
  );
};

export default Bookings;
