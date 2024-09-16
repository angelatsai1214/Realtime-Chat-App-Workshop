import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  where
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import { ClipLoader } from 'react-spinners';


const ChatBox = ({targetUser}) => {

    const [messages,setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const scroll = useRef();
    const navigate = useNavigate()

    const [user] = useAuthState(auth);

    useEffect(()=> {

      if( user !== null ){
        setLoading(true);
        const q = query(
            collection(db,"messages"),
            where("from", "in", [user.displayName, targetUser]),
            where("to", "in", [user.displayName, targetUser]),
            orderBy("createdAt", "asc"),
            limit(50)
        )
        const unsubscribe = onSnapshot(q,(QuerySnapshot) => {
          const fetchedMsgs = []
          QuerySnapshot.forEach((doc) => fetchedMsgs.push({...doc.data(), id: doc.id}))
          setMessages(fetchedMsgs)
          setLoading(false);
          // console.log("fetchedMsgs: ", fetchedMsgs)
        })
        
        return () => unsubscribe;
        
      }      

      


    },[user])

    useEffect(() => {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <>
          {loading ? (
            <div className="LoadingContainer">
              <ClipLoader size={50} color="#123abc"/>
            </div>
          ) : (
          <div className="MessagesWrapper">
            {messages?.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>)}
          <span ref={scroll}></span>
          <SendMessage scroll={scroll} to={targetUser} />
        </>
      );
}

export default ChatBox;
