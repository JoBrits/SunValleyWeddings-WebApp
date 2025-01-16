import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Hooks
import { useSignup } from "../../hooks/useSignup";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // from useSignup hook
  const { signup, error, isLoading } = useSignup();
  
  // Initialize useNavigate
  const navigate = useNavigate(); 

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // use custom hook to signup
    await signup(name, email, password);

    // Navigate to /SignIn if signup is successful
    if (!error) {
      navigate("/SignIn");
    }
  };

  return (
    <form className="general-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <hr />
      <label>Name:</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <hr />
      <button className="button" disabled={isLoading}>
        Sign up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default BookingForm;
