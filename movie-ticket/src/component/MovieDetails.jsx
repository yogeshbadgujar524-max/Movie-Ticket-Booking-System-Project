import { Link, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import "./Profile.css"

import trendingMovies from './TrendingMovies';
import mostWatchedMovies from './MostWatchedMovies';
import underratedMovies from './UnderratedMovies';

function MovieDetails() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const { category, id } = useParams();
  const movieId = parseInt(id);

  let movie;

  if (category === 'trending') {
    movie = trendingMovies.find((m) => m.id === movieId);
  } else if (category === 'mostwatched') {
    movie = mostWatchedMovies.find((m) => m.id === movieId);
  } else if (category === 'underrated') {
    movie = underratedMovies.find((m) => m.id === movieId);
  }

  if (!movie) {
    return <p style={{position:"relative",left:"460px",bottom:"50px",fontSize:"30px",color:"White",fontWeight:"bold"}}>Movie not found. Please Select <a href='/Movies' style = {{textDecoration:"none",color:"wheat"}}>Movie</a></p>;
  }

  return (
    <>
      <div className='m-image' style={{ marginLeft: "50px", height: "450px",position: "relative", top: "10px" }}>
        <img src={movie.image} alt={movie.title} style={{ height: "100%" }} />
      </div>

      <div>
        <h3 style={{ position: "relative", bottom: "550px", left: "700px", fontSize: "50px", color: "white" }}>
          {movie.title} <i style={{ fontSize: "25px" }}>({movie.year})</i>
        </h3>
        <p style={{ position: "relative", bottom: "120px", left: "100px", fontSize: "25px", color: "lightblue", fontWeight: "bold" }}>
          Genres: {movie.type}
        </p>
        <p style={{ position: "relative", bottom: "620px", left: "680px", fontSize: "20px", color: "pink" }}>
          Start to book your favourite movie in ₹ {movie.price}
        </p>
      </div>

      <div className='Movie-details' style={{ position: "relative", bottom: "220px", left: "100px", fontSize: "18px" }}>
        <h3 style={{ marginLeft: "450px", position: "relative", bottom: "400px", color: "goldenrod", fontSize: "20px" }}>
          {movie.desc}
        </h3>
        <br />
        <div style={{ marginLeft: "450px", position: "relative", bottom: "400px", color: "white" }}>
          <p>Director <i style={{ color: "darkcyan" }}>{movie.director}</i></p>
          <hr />
          <p>Writers <i style={{ color: "darkcyan" }}>{movie.writers}</i></p>
          <hr />
          <p>Stars <i style={{ color: "darkcyan" }}>{movie.stars}</i></p>
          <hr />
        </div>
      </div>

      <div style={{ position: "relative", bottom: "600px", left: "560px" }}>
        <button className="mbutton" style={{ width: "400px", backgroundColor: "black" }}>
          <Link
            to="/SeatBooking"
            state={{ title: movie.title, price: movie.price, image: movie.image }}
            style={{ textDecoration: "none", color: "white" }}
          >
            Booking Movie
          </Link>
        </button>
      </div>
    </>
  );
}

export default MovieDetails;
