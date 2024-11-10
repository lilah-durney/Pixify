import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.tsx';
import Create from './pages/Create/Create.tsx';
import Library from './pages/Library/Library.tsx';
import SideNavbar from './Components/SideNavBar/SideNavbar.tsx';
import "./index.css";

const App: React.FC = () => {
  const [sessionID, setSessionID] = useState<string>('');

  useEffect(() => {
    const existingSessionID = sessionStorage.getItem('sessionID');
    let session = existingSessionID;
  
    if (!existingSessionID) {
      const newSessionID = Date.now().toString();
      sessionStorage.setItem('sessionID', newSessionID);
      setSessionID(newSessionID);
      session = newSessionID;
    } else {
      setSessionID(existingSessionID);
    }
  
    console.log("SessionID set in App:", session);
  }, []); // sessionID removed from the dependency array
  
  return (
    <div className="app-container">
      <SideNavbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create sessionID={sessionID} />} />
          <Route path="/library" element={<Library sessionID={sessionID} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;