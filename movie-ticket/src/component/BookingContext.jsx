// BookingContext.js
import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookedMovies, setBookedMovies] = useState(() => {
    const saved = localStorage.getItem("BookedMoviesList");
    return saved ? JSON.parse(saved) : [];
  });

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
