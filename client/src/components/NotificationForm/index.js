import { useEffect } from "react";

// Components
import Button from "../Button";

// Hooks
import { useContactForm } from "../../hooks/useContactForm";

const NotificationForm = ({ userRecipient }) => {
  const {
    setName,
    setEmail,
    message,
    setMessage,
    handleSubmit,
    isSubmitting,
    error,
    success,
  } = useContactForm();

  // Set name and email automatically
  useEffect(() => {
    setName("Admin");
    setEmail(userRecipient);
  }, [setName, setEmail, userRecipient]);

  return (
    <form className="general-form" onSubmit={handleSubmit}>
      <h3>Send user a notification</h3>

      <textarea
        id="message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        rows="4"
      />

      <Button
        label={isSubmitting ? "Sending..." : "Send"}
        disabled={isSubmitting}
      />
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Message sent successfully!</p>}
    </form>
  );
};

export default NotificationForm;
