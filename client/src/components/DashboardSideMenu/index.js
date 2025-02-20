import { useState, useEffect } from "react";
import { useBookingContext } from "../../hooks/useBookingContext";

// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Styles
import classNames from "classnames";
import styles from "./DashboardSideMenu.module.scss";

const DashboardSideMenuSection = ({ heading, children }) => {
  return (
    <div className="dashboard-menu-section">
      <h3>{heading}</h3>
      {children}
    </div>
  );
};

const DashboardSideMenuNotification = ({ linkLabel, linkTo, notification }) => {
  return (
    <>
      <div className="dashboard-menu-section-notifications">
        <Link to={linkTo}>{linkLabel}</Link>
        <div className="dashboard-menu-section-notification">
          {notification}
        </div>
      </div>
    </>
  );
};

const DashboardSideMenu = ({user}) => {
  const { pendingBookings, confirmedBookings, dispatch } = useBookingContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/bookings/bookings");
        const data = await response.json();

        console.log("Fetched Data:", data); // Log what is received from the API

        if (response.ok) {
          dispatch({ type: "SET_BOOKINGS", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [dispatch]); // Runs only on mount

  // What type of user is logged in
  console.log(user.role);

  return (
    <>
      {user.role === "admin" && (
        <div className={classNames(styles["dashboard-menu"])}>
          <DashboardSideMenuSection heading={"Booking Requests"}>
            <DashboardSideMenuNotification
              linkLabel={"Pending"}
              linkTo={"Pending"}
              notification={pendingBookings.length}
            />
            <DashboardSideMenuNotification
              linkLabel={"Confirmed"}
              linkTo={"Confirmed"}
              notification={confirmedBookings.length}
            />
          </DashboardSideMenuSection>

          <DashboardSideMenuSection heading={"Guests"}>
            <DashboardSideMenuNotification
              linkLabel={"Manage"}
              linkTo={"Manage"}
              notification={"00"}
            />
            <DashboardSideMenuNotification
              linkLabel={"Updates"}
              linkTo={"Updates"}
              notification={"00"}
            />
          </DashboardSideMenuSection>

          <DashboardSideMenuSection heading={"Events"}>
            <DashboardSideMenuNotification
              linkLabel={"Next event"}
              linkTo={"Next event"}
              notification={"00"}
            />
            <DashboardSideMenuNotification
              linkLabel={"Upcoming"}
              linkTo={"Upcoming"}
              notification={"00"}
            />
          </DashboardSideMenuSection>
        </div>
      )}

      {user.role === "user" && (
        <div className={classNames(styles["dashboard-menu"])}>
          <DashboardSideMenuSection heading={"RSVP's"}>
            <DashboardSideMenuNotification
              linkLabel={"Pending"}
              linkTo={"Pending"}
              notification={"00"}
            />
            <DashboardSideMenuNotification
              linkLabel={"Confirmed"}
              linkTo={"Confirmed"}
              notification={"00"}
            />
          </DashboardSideMenuSection>

          <DashboardSideMenuSection heading={"Guests"}>
            <DashboardSideMenuNotification
              linkLabel={"Manage"}
              linkTo={"Manage"}
              notification={"00"}
            />
            <DashboardSideMenuNotification
              linkLabel={"Updates"}
              linkTo={"Updates"}
              notification={"00"}
            />
          </DashboardSideMenuSection>

          <DashboardSideMenuSection heading={"Schedule"}>
            <DashboardSideMenuNotification
              linkLabel={"Next event"}
              linkTo={"Next event"}
              notification={"00"}
            />
            <DashboardSideMenuNotification
              linkLabel={"Upcoming"}
              linkTo={"Upcoming"}
              notification={"00"}
            />
          </DashboardSideMenuSection>
        </div>
      )}
    </>
  );
};

export default DashboardSideMenu;
