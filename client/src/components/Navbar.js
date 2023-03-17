import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Avatar from '../images/avatar.png';
import "../App.css";
import "./Navbar.css";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const Navbar = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [userUrl, setUserUrl] = useState("")
    const [showUploadButton, setShowUploadButton] = useState(false);

    useEffect(() => {

        const user = AuthService.getCurrentUser();

        if (user) {
            const USER_URL = "/files/" + user["username"];
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setUserUrl(USER_URL);
        }

    }, []);
    
    useEffect(()=> {
        if(AuthService.getCurrentUser()){
            UserService.getUserBoard().then(
                (response) => {
                    console.log(AuthService.getCurrentUser());
                    if(response.data.length!==0){
                        const lastUploadDate = new Date(response.data.reverse()[0]["uploadDate"]);
                        const today = new Date();
                        if(today.getDay()===lastUploadDate.getDay()
                            &&today.getMonth()===lastUploadDate.getMonth()
                            &&today.getFullYear()===lastUploadDate.getFullYear()){
                                setShowUploadButton(false);
                        }else{
                            setShowUploadButton(true);
                        }
                    }else{
                        setShowUploadButton(true);
                    }
                }
            )
        }
            
    }, [])

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <div className="navbar">
            {currentUser ? (
                <div className="hello">
                    <p>.HELLO</p>
                </div>
            ) : (
                <div className="welcome">
                    <Link to={"/"} className="link">
                        <pr>
                            WELCOME
                            TO
                            .FOTOLOG
                        </pr>
                    </Link>                    
                </div>
            )}
            
            <ul className="login-menu">           
               {showModeratorBoard && (
                    <li className="item">
                        <Link to={"/mod"} className="link">
                            .MODERATOR
                        </Link>
                    </li>
                )}

                {showAdminBoard && (
                    <li className="item">
                        <Link to={"/admin"} className="link">
                            .ADMIN
                        </Link>
                    </li>
                )}


                {currentUser ? (
                    <div>
                        <li className="item">
                            <Link to={"/profile"} className="link">
                                .PROFILE
                            </Link>
                        </li>

                        <li className="item">
                            <Link to={userUrl} className="link">
                                .PAGE
                            </Link>
                        </li>

                        <li className="item">
                            <Link to={"/file"} className="link">
                                .TIMELINE
                            </Link>
                        </li>

                        { showUploadButton && (
                            <li className="item">
                                <Link to={"/upload"} className="link">
                                    .UPLOAD
                                </Link>
                            </li>
                        )}

                        <li className="item">
                            <a href="/" className="link" onClick={logOut}>
                                .LOGOUT
                            </a>
                        </li>
                    </div>
                    ) : (
                    <div>
                        <li className="item">
                            <Link to={"/login"} className="link">
                                .LOGIN
                            </Link>
                        </li>

                        <li className="item">
                            <Link to={"/register"} className="link">
                                .SIGNUP
                            </Link>
                        </li>

                        <li className="item">
                            <Link to={"/about"} className="link">
                                .ABOUT
                            </Link>
                        </li>

                        <li className="item">
                            <Link to={"/contact"} className="link">
                                .CONTACT
                            </Link>
                        </li>
                    </div>
                )}
            </ul>             
        </div>
    );

};

export default Navbar;