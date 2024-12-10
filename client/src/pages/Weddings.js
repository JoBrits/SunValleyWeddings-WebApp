// Components
import Section from "../components/Section";
import HighLightBlock from "../components/HighLightBlock";
import ContentBlock from "../components/ContentBlock";
import Logo from "../components/Logo";
import Tabs from "../components/Tabs";
import Button from "../components/Button";

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
            section={"Weddings"}
            textAlign={"center"}
            headingMainSize={"8rem"}
            headingMainHeight={"6rem"}
            headingSectionSize={"2rem"}
            headingMainMargin={0}
          />
        </ContentBlock>

        <ContentBlock start={1} end={12}>
          <Tabs
          type="page"
            tabs={[
              { label: "Venue", link: "Weddings-Venue" },
              { label: "Service providers", link: "Weddings-Service" },
              { label: "Nature as your setting", link: "Weddings-Nature" },
              { label: "Catering and Events", link: "Weddings-Catering" },
              { label: "Photo Gallery", link: "Weddings-Photo" },
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
            <h1>Your wedding day</h1>
            <p>
              ... is one of the most important days of your life, and you want
              it to happen somewhere spectacular. Sun Valley, nestled between
              the hills, just outside Alberton and Glenvista, Gauteng, offers a
              great solution to your wedding venue needs. This venue, with its
              wide open spaces set in the tranquillity of nature, hidden away
              from the hustle and bustle of everyday life, provides all the
              style and ambiance to make any couple's dream wedding come true.
            </p>
          </div>
        </ContentBlock>

        <ContentBlock start={4} end={6} alignItems={"center"}>
          <Button label={"WE OFFER"} />
        </ContentBlock>
        <ContentBlock start={7} end={9} alignItems={"center"}>
          <Button label={"BOOK NOW"} />
        </ContentBlock>
      </Section>

      {/* Slide 2 - Venue */}
      
      <Section id={"Weddings-Venue"} height={"100vh"} padding={"7.5rem 0"}>
        <HighLightBlock width={80} height={80} left={-10} />
        <ContentBlock start={1} end={5}></ContentBlock>
        <ContentBlock start={7} end={12} alignItems={"self-end"}>
          <div>
            <h2 className="section-heading">Venue</h2>
            <h2>In the garden</h2>
            <p>
              Our venue offers an "in the garden" theme with a magnificent view
              of the mountain. Unique to a close-to-the-city venue. Or use our
              chapel, hidden between the trees, for an "in the forest"
              atmosphere.
            </p>
          </div>
        </ContentBlock>
        <ContentBlock start={7} end={9}>
          <Button label={"SERVICE PROVIDERS"} />
        </ContentBlock>
        <ContentBlock start={10} end={12}>
          <Button label={"BOOK NOW"} />
        </ContentBlock>
      </Section>

      {/* Slide 3 - Service providers*/}
      <Section id={"Weddings-Service"} height={"100vh"} padding={"7.5rem 0"}>
        <HighLightBlock width={80} height={80} right={-10} />
        <ContentBlock start={2} end={7} alignItems={"self-end"}>
          <div>
            <h2 className="section-heading">Service Providers</h2>
            <h2>DJ's, florists, etc</h2>
            <p>
              A specialist team of photographers, DJ's, florists, etc to assist
              you in planning your wedding from start to finish, ensuring
              everything runs according to plan.
            </p>
          </div>
        </ContentBlock>
        <ContentBlock start={2} end={4}>
          <Button label={"SERVICE PROVIDERS"} />
        </ContentBlock>
        <ContentBlock start={5} end={7}>
          <Button label={"BOOK NOW"} />
        </ContentBlock>
      </Section>

      {/* Slide 4 - Nature as your setting*/}
      <Section id={"Weddings-Nature"} height={"100vh"} padding={"7.5rem 0"}>
        <HighLightBlock width={80} height={80} left={-10} />
        <ContentBlock start={1} end={5}></ContentBlock>
        <ContentBlock start={7} end={12} alignItems={"self-end"}>
          <div>
            <h2 className="section-heading">Nature as Your Setting</h2>
            <h2>Picturesque</h2>
            <p>
              Picturesque photo settings in the veld, on the golf course or in
              our lovely gardens.
            </p>
          </div>
        </ContentBlock>
        <ContentBlock start={7} end={9}>
          <Button label={"CATERING and EVENTS"} />
        </ContentBlock>
        <ContentBlock start={10} end={12}>
          <Button label={"BOOK NOW"} />
        </ContentBlock>
      </Section>

      {/* Slide 5 - Catering and Events*/}
      <Section id={"Weddings-Catering"} height={"100vh"} padding={"7.5rem 0"}>
        <HighLightBlock width={80} height={80} right={-10} />
        <ContentBlock start={2} end={7} alignItems={"self-end"}>
          <div>
            <h2 className="section-heading">Catering and Events</h2>
            <h2>A multi-purpose venue</h2>
            <p>
              Host your private event or company conference at our venue. Speak
              to us about available dates and options for your next event.
            </p>
            <p>
              *Bachelor parties are not allowed at Sun Valley as we are visited
              by families with children.
            </p>
          </div>
        </ContentBlock>
        <ContentBlock start={2} end={4}>
          <Button label={"Photo Gallery"} />
        </ContentBlock>
        <ContentBlock start={5} end={7}>
          <Button label={"BOOK NOW"} />
        </ContentBlock>
      </Section>

      {/* Slide 6 - Catering and Events*/}
      <Section id={"Weddings-Photo"} height={"100vh"} padding={"7.5rem 0"}>
        <ContentBlock start={2} end={7} alignItems={"self-start"}>
          <div>
            <h2 className="section-heading">Photo Gallery</h2>
          </div>
        </ContentBlock>
        <ContentBlock start={4} end={8} alignItems={"self-end"}>
          <Button label={"BOOK NOW"} />
        </ContentBlock>
      </Section>
    </>
  );
};

export default Home;
