import { Link } from "react-router-dom";

// Components
import Section from "../components/Section";
import ContentBlock from "../components/ContentBlock";
import Calendar from "../components/Calendar";
import BookingList from "../components/BookingList";
import MessagesList from "../components/MessagesList";

const AdminDashboard = () => {
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
          <div className="dashboard-menu">
            {/* Booking Requests */}
            <div className="dashboard-menu-section">
              <h3>Booking Requests</h3>
              <div className="dashboard-menu-section-notifications">
                <Link>Pending</Link>
                <div className="dashboard-menu-section-notification">99</div>
              </div>
              <div className="dashboard-menu-section-notifications">
                <Link>Confirmed</Link>
                <div className="dashboard-menu-section-notification">99</div>
              </div>
            </div>
            {/* Guests */}
            <div className="dashboard-menu-section">
              <h3>Guests</h3>
              <div className="dashboard-menu-section-notifications">
                <Link>Manage</Link>
                <div className="dashboard-menu-section-notification">99</div>
              </div>
              <div className="dashboard-menu-section-notifications">
                <Link>Updates</Link>
                <div className="dashboard-menu-section-notification">99</div>
              </div>
            </div>
            {/* Events */}
            <div className="dashboard-menu-section">
              <h3>Events</h3>
              <div className="dashboard-menu-section-notifications">
                <Link>Next event</Link>
                <div className="dashboard-menu-section-notification">99</div>
              </div>
              <div className="dashboard-menu-section-notifications">
                <Link>Upcoming</Link>
                <div className="dashboard-menu-section-notification">99</div>
              </div>
            </div>
          </div>
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
            <Calendar />
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
