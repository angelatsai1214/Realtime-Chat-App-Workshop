import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';

import "../App.css"

const SignUp = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()

        if( email && password ){
  
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
              navigate("/login")
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              if( errorMessage.includes("email-already-in-use")){
                setErrorMsg("Email already registered to an account.")
              }
              console.log(errorCode, errorMessage);
          });
        }else{
            setErrorMsg("Please enter both email and password.")
        }
  
  
      }

    return(

        <div className="FormContainer">
        <form>

            <h3 className="TextCenter">Sign Up</h3>
            <br/>
            <label htmlFor="email">Email: </label><br/>
            <input required type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />

            <br /> <br /> 

            <label htmlFor="pwd">Password: </label><br/>
            <input required type="password" id="pwd" name="pwd" onChange={(e) => setPassword(e.target.value)} />

            <br /><br /> 

            <p className="ErrorMsg">{errorMsg}</p>

            <button onClick={onSubmit} className="SubmitBtn">Submit</button>

            <br/>

            <p>
                Already have an account?{' '}
                <NavLink to="/login" >
                    Login
                </NavLink>
            </p>

        </form>

             
        </div>

    )
}

export default SignUp;