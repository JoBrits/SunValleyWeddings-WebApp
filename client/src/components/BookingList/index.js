import { useState, useEffect } from "react";
import { useBookingContext } from "../../hooks/useBookingContext";

// Styles
import classNames from "classnames";
import styles from "./BookingList.module.scss";

const BookingList = ({
  view,
  selectedDate,
  showEventPopup,
  setShowEventPopup,
}) => {
  console.log(view);
  console.log(selectedDate);
  console.log(showEventPopup);
  console.log(setShowEventPopup);

  const { bookings, pendingBookings, confirmedBookings, dispatch } =
    useBookingContext();
  const [loading, setLoading] = useState(false);

  // fetchBookings
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

  // Filter confirmed bookings based on selectedDate
  const filteredBookings = confirmedBookings.filter(
    (booking) =>
      new Date(booking.eventDate).toDateString() ===
      new Date(selectedDate).toDateString()
  );

  return (
    <div className={classNames(styles["booking-list-container"])}>
      {!loading && (
        <div className={classNames(styles["booking-list-container-items"])}>
          {view === "pending" && (
            <>
              <ul className={classNames(styles["booking-list"])}>
                {pendingBookings.map((booking) => (
                  <BookingItem key={booking._id} booking={booking} />
                ))}
              </ul>
            </>
          )}
          {view === "confirmed" && (
            <>
              <ul className={classNames(styles["booking-list"])}>
                {confirmedBookings.map((booking) => (
                  <BookingItem key={booking._id} booking={booking} />
                ))}
              </ul>
            </>
          )}
          {view === "all" && (
            <>
              <ul className={classNames(styles["booking-list"])}>
                {bookings.map((booking) => (
                  <BookingItem key={booking._id} booking={booking} />
                ))}
              </ul>
            </>
          )}
          {view === "byDate" && (
            <>
              <h3 className="dashboard-sub-heading">Bookings for {new Date(selectedDate).toDateString()}</h3>
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
        </div>
      )}
    </div>
  );
};

// Extracted BookingItem component for reusability
const BookingItem = ({ booking }) => {
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
    <li className={classNames(styles["booking-list-item"])}>
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
      <p className={classNames(styles["booking-list-received"])}>
        {booking.status}
      </p>
    </li>
  );
};

export default BookingList;
