import React, { useState } from 'react';
import './style/teacherHome.css';
import { Menu } from 'lucide-react'; //hamburger 
import logo_icon from '../Assets/Sensei-logo.png';
import profile from '../Assets/profile_icon.png';


function TeacherHome() {
  //profile photo drop down
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    console.log(`${option} clicked`);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <header>
      {/* Hamburger Menu */}
      <div className="hamburger">
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
  );
}

export default TeacherHome;
