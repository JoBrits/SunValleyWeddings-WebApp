import { useState, useEffect } from "react";

// Context
import { useAuthContext } from "../../hooks/useAuthContext";
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

const DashboardSideMenu = () => {
  // User Context
  const { user } = useAuthContext();

  // Booking Context
  const {
    bookings,
    pendingBookings,
    confirmedBookings,
    dispatch: dispatchBookings,
  } = useBookingContext();

  // Users Context
  const { users, dispatch: dispatchUsers } = useUserContext();

  // Guest Context
  const {
    allGuests,
    allPendingGuests,
    allConfirmedGuests,
    dispatch: dispatchGuests,
  } = useGuestContext();

  const [userBookings, setUserBookings] = useState({});
  const [userBookingsConfirmed, setUserBookingsConfirmed] = useState({});
  const [userBookingsPending, setUserBookingsPending] = useState({});
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
          // set user bookings
          const userBooking = bookingsData.filter(
            (booking) => booking.email === user.email
          );
          const userBookingConfirmed = bookingsData.filter(
            (booking) => booking.email === user.email && booking.status === "confirmed"
          );
          const userBookingPending = bookingsData.filter(
            (booking) => booking.email === user.email && booking.status === "pending"
          );

          dispatchBookings({ type: "SET_BOOKINGS", payload: bookingsData });
          getNextUpcomingEvent(bookingsData);
          setUserBookings(userBooking);
          setUserBookingsConfirmed(userBookingConfirmed);
          setUserBookingsPending(userBookingPending);
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

        // Fetch Guests for Each Booking for user side menu
        const guestsData = await Promise.all(
          bookingsData
            .filter((booking) => {
              return booking.email === user.email;
            })
            .map(async (booking) => {
              const guestsRes = await fetch(`/api/guests/${booking._id}`);
              if (guestsRes.ok) {
                return guestsRes.json();
              } else {
                return [];
              }
            })
        );

        const allGuests = guestsData.flat(); // Merge all guests into a single array

        dispatchGuests({ type: "SET_ALL_GUESTS", payload: allGuests });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchAllData();
  }, [dispatchBookings, dispatchUsers, dispatchGuests, user.email]);

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
                  linkLabel={"Registered"}
                  linkTo={"/admin/users/Registered"}
                  notification={users.length}
                />
                <DashboardSideMenuNotification
                  linkLabel={"Unregistered"}
                  linkTo={"/admin/users/Unregistered"}
                  notification={usersUnregistered.length}
                />
                <DashboardSideMenuNotification
                  linkLabel={"All"}
                  linkTo={"/admin/users/"}
                  notification={usersAll}
                />
              </DashboardSideMenuSection>

              <DashboardSideMenuSection heading={"Events"}>
                <DashboardSideMenuNotification
                  linkLabel={"Next event"}
                  linkTo={"/admin/events"}
                  date={
                    nextEvent
                      ? new Date(nextEvent.date).toLocaleDateString()
                      : "No events"
                  }
                />
                <DashboardSideMenuNotification
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
                  linkTo={"/user/rsvp/Pending"}
                  notification={allPendingGuests.length}
                />
                <DashboardSideMenuNotification
                  linkLabel={"Confirmed"}
                  linkTo={"/user/rsvp/Confirmed"}
                  notification={allConfirmedGuests.length}
                />
                <DashboardSideMenuNotification
                  linkLabel={"All"}
                  linkTo={"/user/rsvp/"}
                  notification={allGuests.length}
                />
              </DashboardSideMenuSection>

              <DashboardSideMenuSection heading={"Bookings"}>
                <DashboardSideMenuNotification
                  linkLabel={"Pending"}
                  linkTo={"/user/bookings/Pending"}
                  notification={userBookingsPending.length}
                />
                <DashboardSideMenuNotification
                  linkLabel={"Confirmed"}
                  linkTo={"/user/bookings/Confirmed"}
                  notification={userBookingsConfirmed.length}
                />
                <DashboardSideMenuNotification
                  linkLabel={"All"}
                  linkTo={"/user/bookings"}
                  notification={userBookings.length}
                />
              </DashboardSideMenuSection>

              <DashboardSideMenuSection heading={"Schedule"}>
                <DashboardSideMenuNotification
                  linkLabel={"Manage"}
                  linkTo={"/user/schedule"}
                  notification={userBookings.length}
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
