import { BookingContextProvider } from "../../context/BookingContext";
import { UserContextProvider } from "../../context/UserContext";
import { useParams } from "react-router-dom";

// Components
import Section from "../../components/Section";
import ContentBlock from "../../components/ContentBlock";

import UsersTable from "../../components/UsersTable";

const Guests = () => {
  const { view } = useParams(); // Get the view param from the URL

  return (
    <UserContextProvider>
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
            <h1 className="dashboard-heading">Guests</h1>
          </ContentBlock>

          {/* DASHBOARD BOOKINGS */}
          <ContentBlock start={4} end={12}>
            <div className="dashboard-panel">
              <UsersTable view={view || "All"} />
            </div>
          </ContentBlock>
        </Section>
      </BookingContextProvider>
    </UserContextProvider>
  );
};

export default Guests;
