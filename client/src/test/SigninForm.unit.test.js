import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SigninForm from "../components/SigninForm";

import { useLogin } from "../hooks/useLogin"; // Import the custom login hook

// Mock the useLogin hook to control its return values during testing
jest.mock("../hooks/useLogin", () => ({
  useLogin: jest.fn(),
}));

// Test case to check if the login function is called correctly when the form is submitted
test("should call login function on form submit", async () => {
  const loginMock = jest.fn(); // Mock function to track login calls

  // Mock the return values of useLogin hook
  useLogin.mockReturnValue({
    login: loginMock,
    error: null, // No error state during this test
    isLoading: false, // Simulate the loading state as false
  });

  render(
    <Router>
      <SigninForm />
    </Router>
  ); // Render the SigninForm component

  // Get input fields and submit button
  const emailInput = screen.getByLabelText(/Email:/i);
  const passwordInput = screen.getByLabelText(/Password:/i);
  const submitButton = screen.getByText(/Sign In/i);

  // Simulate user input in email and password fields
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // Simulate form submission by clicking the submit button
  fireEvent.click(submitButton);

  // Expect the login function to have been called with the entered credentials
  expect(loginMock).toHaveBeenCalledWith("test@example.com", "password123");
});
