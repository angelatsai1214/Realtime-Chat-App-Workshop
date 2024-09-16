import Navbar from '../components/Navbar'
import ChatBox from '../components/ChatBox'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ChatBar from '../components/ChatBar'

import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import {useEffect} from "react"


const Chat = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
        if (!user) {
            navigate('/login')
        }
        });

    },[])

    const [searchParams] = useSearchParams();
    const toUser = searchParams.get("msg");

    // const { toUser } = location.state || {};
    console.log("toUser in chat: ", toUser)

    return(
        <div>
            <ChatBar targetUser={toUser}/>
            <ChatBox targetUser={toUser} />
        </div>
    )

}

export default Chat;