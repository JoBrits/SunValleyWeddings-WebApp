import { useState } from "react";

// Components
import Section from "../components/Section";
import HighLightBlock from "../components/HighLightBlock";
import ContentBlock from "../components/ContentBlock";
import Calendar from "../components/Calendar";
import BookingForm from "../components/BookingForm";

const Bookings = () => {
  // Current Date
  const currentDate = new Date();

  // State
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);

  return (
    <>
      <Section height={"100vh"} padding={"7.5rem 0"}>
        <HighLightBlock width={60} height={120} left={-10} />

        <ContentBlock start={1} end={5} alignItems={"center"}>
          <div style={{ textAlign: "center" }}>
            <h2 className="section-heading">Bookings</h2>
            <p>Use the calendar below to check available dates</p>
          </div>
          <Calendar
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            setShowEventPopup={setShowEventPopup}
            showEventPopup={showEventPopup}
          />
        </ContentBlock>

        <ContentBlock start={8} end={12} alignItems={"center"}>
          <BookingForm
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            showEventPopup={showEventPopup}
            setShowEventPopup={setShowEventPopup}
          />
        </ContentBlock>
      </Section>
    </>
  );
};

export default Bookings;
