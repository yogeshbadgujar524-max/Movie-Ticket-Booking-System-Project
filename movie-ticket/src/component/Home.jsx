import React from 'react'
import './Home.css'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigate,Link, useNavigate } from 'react-router-dom'

function Home() {
    const location = useLocation();
   useEffect(() => {
    window.scrollTo(0,0);
  }, [location]);
  const navgated = useNavigate();
  const movie = () =>{
    navgated("/Movies");
  }
  return (
    <>
  <div className='home'>
    <div className='contains'>
        <h3>SECURE SEATES ,<br/> BOOK ALL TICKETS <br/><span>EFFORTLESSLLY</span></h3>
        <h6>Unlock unfogettable advanture with our easy to use ticket booking platform,where convenience meets choices <br/>for every journey and events and make sure your intrested to watching the best movies</h6>     
      </div> 
      <div className='book-btn'>
      <button><a href='Movies'>Book Now</a></button>
      <button className='btn2'><Link to='Contact'>Contact Us</Link></button>
      </div>
    <div className='home-img'>
      <img src='https://media.istockphoto.com/id/1401019613/photo/movie-tickets-online-booking-app.jpg?s=612x612&w=0&k=20&c=qre7CchnzXeLh72GXH3sOiPvNKX2aNoxEIHV1DM9lwI='></img>
    </div>
    <div className='line'>

    </div>
    <div className='boxes'>
      <div className='box'>
        <p>Join Now</p>
        <h3>Upcomming Film <br/>Festivals</h3>
      </div>
      <div className='box'>
        <p>Watch Now</p>
        <h3>Watching Movies <br/>Awards</h3>
      </div>
      <div className='box'>
        <p>Get Tickets</p>
        <h3>Watching Comedy <br/>Shows</h3>
      </div>
    </div>
    <div className='Home-movies'>
      <div className='home-main-movie'>
        <img src='https://i.ytimg.com/vi/WVTnxhH_EQ8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBxSNBJyhoXXcNgtF6b_ksPqc7qhA'></img>
        <div className='black'></div>
        <h2>Thama</h2>
        <div className="dir">
        <p>Things get complicated when Kabir Dhaliwal,a secret agent, <br/> is accused of betraying his nation and his former batchmate <br/> Vikram is assigned the task of finding him.</p>
        <marquee>
          Director : Ayan Mukerji &nbsp; Writers : Aditya ChopraShridhar RaghavanAbbas Tyrewala &nbsp; Stars : Hrithik RoshanN.T. Rama Rao Jr.Kiara Advani</marquee>
      </div>
      </div>
      <br></br>
      <div className='h-movies'>
        <div className='movie'>
          <img src='https://m.media-amazon.com/images/I/91R0hGWtbpL._UF1000,1000_QL80_.jpg'></img>

        <h3>Galionki Raasleela : Ram Leela</h3>
        <p>Type : Action</p>
      </div>
      <div className='movie'>
          <img src='https://m.media-amazon.com/images/M/MV5BYjAwZWE2NmUtYjFjYy00Y2EyLTg4OTgtNmQ0NTQyY2M0NjE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'></img>

        <h3>Bahubali 2</h3>
        <p>Type : Action / Cultural</p>
      </div>
      <div className='movie'>
          <img src="https://m.media-amazon.com/images/M/MV5BNDM5ZWM2ZTktZTM5My00NGQzLWFkYmItZjAyNDU0ZTliOGIyXkEyXkFqcGc@._V1_.jpg"></img>

        <h3>Chennai Express</h3>
        <p>Type : Action</p>
      </div>
      <div className='movie'>
          <img src="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8173602_p_v8_ac.jpg"></img>

        <h3>Khatta Meetha</h3>
        <p>Type : Comedy</p>
      </div>
    </div>
  </div>
  <button className='btn' onClick={movie}>See More....</button>
  </div>
   </>
  )
}

export default Home
