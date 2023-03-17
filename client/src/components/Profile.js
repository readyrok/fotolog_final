import React from "react";
import AuthService from "../services/auth.service";
import './Profile.css';
import { Link } from "react-router-dom";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const username = currentUser.username.toUpperCase();
  const email = currentUser.email.toUpperCase();

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="background">
      <div className="profile-header">
          <p>
            @{username}
          </p>
      </div>
      <div className="profile">
        <span>
          <strong>.INFO:</strong>
          <p className="info">LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.</p>
        </span>
        <span>
          <strong>.EMAIL:</strong>
          <Link to={"#"} onClick = {() => openInNewTab(`mailto:${currentUser.email}`)} className="link info" >
            <p className="info">{email}</p>
          </Link>
          {/* <Link to={`mailto:${email}`}>
          </Link> */}          
        </span>
        <span>
          <strong>.SITE: </strong>
          <p className="info">
            <Link to={"#"} onClick = {() => openInNewTab("http://instagram.com/ready.rok/")}  className="link info">
              @SEBSEB
            </Link>
          </p> 
          <p>
            <Link to={"#"} onClick = {() => openInNewTab("http://instagram.com/ready.rok/")} className="link info">
              @SEBSEB.COM
            </Link>
          </p>         
        </span>
        <Link to={"/edit-profile"} id="edit-btn">
          <button id="edit-profile">
              .EDIT
          </button>
        </Link>
      </div>      
    </div>
  );
};

export default Profile;