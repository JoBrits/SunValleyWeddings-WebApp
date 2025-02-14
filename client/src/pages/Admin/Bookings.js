import { BookingContextProvider } from "../../context/BookingContext";

// Components
import Section from "../../components/Section";
import ContentBlock from "../../components/ContentBlock";
import DashboardSideMenu from "../../components/DashboardSideMenu";
import BookingsTable from "../../components/BookingsTable";


const AdminDashboard = () => {

  return (
    <BookingContextProvider>
      {/* Slide 1 - Landing */}
      <Section height={"auto"} padding={"7.5rem 0"}>
        {/* DASHBOARD MENU */}
        <ContentBlock
          start={1}
          end={3}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <DashboardSideMenu />
        </ContentBlock>

        {/* DASHBOARD HEADING */}
        <ContentBlock
          start={4}
          end={12}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <h1 className="dashboard-heading">Bookings</h1>
        </ContentBlock>

        {/* DASHBOARD BOOKINGS */}
        <ContentBlock start={4} end={12}>
          <div className="dashboard-panel">
            <BookingsTable />
          </div>
        </ContentBlock>
      </Section>
    </BookingContextProvider>
  );
};

export default AdminDashboard;
