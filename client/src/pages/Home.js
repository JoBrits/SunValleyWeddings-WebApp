// Components
import Section from "../components/Section";
import HighLightBlock from "../components/HighLightBlock";
import ContentBlock from "../components/ContentBlock";
import Logo from "../components/Logo";
import Tabs from "../components/Tabs";
import Button from "../components/Button";
import ContactForm from "../components/ContactForm";

const Home = () => {
  return (
    <>
      {/* Slide 1 - Landing */}
      <Section height={"100vh"} padding={"7.5rem 0"}>
        <ContentBlock
          start={4}
          end={9}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Logo
            section={"Wedding and Golf Venue"}
            textAlign={"center"}
            headingMainSize={"8rem"}
            headingMainHeight={"6rem"}
            headingSectionSize={"2rem"}
            headingMainMargin={0}
          />
        </ContentBlock>

        <ContentBlock start={1} end={12}>
          <Tabs
            tabs={[
              {
                label: "Weddings",
                link: "Weddings",
              },
              {
                label: "Golf",
                link: "Golf",
              },
              {
                label: "Testimonials",
                link: "Testimonials",
              },
              {
                label: "Contact Us",
                link: "Contact",
              },
            ]}
          />
        </ContentBlock>

        <ContentBlock
          start={2}
          end={11}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Welcome to tranquility - our unique Wedding and Golf venue</h1>
            <p>
              Sun Valley is a Wedding and Golf venue situated 5km off the R59
              between Alberton and Glenvista in Gauteng, South Africa.
            </p>
          </div>
        </ContentBlock>

        <ContentBlock start={5} end={8} alignItems={"center"}>
          <Button label={"About Us"} />
        </ContentBlock>
      </Section>

      {/* Slide 2 - About */}
      <Section height={"100vh"} padding={"7.5rem 0"}>
        <HighLightBlock width={80} height={80} left={-10} />
        <ContentBlock />
        <ContentBlock start={8} end={12} alignItems={"self-end"}>
          <div>
            <h2 className="section-heading">About Us</h2>
          </div>
        </ContentBlock>
        <ContentBlock start={1} end={5}>
          <h2>Weddings</h2>
          <p>
            Your wedding day is one of the most important days in your life and
            you want it to happen somewhere spectacular.
          </p>
          <p>
            Sun Valley, hidden between the hills, surrounded by wide open spaces
            aims to provide the ambiance where fairytale weddings, at the garden
            venue, comes true.
          </p>
          <Button label={`SAY "I DO"`} />
        </ContentBlock>
        <ContentBlock start={8} end={12}>
          <h2>Golf</h2>
          <p>
            The Sun Valley Wedding and Golf venue 18-hole short golf course is a
            picturesque family course set in the tranquillity of nature. Just
            bring your friends and PITCH, PAY and PLAY.
          </p>
          <p>
            Sun Valley is now part of the South African Golfers Association and
            open for membership. *** Golf carts must be booked and is subject to
            availability ***
          </p>
          <Button label={"PITCH, PAY AND PLAY"} />
        </ContentBlock>
        <ContentBlock />
      </Section>

      {/* Slide 3 - Contact us*/}
      <Section height={"100vh"} padding={"7.5rem 0"}>
        <HighLightBlock width={80} height={80} right={-10} />

        <ContentBlock
          start={2}
          end={12}
          alignItems={"center"}
          justifyContent={"start"}
        >
          <div>
            <h2 className="section-heading">Contact Us</h2>
          </div>
        </ContentBlock>

        <ContentBlock start={2} end={5}>
          <div>
            <h2>Better yet, see us in person!</h2>
            <p>
              We love our customers, so feel free to visit Sun Valley Wedding
              and Golf venue during normal business hours.
            </p>
          </div>
          <div>
            <h2>Sun Valley Wedding and Golf Venue</h2>
            <p>
              H2JF+63W Eikenhof, South Africa <br />
              +27 83 881 8132 <br />
              Mondays to Sundays 08:00 - 17:00
            </p>
          </div>
        </ContentBlock>

        <ContentBlock start={8} end={12}>
          <ContactForm />
        </ContentBlock>
        <ContentBlock />
      </Section>
    </>
  );
};

export default Home;
