// Styles
import classNames from "classnames";
import styles from "./BookingList.module.scss";

// Hooks
import useBookingList from "../../hooks/useBookingList";

const BookingList = () => {
  
  const { bookings, loading, error } = useBookingList();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={classNames(styles["booking-list-container"])}>
      <ul className={classNames(styles["booking-list"])}>
      {bookings.map((booking) => {
          const bookingDate = new Date(booking.eventDate); // Convert to date
          const formattedBookingDate = bookingDate
            ? bookingDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "Invalid Date"; // Fallback if date is invalid
          const createdAtDate = new Date(booking.createdAt); // Convert to date
          const formattedCreatedDate = bookingDate
            ? createdAtDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "Invalid Date"; // Fallback if date is invalid

          return ( 
            <li key={booking._id} className={classNames(styles["booking-list-item"])}>
              <div className={classNames(styles["booking-list-request"])}>
                <p><strong>{booking.name}</strong> for <strong>{formattedBookingDate}</strong></p>
                <span className={classNames(styles["booking-list-received"])}>{formattedCreatedDate}</span>
              </div>
              <div className={classNames(styles["booking-list-time"])}>{booking.eventGuests} Guests</div>
              <div className={classNames(styles["booking-list-time"])}>{booking.eventTime}</div>
              <p className={classNames(styles["booking-list-text"])}>{booking.eventNote}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookingList;
