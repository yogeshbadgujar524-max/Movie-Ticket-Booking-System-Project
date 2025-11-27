import { useState, useEffect } from 'react';
import Navbar from './component/navbar';
import ProtectedRoute from './component/ProtectedRoute';
import Movies from './component/Movies';
import Home from './component/Home';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import FooterWrapper from './component/FooterWrapper';
import Contact from './component/Contact';
import SeatBooking from './component/SeatBooking';
import Register from './component/Register';
import Login from './component/Login';
import MovieDetails from './component/MovieDetails';
import MyMovies from './component/MyMovies';
import Profile from './component/Profile';
import AdminDashboard from './Admin/AdminDashboard';
import AdminBookings from './Admin/AdminBookings';
import { BookingProvider } from './component/BookingContext';

function AppWrapper() {
  return (
    <BookingProvider>
      <Router>
        <App />
      </Router>
    </BookingProvider>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // NEW
  const [isLoading, setIsLoading] = useState(true);
  const [usertype, setUsertype] = useState('');
  const navigate = useNavigate();

  // Load from localStorage once
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserType = localStorage.getItem('userType');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
    setIsLoading(false);
  }, []);

  // Update login state
  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', type);
  };

  // Update logout state
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/Login');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {/* Pass userType to Navbar */}
      
      <Navbar isLoggedIn={isLoggedIn} userType={userType} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Movies" element={<Movies />} />
        {/* <Route path="/Contact" element={<Contact />} /> */}

        {/* Private Routes */}
        <Route path="/SeatBooking" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SeatBooking />
            </ProtectedRoute>
          } />
        <Route path="/MyMovies" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MyMovies />
            </ProtectedRoute>
          } />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path='/Contact' element = {
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Contact />
          </ProtectedRoute>
        }
        />
        <Route
          path="/movie/:category/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MovieDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userbookings"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminBookings />
            </ProtectedRoute>
          }
        />
        {/* Pass handleLogin to Login */}
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />
      </Routes>
      <FooterWrapper />
    </>
  );
}

export default AppWrapper;
