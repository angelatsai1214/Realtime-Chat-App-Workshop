
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const cors = require('cors')


const admin = require("firebase-admin");
const serviceAccount = require('./crediential.json');
// import { initializeApp, getApp } from "firebase-admin/app";
const {getApps} = require("firebase-admin/app")

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? false : "http://localhost:3000",
    credentials: true,
}))

app.get('/allUsers', (req,res) => {

    console.log("getApps(): ", getApps())
    console.log("getApps().length: ", getApps().length)
    

    let fb_app = null
    if (getApps().length === 0) {
        fb_app = admin.initializeApp({
            databaseURL: 'https://socketio-workshop-default-rtdb.com',
            credential: admin.credential.cert(serviceAccount) 
        });

    }else{
        fb_app = getApps()[0]
    }



    fb_app && fb_app.auth().listUsers(1000) // lists up to 1000 users
        .then((listUsersResult) => {

            const userList = []

            listUsersResult.users.forEach((user) => {
                userList.push(user.displayName)
            } )

            res.status(200).json({users: userList})

            // let users = JSON.stringify(listUsersResult);
            // console.log(users)

        })
        .catch(function (error) {
            console.log('Oh no! Firebase listUsers Error:', error);
            res.status(400).json({message: 'error'})
        });
    
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});