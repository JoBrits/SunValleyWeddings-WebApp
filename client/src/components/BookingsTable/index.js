import { useEffect } from "react";
import { useBookingContext } from "../../hooks/useBookingContext";

// Styles
import classNames from "classnames";
import styles from "./BookingsTable.module.scss";

const BookingsTable = () => {
  const { bookings, dispatch } = useBookingContext();

  // Fetch bookings when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings/bookings");
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_BOOKINGS", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [dispatch]);

  // Handle delete booking request
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/bookings/bookings/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch({ type: "DELETE_BOOKING", payload: { _id: id } });
      }
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };
  // Handle update booking request
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/api/bookings/bookings/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch({ type: "UPDATE_BOOKING", payload: { _id: id } });
      }
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  return (
    <div className={classNames(styles["bookings-table"])}>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Name</th>
            <th>Email</th>
            <th>Event Date</th>
            <th>Event Time</th>
            <th>Guests</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.title}</td>
              <td>
                {booking.name} {booking.surname}
              </td>
              <td>{booking.email}</td>
              <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
              <td>{booking.eventTime}</td>
              <td>{booking.eventGuests}</td>
              <td>{booking.eventNote}</td>
              <td>{booking.status}</td>
              <td>
              <div className={classNames(styles["bookings-table-buttons"])}>
                {/* Edit button triggers handleUpdate function */}
                <button onClick={() => handleUpdate(booking._id)}>
                  Edit
                </button>
                {/* Cancel button triggers handleDelete function */}
                <button onClick={() => handleDelete(booking._id)}>
                  Cancel
                </button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
