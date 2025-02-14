import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { BookingContextProvider } from "./context/BookingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BookingContextProvider>
        <App />
      </BookingContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
