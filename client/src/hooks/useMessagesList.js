import { useState, useEffect } from "react";

// Custom hook to fetch and manage message list data
const useMessagesList = () => {
  // State to store message requests
  const [messages, setMessages] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to store any errors that occur during fetching
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch message requests from API
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages/inquiries");
        // Check if response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data); // Store fetched data in state
      } catch (err) {
        setError(err.message); // Capture error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false once fetching completes
      }
    };

    fetchMessages(); // Call the fetch function on component mount
  }, []);

  return { messages, loading, error }; // Return state values for use in components
};

export default useMessagesList;
