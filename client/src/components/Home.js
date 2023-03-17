import React, { useState, useEffect } from "react";
import Image from '../images/4382.jpg'
import UserService from "../services/user.service";
import "./Home.css";

const Home = () => {

  const[content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="image-wrap">
        <img src={Image} alt="Main" className="main-photo"/>
    </div>
  )
}

export default Home;