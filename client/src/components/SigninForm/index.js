import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Hooks
import { useLogin } from "../../hooks/useLogin";

const SigninForm = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // from useLogin hook
  const {login, error, isLoading} = useLogin()

  // Initialize useNavigate
  const navigate = useNavigate(); 

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password)
    
    // Navigate to /SignIn if signup is successful
    if (!error) {
      navigate("/");
    }

  };

  return (
    <form className="general-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <hr />
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="comment" onChange={(e) => setPassword(e.target.value)} />
      <hr />
      <button className="button" disabled={isLoading}>Sign In</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SigninForm;
