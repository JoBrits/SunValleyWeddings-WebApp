import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Hooks
import { useSignup } from "../../hooks/useSignup";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
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
    const response = await signup(name, surname, email, password);

    console.log("response = " + response)

    if (!response?.error) {
      navigate("/SignIn");
    } 
  };

  return (
    <form className="general-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <hr />
      <label>Name:</label>
      <input
        name="name"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <label>Surname:</label>
      <input
        name="surname"
        value={surname}
        type="text"
        onChange={(e) => setSurname(e.target.value)}
      />
      <label>Email:</label>
      <input
        name="email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        name="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <hr />
      <button className="button" disabled={isLoading}>
        Sign up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUpForm;
