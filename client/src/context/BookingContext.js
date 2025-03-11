import { createContext, useReducer } from "react";

// Initial state
const initialState = {
  bookings: [],
  pendingBookings: [],
  confirmedBookings: []
};

// Reducer function
export const bookingReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKINGS":
      return {
        ...state,
        bookings: action.payload,
        pendingBookings: action.payload.filter((b) => b.status === "pending"),
        confirmedBookings: action.payload.filter(
          (b) => b.status === "confirmed"
        ),
      };
    case "SET_BOOKING": {
      return {
        ...state,
        selectedBookings: action.payload,
      };
    }
    case "CREATE_BOOKING":
      return {
        ...state,
        bookings: [action.payload, ...state.bookings],
      };
    case "DELETE_BOOKING":
      return {
        ...state,
        bookings: state.bookings.filter((w) => w._id !== action.payload._id),
        pendingBookings: state.pendingBookings.filter(
          (w) => w._id !== action.payload._id
        ),
        confirmedBookings: state.confirmedBookings.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    case "UPDATE_BOOKING":
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        ),
        pendingBookings: state.pendingBookings.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        ),
        confirmedBookings: state.confirmedBookings.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        ),
      };

    default:
      return state; // original state
  }
};

// Custom Hook
export const BookingContext = createContext();

// property provider
export const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    // Spread operator to return object state
    <BookingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};
