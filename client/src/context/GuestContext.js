import { createContext, useReducer } from "react";

export const GuestContext = createContext();

// Reducer function
export const guestReducer = (state, action) => {
  switch (action.type) {
    case "SET_GUESTS":
      return {
        ...state, // Preserve the existing state
        guests: action.payload,
        pendingGuests: action.payload.filter((b) => b.status === "pending"),
        confirmedGuests: action.payload.filter((b) => b.status === "confirmed"),
      };
    case "SET_ALL_GUESTS":
      return {
        ...state,
        allGuests: action.payload,
        allPendingGuests: action.payload.filter((b) => b.status === "pending"),
        allConfirmedGuests: action.payload.filter((b) => b.status === "confirmed"),
      };
    case "CREATE_GUEST":
      return {
        ...state,
        guests: [action.payload, ...state.guests],
        pendingGuests:
          action.payload.status === "pending"
            ? [action.payload, ...state.pendingGuests]
            : state.pendingGuests,
        confirmedGuests:
          action.payload.status === "confirmed"
            ? [action.payload, ...state.confirmedGuests]
            : state.confirmedGuests,
      };
    case "DELETE_GUEST":
      return {
        ...state,
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
        ...state,
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
    allGuests: [],
    allPendingGuests: [],
    allConfirmedGuests: [],
  });

  return (
    // Spread operator to return object state
    <GuestContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GuestContext.Provider>
  );
};
