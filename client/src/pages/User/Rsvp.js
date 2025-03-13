import { BookingContextProvider } from "../../context/BookingContext";
import { useParams } from "react-router-dom";

// Components
import Section from "../../components/Section";
import ContentBlock from "../../components/ContentBlock";
import RsvpTable from "../../components/RsvpTable";

const Rsvp = () => {
  
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
          <div className="dashboard-panel">
            <h1 className="dashboard-heading">Guest RSVP's</h1>
            <p>
              Please select from the bookings below to view your guest list
            </p>
          </div>
        </ContentBlock>

        {/* DASHBOARD BOOKINGS */}
        <ContentBlock start={4} end={12}>
          <div className="dashboard-panel">
            <RsvpTable view={view || "All"} />
          </div>
        </ContentBlock>
      </Section>
    </BookingContextProvider>
  );
};

export default Rsvp;
