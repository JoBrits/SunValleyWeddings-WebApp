import { useState, useEffect } from "react";

import { useBookingContext } from "../../hooks/useBookingContext";
import { useGuestContext } from "../../hooks/useGuestContext";

// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Spinner from "../../components/Spinner";

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

const DashboardSideMenuNotification = ({
  linkLabel,
  linkTo,
  notification,
  isLoading,
}) => {
  return (
    <>
      <div className="dashboard-menu-section-notifications">
        <Link to={linkTo}>{linkLabel}</Link>
        {isLoading && (
          <div className="dashboard-menu-section-notification">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <div className="dashboard-menu-section-notification">
            {notification}
          </div>
        )}
      </div>
    </>
  );
};

const DashboardSideMenu = ({ user }) => {

  const { bookings, pendingBookings, confirmedBookings, dispatch: dispatchBookings  } = useBookingContext();
  const { pendingGuests, confirmedGuests, dispatch: dispatchGuests  } = useGuestContext();

  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/bookings/bookings");
        const data = await response.json();

        // console.log("Fetched Data:", data); // Log what is received from the API

        if (response.ok) {
          dispatchBookings({ type: "SET_BOOKINGS", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
      setIsLoading(false);
    };
    fetchBookings();
    
    const fetchGuests = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/guests/${user._id}`);
        const data = await response.json();

        if (response.ok) {
          dispatchGuests({ type: "SET_GUESTS", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
      setIsLoading(false);
    };
    fetchGuests();


  }, [dispatchBookings, dispatchGuests, user._id]); // Runs only on mount

  // What type of user is logged in
  // console.log(user.role);

  return (
    <>
      {user.role === "admin" && (
        <div className={classNames(styles["dashboard-menu"])}>
          <DashboardSideMenuSection heading={"Booking Requests"}>
            <DashboardSideMenuNotification
              isLoading={isLoading}
              linkLabel={"Pending"}
              linkTo={"Pending"}
              notification={pendingBookings.length}
            />
            <DashboardSideMenuNotification
              isLoading={isLoading}
              linkLabel={"Confirmed"}
              linkTo={"Confirmed"}
              notification={confirmedBookings.length}
            />
          </DashboardSideMenuSection>

          <DashboardSideMenuSection heading={"Guests"}>
            <DashboardSideMenuNotification
              isLoading={isLoading}
              linkLabel={"Manage"}
              linkTo={"Manage"}
              notification={bookings.length}
            />
            <DashboardSideMenuNotification
              isLoading={isLoading}
              linkLabel={"Updates"}
              linkTo={"Updates"}
              notification={bookings.length}
            />
          </DashboardSideMenuSection>

          <DashboardSideMenuSection heading={"Events"}>
            <DashboardSideMenuNotification
              isLoading={isLoading}
              linkLabel={"Next event"}
              linkTo={"Next event"}
              notification={"00"}
            />
            <DashboardSideMenuNotification
              isLoading={isLoading}
              linkLabel={"Upcoming"}
              linkTo={"Upcoming"}
              notification={confirmedBookings.length}
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
              notification={pendingGuests}
            />
            <DashboardSideMenuNotification
              linkLabel={"Confirmed"}
              linkTo={"Confirmed"}
              notification={confirmedGuests}
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
