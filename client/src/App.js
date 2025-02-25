import { BrowserRouter, Routes, Route } from "react-router-dom";

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
// Post-Login - Admin
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminBookings from "./pages/Admin/Bookings";
import AdminRSVP from "./pages/Admin/Rsvp";
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
                  <AdminDashboard id={user.id}/>
                ) : (
                  <UserDashboard id={user.id} />
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
          <Route path="admin/bookings" element={<AdminBookings />} />
          <Route path="admin/rsvp" element={<AdminRSVP />} />
          
          {/* User Section */}
          
          <Route path="user/guests" element={<UserGuests />} />
          <Route path="user/guest" element={<UserGuest />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
