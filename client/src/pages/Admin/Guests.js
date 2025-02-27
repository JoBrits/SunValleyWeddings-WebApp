import { BookingContextProvider } from "../../context/BookingContext";

// Components
import Section from "../../components/Section";
import ContentBlock from "../../components/ContentBlock";

import GuestsTable from "../../components/GuestsTable";


const Guests = () => {

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

        </ContentBlock>

        {/* DASHBOARD HEADING */}
        <ContentBlock
          start={4}
          end={12}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <h1 className="dashboard-heading">Guests</h1>
        </ContentBlock>

        {/* DASHBOARD BOOKINGS */}
        <ContentBlock start={4} end={12}>
          <div className="dashboard-panel">
            <GuestsTable />
          </div>
        </ContentBlock>
      </Section>
    </BookingContextProvider>
  );
};

export default Guests;
