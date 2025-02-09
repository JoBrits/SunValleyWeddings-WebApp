import { createContext, useReducer } from "react";

export const BookingContext = createContext();

// Reducer function
export const bookingReducer = (state, action) => {
  
  switch (action.type) {
    case "SET_BOOKINGS":
      return {
        bookings: action.payload,
      };
    case "CREATE_BOOKING":
      return {
        bookings: [action.payload, ...state.bookings],
      };
    case "DELETE_BOOKING":
      return {
        bookings: state.bookings.filter((w) => w._id !== action.payload._id), // get to dos from previous array, then filter through and return false if we want to remove a to do
      };
    case "UPDATE_BOOKING":
        console.log('action.payload = ' + action.payload)
      return {
        bookings: state.bookings.map((booking) =>
            booking._id === action.payload._id ? action.payload : booking
        ),
      };

    default:
      return state; // original state
  }
};

// property provider
export const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, {
    bookings: [],
  });

  return (
    // Spread operator to return object state
    <BookingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};