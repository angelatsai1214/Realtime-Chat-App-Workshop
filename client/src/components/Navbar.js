import { useState, useEffect } from "react"
import { NavLink, useNavigate } from 'react-router-dom';
import "../App.css"

import {  signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const handleLogout = () => {    
        localStorage.removeItem("available users")           
        signOut(auth).then(() => {
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log("Error at logout: ", error)
        });
    }


    return(
        <div className="Navbar">
            <div><h2 onClick={()=>navigate('/')} style={{cursor:"pointer"}}>Firebase Chat App</h2></div>

            <div className="NavbarRight"> 
                <p className="NavbarName">Hello, {user?.displayName}</p>
                <button onClick={handleLogout} className="LogoutBtn">Logout</button>
            </div>
            {/* {
                user ? <button>Logout</button> : <button>Login</button>
            } */}
        </div>
    )
}

export default Navbar;