import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import SignIn from "./page/SignIn"
import SignUp from "./page/SignUp"
import AllUsersDisplay from "./page/AllUsersDisplay"
import Chat from './page/Chat'

function App() {

  const [user] = useAuthState(auth);

  return (
    <Router>
      <div>
        <section>                              
            <Routes>                                                                        

               <Route path="/" element={<AllUsersDisplay />} />
               <Route path="/chat" element={<Chat />} />
               <Route path="/signup" element={<SignUp/>}/>
               <Route path="/login" element={<SignIn/>}/>
               <Route path="*" element={<h2>Error 404: Page not found</h2>} />
               {/* </>} */}
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}

export default App;
