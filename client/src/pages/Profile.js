import { useState } from "react";

// Hooks
import { useUpdate } from "../hooks/useUpdate";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import Section from "../components/Section";
import ContentBlock from "../components/ContentBlock";

const Profile = () => {
  // User Context
  const { user } = useAuthContext();

  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("*******");

  // from useUpdate hook
  const { updateUser, error, isLoading } = useUpdate();

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare updated user data
    const updatedData = { name, surname, email };
    if (password !== "*******") {
      updatedData.password = password;
    }

    // use custom hook to update user
    await updateUser(user.id, updatedData);
  };

  return (
    <>
      {/* Slide 1 - Landing */}
      <Section height={"100vh"} padding={"7.5rem 0"}>
        {/* DASHBOARD MENU PLACEHOLDER */}
        <ContentBlock start={1} end={3} />

        {/* DASHBOARD HEADING */}
        <ContentBlock
          start={5}
          end={12}
          justifyContent={"start"}
          alignItems={"top"}
        >
          <h1 className="dashboard-heading">Manage My Profile</h1>
        </ContentBlock>

        {/* DASHBOARD BOOKINGS */}
        <ContentBlock start={5} end={7}>
          <div className="dashboard-panel">
            <form className="general-form" onSubmit={handleSubmit}>
              <h2>My Details</h2>
              <hr />
              <label>Name:</label>
              <input
                value={name}
                name="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <label>Surname:</label>
              <input
                value={surname}
                name="surname"
                type="text"
                onChange={(e) => setSurname(e.target.value)}
              />
              <label>Email:</label>
              <input
                value={email}
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <hr />
              <button className="button" disabled={isLoading}>
                Update
              </button>
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </ContentBlock>

        {/* DASHBOARD CALENDAR */}
        <ContentBlock start={9} end={11}>
          <div className="dashboard-panel">
            <form className="general-form" onSubmit={handleSubmit}>
              <h2>Access</h2>
              <hr />
              <label>Password:</label>
              <input
                value={password}
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <hr />
              <button className="button" disabled={isLoading}>
                Update
              </button>
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </ContentBlock>
      </Section>
    </>
  );
};

export default Profile;
