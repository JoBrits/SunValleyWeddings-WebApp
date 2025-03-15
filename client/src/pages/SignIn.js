// Components
import Section from "../components/Section";
import HighLightBlock from "../components/HighLightBlock";
import ContentBlock from "../components/ContentBlock";
import SignInForm from "../components/SignInForm";

const SignIn = () => {
  return (
    <>
      <Section height={"100vh"} padding={"7.5rem 0"}>
        <HighLightBlock width={60} height={120} left={-10} />

        <ContentBlock start={1} end={5} alignItems={"center"}>
          <div style={{ textAlign: "center" }}>
            <h2 className="section-heading">Sign In</h2>
            <p>Manage your subscription from here</p>
          </div>
        </ContentBlock>

        <ContentBlock start={8} end={12} alignItems={"center"}>
          <SignInForm/>
        </ContentBlock>
      </Section>
    </>
  );
};

export default SignIn;
