import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./Profile.css";

function Profile() {
  const [mode, setMode] = useState("dark");
  const navigate = useNavigate();
  const location = useLocation();

  const usersData = JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.backgroundColor = mode === "dark" ? "#141414" : "#f5f5f5";
  }, [mode, location]);

  const handleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleshowbooking = () => {
    navigate("/MyMovies");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e50914",
      cancelButtonColor: "#555",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonText:'OK',
          showConfirmButton: true,
              customClass:{
              confirmButton:'Mybutton'
            }
        }).then(() => {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem('userType');
          navigate("/login");
          
        });
      }
    });
  };

  return (
    <div className={`profile-container ${mode}`}>
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://www.shutterstock.com/image-vector/people-person-icon-modern-flat-600nw-1691909635.jpg"
            alt="User Avatar"
            className="profile-avatar"
          />
          <h2 className="welcome-text">Welcome, {usersData.fname || "User"}!</h2>
          <button className="mode-btn" onClick={handleMode}>
            {mode === "dark" ? (
              <i className="fa-solid fa-sun"></i>
            ) : (
              <i className="fa-solid fa-moon"></i>
            )}
          </button>
        </div>

        <div className="profile-details">
          <h3>Profile Information</h3>
          <div className="details-list">
            <p><strong>Name :</strong> &nbsp; {usersData.fname} {usersData.lname}</p>
            <p><strong>Email :</strong> &nbsp; {usersData.email}</p>
            <p><strong>Phone :</strong> &nbsp; {usersData.phone}</p>
            <p><strong>User ID :</strong> &nbsp; {usersData.userid}</p>
            <p><strong>Password :</strong> &nbsp; {usersData.password}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="action-btn" onClick={handleshowbooking}>
            <i className="fa-solid fa-ticket"></i> Your Bookings
          </button>

          <button className="action-btn">
            <i className="fa-solid fa-bell"></i> Notifications
          </button>

          <button className="action-btn logout" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
