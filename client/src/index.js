import React from "react";
import ReactDOM from "react-dom/client";
import './styles/main.scss';
import App from "./App";
// import { ToDoContextProvider } from "./context/ToDoContext";
// import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <AuthContextProvider>
      <ToDoContextProvider> */}
        <App />
      {/* </ToDoContextProvider>
    </AuthContextProvider> */}
  </React.StrictMode>
); 
