import React, { useState, useEffect } from 'react';
import './style/teacherHome.css';
import { Menu } from 'lucide-react';
import logo_icon from '../Assets/Sensei-logo.png';
import profile from '../Assets/profile_icon.png';

function TeacherHome() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    console.log(`${option} clicked`);
    setIsDropdownOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.hamburger')) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div className="teacher-home">
      <header>
        {/* Hamburger Menu */}
        <div className="hamburger" onClick={toggleSidebar}>
          <Menu size={35} />
        </div>

        {/* Logo Section */}
        <div className="logo-container">
          <img src={logo_icon} alt="logo" className='logo' />
          <div className='logo-text'>SENSEI</div>
        </div>

        {/* Profile Section */}
        <div className="profile-container">
          <div className="profile" onClick={toggleDropdown}>
            <img src={profile} alt="Profile" />
          </div>
          
          {isDropdownOpen && (
            <div className="dropdown">
              <ul>
                <li onClick={() => handleOptionClick('View Profile')}>View Profile</li>
                <li onClick={() => handleOptionClick('Edit Profile')}>Edit Profile</li>
                <li onClick={() => handleOptionClick('Logout')}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => console.log('Activate Account clicked')}>Activate Account</li>
          <li onClick={() => console.log('Settings clicked')}>Settings</li>
        </ul>
      </div>
    </div>
  );
}

export default TeacherHome;
