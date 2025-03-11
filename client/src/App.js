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
import AdminUsers from "./pages/Admin/Users";
import AdminEvents from "./pages/Admin/Events";
// Post-Login - User
import UserDashboard from "./pages/User/Dashboard";
import UserGuests from "./pages/User/Guests";

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
                  <AdminDashboard/>
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
      <Route path="bookings/:view?" element={<AdminBookings user={user} />} />
      <Route path="users/:view?" element={<AdminUsers />} />
      <Route path="rsvp" element={<AdminRSVP />} />
      <Route path="events" element={<AdminEvents />} />
    </Routes>
  );
}

// Separate user routes
function UserRoutes({ user }) {
  return (
    <Routes>
      <Route path="my-details" element={<UserGuests user={user}/>} />
      <Route path="guests" element={<UserGuests user={user}/>} />
      <Route path="catering" element={<UserGuests user={user}/>} />
      <Route path="schedule" element={<UserGuests user={user}/>} />
    </Routes>
  );
}

export default App;