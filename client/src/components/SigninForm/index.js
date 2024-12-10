import { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Button from "../Button";

// Hooks
// import { useLogin } from "../hooks/useLogin";

const SigninForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form className="general-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <hr />
      <label>Name:</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="comment" onChange={(e) => setMessage(e.target.value)} />
      <hr />
      <Button label={"Sign In"} />
    </form>
  );
};

export default SigninForm;
