// import configureStore from reduxjs/toolkit
import { configureStore } from "@reduxjs/toolkit";
// import reducers
import todoReducer from "./toDoSlice";

// function that receives the current state and an action object and decides how to update the state if necessary, and then returns the new state:
export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});
