import { useState, useEffect } from "react";

// Components
import Section from "../components/Section";
import HighLightBlock from "../components/HighLightBlock";
import ContentBlock from "../components/ContentBlock";
import Calendar from "../components/Calendar";
import BookingForm from "../components/BookingForm";
import BookingFormList from "../components/BookingFormList";

import { BookingContextProvider } from "../context/BookingContext";

const Bookings = () => {
  // State variables
  const [selectedDate, setSelectedDate] = useState("");
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings"));
    if (storedBookings) {
      setEvents(storedBookings);
    }
  }, []);

  return (
      <BookingContextProvider>
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
                editingEvent={editingEvent}
                setEditingEvent={setEditingEvent}
                showEventPopup={showEventPopup}
                setShowEventPopup={setShowEventPopup}
              />
            )}
          </ContentBlock>
        </Section>
      </BookingContextProvider>
  );
};

export default Bookings;
