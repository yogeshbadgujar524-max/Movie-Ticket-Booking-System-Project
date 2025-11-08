import React, { useContext,useEffect} from 'react';
import { BookingContext } from './BookingContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './Profile.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function MyMovies() {
  const { bookedMovies, cancelBooking } = useContext(BookingContext);

      const location = useLocation();
  
    useEffect(() => {
      window.scrollTo(0,0);
    }, [location]);



const cancelBooked = async (index) => {
  const movie = bookedMovies[index]; // get the movie to delete
  const bookingId = movie.bookingId;

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, cancel it!",
    cancelButtonText: "Cancel",
    customClass: {
      confirmButton: 'custom-swal-btn',
      cancelButton: 'custom-swal-btn',
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Call backend to delete booking
        const response = await axios.delete(`http://localhost:3001/booking/${bookingId}`);
        console.log(response.data);

        // Remove from context/localStorage
        cancelBooking(index);

        Swal.fire({
          title: "Deleted!",
          text: "Your movie booking has been cancelled.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error deleting booking:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to cancel booking. Please try again later.",
        });
      }
    }
  });
};



  return (
    <>
    <div className='MainMovies'>
      <h1 style={{position:"relative",left:"450px",bottom:"50px",fontSize:"45px",color:"white"}}>My Booked Movies</h1>
      {bookedMovies.length === 0 ? (
        <p style={{position:"relative",left:"480px",bottom:"50px",fontSize:"30px",color:"orange"}}>No movies booked yet.
        <a href='/Movies' style={{textDecoration:"none",position:"relative",top:"60px",right:"300px",color:"AppWorkspace"}}>Book You'r favorite movie <span style={{color:"yellowgreen",fontWeight:"lighter"}}>Here</span></a></p>
      ) : (
        bookedMovies.map((movie, index) => (
          <div key={index} style={{ height:"300px",width:"700px",border: '1px solid #ccc', padding: '30px', marginBottom: '20px',backgroundColor:"white",borderRadius:"25px",marginLeft:"250px"}}>
            <h2 style = {{position:"relative",left:"250px",top:"10px",fontSize:"40px"}}>{movie.title}</h2>
            
            {movie.image && (
              <img
                src={movie.image}
                alt={movie.title}
                style={{ width: '200px', height: '100%', borderRadius:"15px",marginBottom: '10px', marginTop:"-140px",position:"relative",top:"10px"}}
              />
            )}
            <hr/>
            <div className='moviedetail' style={{position:"relative",left:"250px",bottom:"150px"}}>

            <p style={{position:"relative",font:"message-box",fontWeight:"bolder",fontStyle:"italic",bottom:"40px"}}>Time: {movie.time}</p>
            <p style={{position:"relative",font:"message-box",fontWeight:"bolder",fontStyle:"italic",bottom:"40px"}}>Date: {movie.date}</p>
            <p style={{position:"relative",font:"message-box",fontWeight:"bolder",fontStyle:"italic",bottom:"40px"}}>Mode: {movie.mode}</p>
            <p style={{position:"relative",font:"message-box",fontWeight:"bolder",fontStyle:"italic",bottom:"40px"}}>Seats: {movie.seats}</p>
            <p style={{position:"relative",right:"240px",font:"message-box",color:"slateblue",fontWeight:"bolder"}}>Booking ID : {movie.bookingId}</p>
            <h3 style={{position:"relative",bottom:"35px",left:"300px"}}><input type='checkbox' name='check' checked/>Completed</h3>
            <h3 style={{position:"relative",bottom:"120px",fontStyle:"italic",fontWeight:"revert-layer"}}>Total Price : ₹{movie.price}</h3>
            <button className = "cancelbtn" onClick={() => cancelBooked(index)}>Cancel Booking</button>
          </div>
          </div>
        ))
      )}
    </div>

    </>
  );
}

export default MyMovies;
