import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { useAuthContext } from "./hooks/useAuthContext";

// Component Imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardSideMenu from "./components/DashboardSideMenu";

// Page Imports
// Pre-Login
import Home from "./pages/Home";
import Weddings from "./pages/Weddings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
// Post-Login - Admin
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminBookings from "./pages/Admin/Bookings";
import AdminRSVP from "./pages/Admin/Rsvp";
import AdminGuests from "./pages/Admin/Guests";
import AdminEvents from "./pages/Admin/Events";
// Post-Login - User
import UserDashboard from "./pages/User/Dashboard";
import UserGuests from "./pages/User/Guests";
import UserGuest from "./pages/User/Guest";

function App() {
  // fetch user from useAuthContext
  const { user } = useAuthContext();

  return (
    <div className="layout-page">
      <BrowserRouter>
        {/* Main Nav */}
        <Navbar user={user} />
        {/* Dashboard Nav when logged in */}
        {user && <DashboardSideMenu user={user} />}
        <Routes>
          {/* Route "/" based on user status and role */}
          <Route
            path="/"
            element={
              user ? (
                user.role === "admin" ? (
                  <AdminDashboard id={user.id} />
                ) : (
                  <UserDashboard user={user} />
                )
              ) : (
                <Home />
              )
            }
          />

          {/* Logged out pages */}
          <Route path="/weddings" element={<Weddings />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/bookings" element={<Bookings />} />

          {/* Admin Section */}
          <Route
            path="/admin/*"
            element={user ? <AdminRoutes user={user} /> : <Navigate to="/" />}
          />

          {/* User Section */}
          <Route
            path="/user/*"
            element={user ? <UserRoutes user={user} /> : <Navigate to="/" />}
          />

          {/* Shared Section */}
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

// Separate admin routes
function AdminRoutes({ user }) {
  return (
    <Routes>
      <Route path="bookings/:view?" element={<AdminBookings />} />
      <Route path="guests/:view?" element={<AdminGuests />} />
      <Route path="rsvp" element={<AdminRSVP />} />
      <Route path="events" element={<AdminEvents />} />
    </Routes>
  );
}

// Separate user routes
function UserRoutes({ user }) {
  return (
    <Routes>
      <Route path="guests" element={<UserGuests user={user}/>} />
      <Route path="guest" element={<UserGuest />} />
    </Routes>
  );
}

export default App;