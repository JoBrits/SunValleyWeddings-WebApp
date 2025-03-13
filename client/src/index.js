import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { BookingContextProvider } from "./context/BookingContext";
import { UserContextProvider } from "./context/UserContext";
import { GuestContextProvider } from "./context/GuestContext";
import { ScheduleContextProvider } from "./context/ScheduleContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BookingContextProvider>
        <UserContextProvider>
          <GuestContextProvider>
            <ScheduleContextProvider>
            <App />
            </ScheduleContextProvider>
          </GuestContextProvider>
        </UserContextProvider>
      </BookingContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
