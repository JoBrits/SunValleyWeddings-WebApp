import { createContext, useReducer } from "react";

export const GuestContext = createContext();

// Reducer function
export const guestReducer = (state, action) => {
  switch (action.type) {
    case "SET_GUESTS":
      return {
        guests: action.payload,
        pendingGuests: action.payload.filter((b) => b.status === "pending"),
        confirmedGuests: action.payload.filter(
          (b) => b.status === "confirmed"
        ),
      };
    case "CREATE_GUEST":
      return {
        guests: [action.payload, ...state.guests],
      };
    case "DELETE_GUEST":
      return {
        guests: state.guests.filter((w) => w._id !== action.payload._id),
        pendingGuests: state.pendingGuests.filter(
          (w) => w._id !== action.payload._id
        ),
        confirmedGuests: state.confirmedGuests.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    case "UPDATE_GUEST":
      return {
        guests: state.guests.map((guest) =>
          guest._id === action.payload.id ? action.payload : guest
        ),
        pendingGuests: state.pendingGuests.map((guest) =>
          guest._id === action.payload._id ? action.payload : guest
        ),
        confirmedGuests: state.confirmedGuests.map((guest) =>
          guest._id === action.payload._id ? action.payload : guest
        ),
      };

    default:
      return state; // original state
  }
};

// property provider
export const GuestContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(guestReducer, {
    guests: [],
    pendingGuests: [],
    confirmedGuests: [],
  });

  return (
    // Spread operator to return object state
    <GuestContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GuestContext.Provider>
  );
};
