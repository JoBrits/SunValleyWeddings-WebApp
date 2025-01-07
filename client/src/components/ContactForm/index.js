// Components
import Button from "../Button";

// Hooks
import { useContactForm } from "../../hooks/useContactForm";

const ContactForm = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    handleSubmit,
    isSubmitting,
    error,
    success,
  } = useContactForm();

  return (
    <form className="general-form" onSubmit={handleSubmit}>
      <h2>Drop us a line!</h2>
      <hr />
      <label>Name:</label>
      <input
        id="text"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Message:</label>
      <textarea
        id="message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        rows="4"
      />
      <hr />
      <Button label={isSubmitting ? "Sending..." : "Send"} disabled={isSubmitting} />
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Message sent successfully!</p>}
    </form>
  );
};

export default ContactForm;