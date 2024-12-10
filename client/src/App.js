import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Hooks
// import { useAuthContext } from "./hooks/useAuthContext";

// Component Imports 
import Navbar from './components/Navbar'

// Page Imports 
import Home from './pages/Home'
import Weddings from './pages/Weddings'
import Subscribe from './pages/Subscribe'
import SignIn from './pages/SignIn'
// import Login from './pages/Login'
// import Signup from './pages/Signup'

function App() {
  return (
    <div className="layout-page">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/weddings" element={<Weddings />} />
          <Route path="/Subscribe" element={<Subscribe />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
