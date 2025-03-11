import { useState, useEffect, useContext } from "react";

// Components
import Section from "../../components/Section";
import ContentBlock from "../../components/ContentBlock";
import Calendar from "../../components/Calendar";
import Spinner from "../../components/Spinner";
import BookingForm from "../../components/BookingForm";
import BookingList from "../../components/BookingList";

import { BookingContext } from "../../context/BookingContext";

const Events = () => {
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

  return (
    <>
      {/* Slide 1 - Landing */}
      <Section height={"auto"} padding={"7.5rem 0"}>
        {/* DASHBOARD MENU PLACEHOLDER */}
        <ContentBlock
          start={1}
          end={3}
          justifyContent={"start"}
          alignItems={"center"}
        ></ContentBlock>

        {/* DASHBOARD HEADING */}
        <ContentBlock
          start={4}
          end={12}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <h1 className="dashboard-heading">Event Management</h1>
        </ContentBlock>

        {/* DASHBOARD BOOKINGS */}
        <ContentBlock start={4} end={7}>
          <div className="dashboard-panel">
            {/* PENDING BOOKINGS */}
            {isLoading && <Spinner />}
            {!isLoading && (
              <>
                <Calendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  showEventPopup={showEventPopup}
                  setShowEventPopup={setShowEventPopup}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  dbEvents={dbEvents}
                />
              </>
            )}
          </div>
        </ContentBlock>

        {/* DASHBOARD CALENDAR */}
        <ContentBlock
          start={9}
          end={12}
          justifyContent={"stretch"}
          alignItems={"start"}
        >
          <div className="dashboard-panel">
            {showEventPopup && (
              <>
                <BookingList
                  selectedDate={selectedDate}
                  showEventPopup={showEventPopup}
                  setShowEventPopup={setShowEventPopup}
                  view={"byDate"}
                />
                {!dbEvents.includes(selectedDate) && (
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
              </>
            )}
            {!showEventPopup && (
              <>
                <BookingList view={"confirmed"} />
              </>
            )}
          </div>
        </ContentBlock>
      </Section>
    </>
  );
};

export default Events;
