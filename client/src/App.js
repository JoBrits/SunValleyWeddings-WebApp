import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Hooks
import { useAuthContext } from "./hooks/useAuthContext";

// Component Imports 
import Navbar from './components/Navbar'

// Page Imports 
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import Home from './pages/Home'
import Weddings from './pages/Weddings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Bookings from './pages/Bookings'

function App() {

  // fetch user from useAuthContext 
  const { user } = useAuthContext();

  return (
    <div className="layout-page">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          {/* Route "/" based on user role */}
          <Route
            path="/"
            element={
              user ? (
                user.role === "admin" ? <AdminDashboard /> : <UserDashboard />
              ) : (
                <Navigate to="/home" />
              )
            }
          /> 
          <Route path="/home" element={<Home />} />
          <Route path="/weddings" element={<Weddings />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
