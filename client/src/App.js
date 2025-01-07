import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Hooks
import { useAuthContext } from "./hooks/useAuthContext";

// Component Imports 
import Navbar from './components/Navbar'

// Page Imports 
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Weddings from './pages/Weddings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {

  // fetch user from useAuthContext 
  const { user } = useAuthContext();

  return (
    <div className="layout-page">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route 
            path="/" 
            element={ user ? <Dashboard /> : <Navigate to="/Home" />} // Ternary operator if user does not exist redirect to /home
          />  
          <Route path="/home" element={<Home />} />
          <Route path="/weddings" element={<Weddings />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
