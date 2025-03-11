import { createContext, useReducer } from "react";

export const UserContext = createContext();

// Reducer function
export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state, // Preserve the existing state
        users: action.payload
      };
    case "CREATE_USER":
      return {
        ...state, // Preserve the existing state
        users: [action.payload, ...state.users],
      };
    case "DELETE_USER":
      return {
        ...state, // Preserve the existing state
        users: state.users.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_USER":
      return {
        ...state, // Preserve the existing state
        users: state.guests.map((user) =>
          user._id === action.payload.id ? action.payload : user
        )
      };

    default:
      return state; // original state
  }
};

// property provider
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, {
    users: []
  });

  return (
    // Spread operator to return object state
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
