import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import ProfilePic from "../img/ProfilePic.png"

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  console.log("message: ", message)

  return (

    <div className="ChatContainer">
      <img
        className="chat-bubble__left"
        src={ProfilePic}
        alt="user avatar"
        style = {{ display: `${message.uid === user.uid ? "none" : "block"}`}}
      />
      <div
        className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
        <div className="chat-bubble__right">
          <p className="user-name">{message.from}</p>
          <p className="user-message">{message.text}</p>
        </div>
      </div>
    </div>
  );
};
export default Message;