import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Hooks
import { useBookingContext } from "../../hooks/useBookingContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// Styles
import classNames from "classnames";
import styles from "./BookingList.module.scss";

// Components
import Spinner from "../../components/Spinner";

const BookingList = ({ view, selectedDate }) => {
  const { bookings, pendingBookings, confirmedBookings, dispatch: dispatchBookings } =
    useBookingContext();

  const { user } = useAuthContext();


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetchBookings
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/bookings/bookings?timestamp=${new Date().getTime()}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        // error handling
        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();

        if (response.ok) {
          dispatchBookings({ type: "SET_BOOKINGS", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setError(error.message);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [dispatchBookings]); // Runs only on mount

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize time to avoid mismatches

  const futureConfirmedBookings = confirmedBookings.filter(
    (booking) => new Date(booking.eventDate) >= today
  );

  const filteredBookings = futureConfirmedBookings.filter(
    (booking) =>
      new Date(booking.eventDate).toDateString() ===
      new Date(selectedDate).toDateString()
  );

  // conditional rendering for list
  const renderBookingList = (bookings) => (
    <ul className={classNames(styles["booking-list"])}>
      {bookings.map((booking) => (
        <BookingItem key={booking._id} booking={booking} />
      ))}
    </ul>
  );

  return (
    <div className={classNames(styles["booking-list-container"])}>
      {/* error handling */}
      {error && <p className="error-message">{error}</p>}
      {loading && <Spinner />}
      {!loading && (
        <div className={classNames(styles["booking-list-container-items"])}>
          {/* conditional rendering for list */}
          {view === "pending" && (
            <>
              {pendingBookings.length > 0 ? (
                renderBookingList(pendingBookings)
              ) : (
                <p>No pending booking requests</p>
              )}
            </>
          )}
          {view === "confirmed" && (
            <>
              {futureConfirmedBookings.length > 0 ? (
                renderBookingList(futureConfirmedBookings)
              ) : (
                <p>No confirmed booking requests</p>
              )}
            </>
          )}
          {view === "all" && (
            <>
              {bookings.length > 0 ? (
                renderBookingList(bookings)
              ) : (
                <p>No bookings to display</p>
              )}
            </>
          )}
          {view === "byDate" && (
            <>
              <h3 className="dashboard-sub-heading">
                Bookings for {new Date(selectedDate).toDateString()}
              </h3>
              {filteredBookings.length > 0 ? (
                <ul className={classNames(styles["booking-list"])}>
                  {filteredBookings.map((booking) => (
                    <BookingItem key={booking._id} booking={booking} />
                  ))}
                </ul>
              ) : (
                <p>No bookings for the selected date.</p>
              )}
            </>
          )}
          {view === "byEmail" && (
            <>
              {bookings.length > 0 ? (
                <ul className={classNames(styles["booking-list"])}>
                  {bookings
                    .filter((booking) => booking.email === user.email) // Filter by email
                    .map((booking) => (
                      <BookingItem key={booking._id} booking={booking} />
                    ))}
                </ul>
              ) : (
                <p>No bookings for the selected email.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Extracted BookingItem component for reusability
const BookingItem = ({ booking }) => {
  // fetch user from useAuthContext
  const { user } = useAuthContext();

  const bookingDate = new Date(booking.eventDate); // Convert to Date object
  const formattedBookingDate = bookingDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const createdAtDate = new Date(booking.createdAt);
  const formattedCreatedDate = createdAtDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <li>
      {user.role === "admin" ? (
        <Link
          to={`/admin/bookings/${booking._id}`}
          className={classNames(styles["booking-list-item"])}
        >
          <div className={classNames(styles["booking-list-request"])}>
            <p>
              <strong>{booking.name}</strong> for{" "}
              <strong>{formattedBookingDate}</strong>
            </p>
            <span className={classNames(styles["booking-list-received"])}>
              {formattedCreatedDate}
            </span>
          </div>
          <div className={classNames(styles["booking-list-time"])}>
            {booking.eventGuests} Guests
          </div>
          <div className={classNames(styles["booking-list-time"])}>
            {booking.eventTime}
          </div>
          <p className={classNames(styles["booking-list-text"])}>
            {booking.eventNote}
          </p>
        </Link>
      ) : (
        <Link
          to={`/user/bookings/${booking._id}`}
          className={classNames(styles["booking-list-item"])}
        >
          <div className={classNames(styles["booking-list-request"])}>
            <p>
              <strong>{booking.name}</strong> for{" "}
              <strong>{formattedBookingDate}</strong>
            </p>
            <span className={classNames(styles["booking-list-received"])}>
              {formattedCreatedDate}
            </span>
          </div>
          <div className={classNames(styles["booking-list-time"])}>
            {booking.eventGuests} Guests
          </div>
          <div className={classNames(styles["booking-list-time"])}>
            {booking.eventTime}
          </div>
          <p className={classNames(styles["booking-list-text"])}>
            {booking.eventNote}
          </p>
        </Link>
      )}
    </li>
  );
};

export default BookingList;
