import React, { useState, useEffect } from 'react';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar.js'
import axios from 'axios'

import { ClipLoader } from 'react-spinners';
import "../App.css"

import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";



const AllUsersDisplay = () => {

    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const uid = user.uid;
                console.log("user: ", user)
                console.log("uid: ", uid)

                const savedUsers = localStorage.getItem("available users")
                
                console.log("savedUsers: ", savedUsers)
                if( savedUsers === null ){

                    axios.get('http://localhost:3001/allUsers', {'Access-Control-Allow-Origin':'*'})
                    .then(
                        (res) => {

                            let userListArr = []

                            res.data.users.map((u) => 

                                u !== user.displayName ? 
                                    userListArr.push(u) : null
                            )
                            setLoading(false)
                            setUsers(userListArr)
                            localStorage.setItem("available users", userListArr)
                        }
                    )
                    .catch(
                        (err) => {
                            console.log("errrrr: ", err)
                        }
                    )
                }else{
                    setLoading(false)
                    setUsers(savedUsers.split(","))
                }

                


            } else {
                navigate('/login')
            }
          });



        
        

    },[])



    return(
        <div>
            <Navbar />
                <div className="UserBox">
                    <h1 className="TextCenter">Chat with a User!</h1>
                    <div className="CenterContainer">
                    {loading ? (
                            <ClipLoader size={50} color="#123abc"/>
                    ) : (
                        users === undefined ? <div>Loading users...</div> : users.map((u,idx) => 
                            
                                <React.Fragment key={idx}>
                                <Link to={{
                                    pathname: '/chat',
                                    search: createSearchParams({msg: u}).toString()
                                }} className="UserLink">{u}</Link>
                                
                                </React.Fragment>
                            
                        )
                    )}
                    </div>
                </div>

        </div>
    )
}


export default AllUsersDisplay;