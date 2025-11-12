// BookingContext.js
import React, { createContext, useState ,useEffect} from 'react';
import axios from 'axios';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookedMovies, setBookedMovies] = useState(() => {
    const saved = localStorage.getItem("BookedMoviesList");
    return saved ? JSON.parse(saved) : [];
  });


  const useremail = localStorage.getItem("email");

  useEffect(() => {
    if (useremail) {
      axios.get("http://localhost:3001/booking")
        .then(res => {
          // Filter bookings belonging to this user
          const userBookings = res.data.filter(b => b.email === useremail);
          setBookedMovies(userBookings);
        })
        .catch(err => console.error("Error fetching bookings:", err));
    }
  }, [useremail]);

  const addBooking = (movie) => {
    const updated = [...bookedMovies, movie];
    setBookedMovies(updated);
    localStorage.setItem("BookedMoviesList", JSON.stringify(updated));
  };

  const cancelBooking = (index) => {
    
    const updated = [...bookedMovies];
    updated.splice(index, 1);
    setBookedMovies(updated);
    localStorage.setItem("BookedMoviesList", JSON.stringify(updated));
  };

  return (
    <BookingContext.Provider value={{ bookedMovies, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
