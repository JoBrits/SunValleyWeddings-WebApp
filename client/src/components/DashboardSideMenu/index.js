import { useState, useEffect } from "react";

// Context
import { useBookingContext } from "../../hooks/useBookingContext";
import { useGuestContext } from "../../hooks/useGuestContext";
import { useUserContext } from "../../hooks/useUserContext";

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
  date,
}) => {
  return (
    <>
      <div className="dashboard-menu-section-notifications">
        <Link to={linkTo}>{linkLabel}</Link>
        {date && <div className="dashboard-menu-section-date">{date}</div>}
        {notification >= 0 && (
          <div className="dashboard-menu-section-notification">
            {notification}
          </div>
        )}
      </div>
    </>
  );
};

const DashboardSideMenu = ({ user }) => {
  // Booking Context
  const {
    bookings,
    pendingBookings,
    confirmedBookings,
    dispatch: dispatchBookings,
  } = useBookingContext();
  // User Context
  const { users, dispatch: dispatchUsers } = useUserContext();

  // Guest Context
  const {
    guests,
    pendingGuests,
    confirmedGuests,
    dispatch: dispatchGuests,
  } = useGuestContext();

  const [nextEvent, setNextEvent] = useState({});
  const [nextEventsLength, setNextEventsLength] = useState("");
  const [usersAll, setUsersAll] = useState(0);
  const [usersUnregistered, setUsersUnregistered] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);

      try {
        // Fetch Bookings
        const bookingsRes = await fetch("/api/bookings/bookings");
        const bookingsData = await bookingsRes.json();
        if (bookingsRes.ok) {
          dispatchBookings({ type: "SET_BOOKINGS", payload: bookingsData });
          getNextUpcomingEvent(bookingsData);
        }

        // Fetch Users
        const usersRes = await fetch("/api/user/users");
        const usersData = await usersRes.json();
        if (usersRes.ok) {
          // Filter unregistered users while ensuring unique emails
          const seenEmails = new Set(); // Track emails to avoid duplicates
          const unregisteredUsers = bookingsData.filter((booking) => {
            if (usersData.some((user) => user.email === booking.email))
              return false; // Skip if registered
            if (seenEmails.has(booking.email)) return false; // Skip if already added
            seenEmails.add(booking.email); // Mark email as seen
            return true;
          });

          dispatchUsers({ type: "SET_USERS", payload: usersData });

          // Update state
          setUsersUnregistered(unregisteredUsers);
          setUsersAll(unregisteredUsers.length + usersData.length);
        }

        // Fetch Guests
        const guestsRes = await fetch(`/api/guests/${user.id}`);
        const guestsData = await guestsRes.json();
        if (guestsRes.ok) {
          dispatchGuests({ type: "SET_GUESTS", payload: guestsData });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setIsLoading(false);
    };

    fetchAllData();
  }, [dispatchBookings, dispatchUsers, dispatchGuests, user.id]);

  const getNextUpcomingEvent = (bookings) => {
    const currentDate = new Date();

    // Ensure we filter only confirmed bookings
    const confirmedBookings = bookings.filter(
      (booking) =>
        booking.status && booking.status.toLowerCase() === "confirmed"
    );

    // Filter upcoming events and sort by date
    const upcomingBookings = confirmedBookings
      .filter((booking) => new Date(booking.eventDate) >= currentDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (upcomingBookings.length > 0) {
      setNextEvent({
        id: upcomingBookings[0]._id,
        title: upcomingBookings[0].title,
        name: upcomingBookings[0].name,
        surname: upcomingBookings[0].surname,
        email: upcomingBookings[0].email,
        date: upcomingBookings[0].eventDate,
      });
    } else {
      setNextEvent(null);
    }

    setNextEventsLength(upcomingBookings.length);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {user.role === "admin" && (
            <div className={classNames(styles["dashboard-menu"])}>
              <DashboardSideMenuSection heading={"Booking Requests"}>
                <DashboardSideMenuNotification
                  isLoading={isLoading}
                  linkLabel={"Pending"}
                  linkTo={"/admin/Bookings/Pending"}
                  notification={pendingBookings.length}
                />
                <DashboardSideMenuNotification
                  isLoading={isLoading}
                  linkLabel={"Confirmed"}
                  linkTo={"/admin/Bookings/Confirmed"}
                  notification={confirmedBookings.length}
                />
                <DashboardSideMenuNotification
                  isLoading={isLoading}
                  linkLabel={"All"}
                  linkTo={"/admin/Bookings"}
                  notification={bookings.length}
                />
              </DashboardSideMenuSection>

              <DashboardSideMenuSection heading={"Users"}>
                <DashboardSideMenuNotification
                  isLoading={isLoading}
                  linkLabel={"Registered"}
                  linkTo={"/admin/users/Registered"}
                  notification={users.length}
                />
                <DashboardSideMenuNotification
                  isLoading={isLoading}
                  linkLabel={"Unregistered"}
                  linkTo={"/admin/users/Unregistered"}
                  notification={usersUnregistered.length}
                />
                <DashboardSideMenuNotification
                  isLoading={isLoading}
                  linkLabel={"All"}
                  linkTo={"/admin/users/"}
                  notification={usersAll}
                />
              </DashboardSideMenuSection>

              <DashboardSideMenuSection heading={"Events"}>
                <DashboardSideMenuNotification
                  isLoading={isLoading}
                  linkLabel={"Next event"}
                  linkTo={"/admin/events"}
                  date={
                    nextEvent
                      ? new Date(nextEvent.date).toLocaleDateString()
                      : "No events"
                  }
                />
                <DashboardSideMenuNotification
                  isLoading={isLoading}
                  linkLabel={"Upcoming"}
                  linkTo={"/admin/events"}
                  notification={nextEventsLength}
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
                  notification={pendingGuests.length}
                />
                <DashboardSideMenuNotification
                  linkLabel={"Confirmed"}
                  linkTo={"Confirmed"}
                  notification={confirmedGuests.length}
                />
                <DashboardSideMenuNotification
                  linkLabel={"All"}
                  linkTo={"All"}
                  notification={guests.length}
                />
              </DashboardSideMenuSection>

              <DashboardSideMenuSection heading={"Guests"}>
                <DashboardSideMenuNotification
                  linkLabel={"Manage"}
                  linkTo={"Manage"}
                  notification={"00"}
                />
                <DashboardSideMenuNotification
                  linkLabel={"Notifications"}
                  linkTo={"Notifications"}
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
                  linkLabel={"Manage"}
                  linkTo={"Manage"}
                  notification={"00"}
                />
              </DashboardSideMenuSection>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DashboardSideMenu;
