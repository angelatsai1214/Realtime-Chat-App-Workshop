import { useState, useEffect } from "react"
import { NavLink, useNavigate } from 'react-router-dom';

import "../App.css"

import {  signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import ProfilePic from "../img/ProfilePic.png"
import { FaArrowLeft } from "react-icons/fa";


const ChatBar = ({targetUser}) => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    return(
        <div className="ChatBar">
            <FaArrowLeft onClick={()=>navigate('/')} style={{cursor: "pointer"}}/>
            <img src={ProfilePic} />
            <div className="ChatBarName"><h2>{targetUser}</h2></div>

        </div>
    )
}

export default ChatBar;