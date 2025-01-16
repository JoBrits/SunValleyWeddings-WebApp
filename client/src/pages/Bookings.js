// Components
import Section from "../components/Section";
import HighLightBlock from "../components/HighLightBlock";
import ContentBlock from "../components/ContentBlock";
import BookingForm from "../components/BookingForm";

const Bookings = () => {
  return (
    <>
      <Section height={"100vh"} padding={"7.5rem 0"}>
        <HighLightBlock width={60} height={120} left={-10} />

        <ContentBlock start={1} end={5} alignItems={"center"}>
          <div style={{ textAlign: "center" }}>
            <h2 className="section-heading">Bookings</h2>
            <p>Use the calendar below to check available dates</p>
          </div>
        </ContentBlock>

        <ContentBlock start={8} end={12} alignItems={"center"}>
          <BookingForm />
        </ContentBlock>
      </Section>
    </>
  );
};

export default Bookings;
