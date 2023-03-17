import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";

import AuthService from "./services/auth.service";


import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Upload from "./components/Upload";
import Timeline from "./components/Timeline";
import EditProfile from "./components/EditProfile";

const Page = React.lazy(() => import("./components/Page"));

const App = () => {
  const user = AuthService.getCurrentUser();
  const [userUrl, setUserUrl] = useState("");

  useEffect(() => {
    if(user){
      setUserUrl("/files/" + user["username"]);
    } 
  }, [user]);
   

  return (
    <div className="app">
      <Navbar/>
      
      <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/file" element={<Timeline/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<Profile/>} />
            {/* <Route path="/page" element={<BoardUser/>} /> */}
            <Route path={userUrl} element={
              <Suspense fallback={<div>Loading</div>} >
                <Page/>
              </Suspense>            
            } />
            <Route path="/mod" element={<BoardModerator/>} />
            <Route path="/admin" element={<BoardAdmin/>} />
            {/* <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} /> */}
            <Route path="/upload" element={<Upload/>} />
            <Route path="/edit-profile" element={<EditProfile/>} />   
          </Routes>
      </div> 
    </div>
  );
};

export default App;