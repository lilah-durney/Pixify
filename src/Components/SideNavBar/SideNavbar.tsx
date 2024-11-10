import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideNavbar.css';

const SideNavbar: React.FC = () => {
    // State to toggle sidebar visibility
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            {/* Hamburger Menu Icon */}
            <div className="hamburger-menu" onClick={toggleSidebar}>
                &#9776; {/* This is the hamburger icon */}
            </div>

            {/* Side Navbar */}
            <div className={`side-navbar ${isSidebarOpen ? 'open' : ''}`}>
                <Link to="/home" className="home-link" onClick={toggleSidebar}>Home</Link>
                <Link to="/create" className="nav-link" onClick={toggleSidebar}>Create</Link>
                <Link to="/library" className="nav-link" onClick={toggleSidebar}>Library</Link>
            </div>
        </div>
    );
};

export default SideNavbar;

