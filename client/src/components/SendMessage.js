import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp} from "firebase/firestore";

import "../App.css"

const SendMessage = ({scroll, to}) => {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
          alert("Enter valid message");
          return;
        }

        const { uid, displayName } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
          text: message,
          from: displayName,
          to: to,
          createdAt: serverTimestamp(),
          uid,
        });
        setMessage("");
        scroll.current.scrollIntoView({ behavior: "smooth" });
        
    };
   

    return (
        <form className="SendMsgBar" onSubmit={(event) => sendMessage(event)}>
        <label htmlFor="messageInput" hidden>
            Enter Message
        </label>
        <input
            id="messageInput"
            name="messageInput"
            type="text"
            className="form-input__input"
            placeholder="type message..."
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
        </form>
  );
};
export default SendMessage;