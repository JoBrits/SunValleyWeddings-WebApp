import { useState, useEffect, useContext } from "react";

// Components
import Section from "../../components/Section";
import ContentBlock from "../../components/ContentBlock";
import Calendar from "../../components/Calendar";
import BookingList from "../../components/BookingList";
import MessagesList from "../../components/MessagesList";

// Hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { BookingContext } from "../../context/BookingContext";

const UserDashboard = () => {
  const { user } = useAuthContext();
  const { confirmedBookings } = useContext(BookingContext);

  // Current Date
  const currentDate = new Date();

  // State
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [dbEvents, setDbEvents] = useState([]);

  useEffect(() => {
    if (confirmedBookings) {
      const confirmedDates = confirmedBookings
        .filter((booking) => booking.email === user.email)
        .map((booking) => booking.eventDate);

      setDbEvents(confirmedDates);
    }
  }, [confirmedBookings, user.email]);

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
          alignItems={"start"}
        >
          <h1 className="dashboard-heading">User Dashboard</h1>
        </ContentBlock>

        {/* DASHBOARD BOOKINGS */}
        <ContentBlock start={4} end={6}>
          <div className="dashboard-panel">
            <h2 className="dashboard-sub-heading">
              Bookings for {user.email}{" "}
            </h2>
            <BookingList view={"byEmail"} />
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

            <BookingList
              selectedDate={selectedDate}
              showEventPopup={showEventPopup}
              setShowEventPopup={setShowEventPopup}
              view={"byDate"}
            />
          </div>
        </ContentBlock>

        {/* DASHBOARD NOTIFICATION */}
        <ContentBlock start={10} end={13} alignItems={"start"}>
          <div className="dashboard-panel">
            <h2 className="dashboard-sub-heading">Sun Valley Notifications </h2>
            <MessagesList type={"Admin"} />
          </div>
        </ContentBlock>
      </Section>
    </>
  );
};

export default UserDashboard;
