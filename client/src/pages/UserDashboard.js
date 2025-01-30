// Components
import Section from "../components/Section";
import ContentBlock from "../components/ContentBlock";
import Logo from "../components/Logo";
import Button from "../components/Button";

const UserDashboard = () => {
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

        <ContentBlock
          start={2}
          end={11}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <div style={{ textAlign: "center" }}>
            <h1>UserDashboard</h1>
          </div>
        </ContentBlock>

        <ContentBlock start={5} end={8} alignItems={"center"}>
          <Button label={"About Us"} />
        </ContentBlock>
      </Section>
    </>
  );
};

export default UserDashboard;
