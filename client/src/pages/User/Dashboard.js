// Components
import Section from "../../components/Section";
import ContentBlock from "../../components/ContentBlock";
import BookingList from "../../components/BookingList";

// Hooks
import { useAuthContext } from "../../hooks/useAuthContext";

const UserDashboard = () => {
  
  const { user } = useAuthContext();
  
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
            <BookingList
              view={"byEmail"}
            />
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
            <h2 className="dashboard-sub-heading">Sun Valley Notifications </h2>
          </div>
        </ContentBlock>

        {/* DASHBOARD NOTIFICATION */}
        <ContentBlock start={10} end={13} alignItems={"start"}>
          <div className="dashboard-panel">
            <h2 className="dashboard-sub-heading">Guest Notifications</h2>
          </div>
        </ContentBlock>
      </Section>
    </>
  );
};

export default UserDashboard;
