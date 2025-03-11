import { BookingContextProvider } from "../../context/BookingContext";
import { useParams } from "react-router-dom";

// Components
import Section from "../../components/Section";
import ContentBlock from "../../components/ContentBlock";
import BookingsTable from "../../components/BookingsTable";

const Bookings = ({ user }) => {
  
  const { view } = useParams(); // Get the view param from the URL

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
        ></ContentBlock>

        {/* DASHBOARD HEADING */}
        <ContentBlock
          start={4}
          end={12}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <h1 className="dashboard-heading">Bookings</h1>
        </ContentBlock>

        {/* DASHBOARD BOOKINGS */}
        <ContentBlock start={4} end={12} alignItems={"center"}>
          <div className="dashboard-panel">
            <BookingsTable view={view || "All"} />
          </div>
        </ContentBlock>
      </Section>
    </BookingContextProvider>
  );
};

export default Bookings;
