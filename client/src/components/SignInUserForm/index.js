import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Hooks
import { useLogin } from "../../hooks/useLogin";

const SignInUserForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // from useLogin hook
  const { login, error, isLoading } = useLogin();

  // Initialize useNavigate
  const navigate = useNavigate();

  // Handle login and navigate based on role
  const handleLogin = async () => {
    const userData = await login(email, password);

    if (userData && !error) {
      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(userData));
      // Reworked to route from App.js
      navigate("/");
    }
  };

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <form className="general-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <hr />
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} required />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <hr />
      <button className="button" disabled={isLoading}>
        Sign In
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignInUserForm;
