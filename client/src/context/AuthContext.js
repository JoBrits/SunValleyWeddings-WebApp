import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

// Reducer function
export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP":
      return { ...state };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { user: null }; // reset state
    case "UPDATE":
      return { user: { ...state.user, ...action.payload } }; // update user data
    default:
      return state; // original state
  }
};

// property provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // Conditional to check if user is already logged in and update state accordingly
  useEffect(() => {
    // checks local storage for user and parse string to object
    const user = JSON.parse(localStorage.getItem("user"));

    // dispatch state
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  // Testing
  // console.log("AutContext state : ", state);

  return (
    // Spread operator to return object state
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
