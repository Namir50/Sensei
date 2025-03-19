import React from 'react';
import './style/teacherHome.css'
import { Menu } from 'lucide-react'; //hamburger 
import logo_icon from '../Assets/Sensei-logo.png'
import profile from '../Assets/profile_icon.png'


function TeacherHome() {
    return <header>
    {/* Hamburger Menu */}
    <div className="hamburger">
      <Menu size={35} />
    </div>

    {/* Logo Section */}
    <div className="logo-container"><img src={logo_icon} alt="logo" className='logo'></img>
         {/* <div className='logo-text'>SENSEI</div> */}
    </div>

    {/* Profile Section */}
    <div className="profile">
      <img src={profile} alt="Profile" />
    </div>
  </header>
}

export default TeacherHome;
