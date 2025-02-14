import { useContext } from "react";
import { BookingContext } from "../context/BookingContext";

// Custom hook to access booking data from BookingContext
const useBookings = () => {
  // Retrieve booking-related state and functions from the BookingContext
  const { bookings, pendingBookings, confirmedBookings, loading, error, fetchBookings } =
    useContext(BookingContext);

  // Return the booking data and functions for use in components
  return { bookings, pendingBookings, confirmedBookings, loading, error, fetchBookings };
};

export default useBookings;
