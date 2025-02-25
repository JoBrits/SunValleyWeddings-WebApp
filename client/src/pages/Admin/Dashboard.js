import { useState, useEffect, useContext } from "react";

// Components
import Section from "../../components/Section";
import ContentBlock from "../../components/ContentBlock";
import Calendar from "../../components/Calendar";
import BookingList from "../../components/BookingList";
import MessagesList from "../../components/MessagesList";
import Spinner from "../../components/Spinner";

import {
  BookingContextProvider,
  BookingContext,
} from "../../context/BookingContext";

const AdminDashboard = () => {
  // Current Date
  const currentDate = new Date();

  // State
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [dbEvents, setDbEvents] = useState([]);
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
    <BookingContextProvider>
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
          <h1 className="dashboard-heading">Admin Dashboard</h1>
        </ContentBlock>

        {/* DASHBOARD BOOKINGS */}
        <ContentBlock start={4} end={6}>
          <div className="dashboard-panel">
            <h2 className="dashboard-sub-heading">Booking Requests</h2>
            {/* PENDING BOOKINGS */}
            {isLoading && <Spinner />}
            {!isLoading && <BookingList view={"pending"} />}
          </div>
        </ContentBlock>

        {/* DASHBOARD CALENDAR */}
        <ContentBlock
          start={7}
          end={9}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <div className="dashboard-panel">
            <h2 className="dashboard-sub-heading">Upcoming Events</h2>

            <Calendar
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              setShowEventPopup={setShowEventPopup}
              showEventPopup={showEventPopup}
              dbEvents={dbEvents}
            />
          </div>
        </ContentBlock>

        {/* DASHBOARD NOTIFICATION */}
        <ContentBlock start={10} end={13} alignItems={"start"}>
          <div className="dashboard-panel">
            <h2 className="dashboard-sub-heading">Notifications </h2>
            <MessagesList />
            <BookingList
              selectedDate={selectedDate}
              showEventPopup={showEventPopup}
              setShowEventPopup={setShowEventPopup}
              view={"byDate"}
            />
          </div>
        </ContentBlock>
      </Section>
    </BookingContextProvider>
  );
};

export default AdminDashboard;
