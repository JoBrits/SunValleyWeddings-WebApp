import { useState, useEffect } from "react";

// Custom hook to fetch and manage booking list data
const useBookingList = () => {
  // State to store booking requests
  const [bookings, setBookings] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to store any errors that occur during fetching
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch booking requests from API
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings/requests");
        // Check if response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data); // Store fetched data in state
      } catch (err) {
        setError(err.message); // Capture error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false once fetching completes
      }
    };

    fetchBookings(); // Call the fetch function on component mount
  }, []);

  return { bookings, loading, error }; // Return state values for use in components
};

export default useBookingList;
