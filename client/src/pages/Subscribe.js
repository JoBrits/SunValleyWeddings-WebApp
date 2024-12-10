// Components
import Section from "../components/Section";
import HighLightBlock from "../components/HighLightBlock";
import ContentBlock from "../components/ContentBlock";
import SubscribeForm from "../components/SubscribeForm";

const Subscribe = () => {
  return (
    <>
      {/* Slide 2 - About */}
      <Section height={"100vh"} padding={"7.5rem 0"}>
        <HighLightBlock width={60} height={120} left={-10} />

        <ContentBlock start={1} end={5} alignItems={"center"}>
          <div style={{ textAlign: "center" }}>
            <h2 className="section-heading">Subscribe</h2>
            <p>
              Sign up to hear from us about specials, sales, and events at Sun
              Valley Wedding and Golf venue.
            </p>
          </div>
        </ContentBlock>

        <ContentBlock start={8} end={12} alignItems={"center"}>
          <SubscribeForm />
        </ContentBlock>

      </Section>
    </>
  );
};

export default Subscribe;
