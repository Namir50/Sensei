import React from 'react';
import { Link } from 'react-router-dom';
import './style/landing.css'
import teach_icon from '../Assets/teacher-icon.png'
import stud_icon from '../Assets/student-icon.png'

function LandingPage() {
    return (
        <div className='container-landing'>
            <h2 className='text-focus-in'>Welcome to Sensei App</h2>
            <div className='inputs-landing'>
                <img src={teach_icon} alt="" />
            <Link to="/teacher"><button className='button teacher'>You're a Teacher</button></Link>
           
            <Link to="/student"><button className='button student'>You're a Student</button></Link>
            <img src={stud_icon} alt="" />
           
        </div>
        </div>
    );
}

export default LandingPage;