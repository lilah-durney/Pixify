// import React, {useState} from 'react';
import './App.css'
import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home.tsx'
import Create from './pages/Create/Create.tsx'
// import Library from './pages/Library/Library.tsx'
import {Route, Routes} from 'react-router-dom'

const App: React.FC = () => {
  const [sessionID, setSessionID] = useState('');

  useEffect(() => {
    //Check if there's alreadu a session ID in localStorage (to allow persistence across refreshes)
    const existingSessionID = sessionStorage.getItem('sessionID');

    if (!existingSessionID) {
      //Create a new sessionID if it doesn't already exist
      const newSessionID = Date.now().toString();
      sessionStorage.setItem('sessionID', newSessionID);
      setSessionID(newSessionID);

    } else{
      //Use the existing sessionID
      setSessionID(existingSessionID)
    }

    console.log("sessionID:", sessionID);
  
  
  }, []);

  return (
    <Routes>
        <Route path="/home" element = {<Home />}/>
        <Route path="/create" element={<Create sessionID={sessionID} />}/>
        
        {/* <Route path="/library" element = {<Library sessionID={sessionID} />} /> */}
    </Routes>
  )
}

export default App