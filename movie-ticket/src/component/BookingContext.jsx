// BookingContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  
  // Load from localStorage initially
  const [bookedMovies, setBookedMovies] = useState(() => {
    const saved = localStorage.getItem("BookedMoviesList");
    return saved ? JSON.parse(saved) : [];
  });

  const useremail = localStorage.getItem("email");

  // Fetch bookings for this user from backend
  useEffect(() => {
    if (useremail) {
      axios
        .get("http://localhost:3001/booking")
        .then((res) => {
          const userBookings = res.data.filter(
            (b) => b.email === useremail
          );

          // Update context + localStorage
          setBookedMovies(userBookings);
          localStorage.setItem("BookedMoviesList", JSON.stringify(userBookings));
        })
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [useremail]);

  // Add a new booking
  const addBooking = (movie) => {
    const updated = [...bookedMovies, movie];
    setBookedMovies(updated);
    localStorage.setItem("BookedMoviesList", JSON.stringify(updated));
  };

  // Cancel booking by index
  const cancelBooking = (index) => {
    const updated = bookedMovies.filter((_, i) => i !== index);
    setBookedMovies(updated);
    localStorage.setItem("BookedMoviesList", JSON.stringify(updated));
  };

  return (
    <BookingContext.Provider
      value={{ bookedMovies, addBooking, cancelBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
};
