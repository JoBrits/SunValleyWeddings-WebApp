import { createContext, useReducer } from "react";

// Initial state
const initialState = {
  Schedules: []
};

// Reducer function
export const scheduleReducer = (state, action) => {
  switch (action.type) {
    case "SET_SCHEDULES":
      return {
        ...state,
        schedules: action.payload || [],
      };
    case "SET_SCHEDULE": {
      return {
        ...state,
        selectedSchedule: action.payload,
      };
    }
    case "CREATE_SCHEDULE":
      return {
        ...state,
        schedules: [action.payload, ...state.schedules],
      };
    case "DELETE_SCHEDULE":
      return {
        ...state,
        schedules: state.schedules.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_SCHEDULE":
      return {
        ...state,
        schedules: state.bookings.map((schedule) =>
          schedule._id === action.payload._id ? action.payload : schedule
        ),
      };

    default:
      return state; // original state
  }
};

// Custom Hook
export const ScheduleContext = createContext();

// property provider
export const ScheduleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(scheduleReducer, initialState);

  return (
    // Spread operator to return object state
    <ScheduleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ScheduleContext.Provider>
  );
};
