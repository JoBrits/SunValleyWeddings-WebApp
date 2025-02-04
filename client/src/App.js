import { BrowserRouter, Routes, Route} from "react-router-dom";

// Hooks
import { useAuthContext } from "./hooks/useAuthContext";

// Component Imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Page Imports
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import Weddings from "./pages/Weddings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Bookings from "./pages/Bookings";

function App() {
  // fetch user from useAuthContext
  const { user } = useAuthContext();

  return (
    <div className="layout-page">
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          {/* Route "/" based on user status and role */}
          <Route
            path="/"
            element={
              user ? (
                user.role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <UserDashboard />
                )
              ) : (
                <Home />
              )
            }
          />
          <Route path="/weddings" element={<Weddings />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
