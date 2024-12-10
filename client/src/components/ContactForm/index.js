import { useState } from "react";


// Components
import Button from "../Button";

// Hooks
// import { useLogin } from "../hooks/useLogin";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log({ name, email, message });
  };

  return (
    <form className="general-form" onSubmit={handleSubmit}>
      <h2>Drop us a line!</h2>
      <hr />
      <label>Name:</label>
      <input id="text" type="text" onChange={(e) => setName(e.target.value)} />
      <label>Email:</label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Message:</label>
      <textarea
        id="message"
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        rows="4"
      />
      <hr />
      <Button label={"Send"} />
    </form>
  );
};

export default ContactForm;
