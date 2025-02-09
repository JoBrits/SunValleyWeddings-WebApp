import { useState } from "react";

// Components
import Section from "../../components/Section";
import ContentBlock from "../../components/ContentBlock";
import Calendar from "../../components/Calendar";
import BookingList from "../../components/BookingList";
import MessagesList from "../../components/MessagesList";
import EventForm from "../../components/EventForm";
import DashboardSideMenu from "../../components/DashboardSideMenu";

// Hooks
import useBookingList from "../../hooks/useBookingList";

const AdminDashboard = () => {
  // Current Date
  const currentDate = new Date();

  // State
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);

  const { bookings } = useBookingList();

  return (
    <>
      {/* Slide 1 - Landing */}
      <Section height={"auto"} padding={"7.5rem 0"}>
        {/* DASHBOARD MENU */}
        <ContentBlock
          start={1}
          end={3}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <DashboardSideMenu bookings={bookings} events={bookings} />
        </ContentBlock>

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
            <BookingList />
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
            />
            <EventForm
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              showEventPopup={showEventPopup}
              setShowEventPopup={setShowEventPopup}
            />
          </div>
        </ContentBlock>

        {/* DASHBOARD NOTIFICATION */}
        <ContentBlock
          start={10}
          end={12}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <div className="dashboard-panel">
            <h2 className="dashboard-sub-heading">Notifications </h2>
            <MessagesList />
          </div>
        </ContentBlock>
      </Section>
    </>
  );
};

export default AdminDashboard;
