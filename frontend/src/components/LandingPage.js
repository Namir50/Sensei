import React from 'react';
import { Link } from 'react-router-dom';
import './style/landing.css'

function LandingPage() {
    return (
        <div className='container-landing'>
            <h2 className='text-focus-in'>Welcome to Sensei App</h2>
            <div className='inputs-landing'>
            <Link to="/teacher"><button className='button teacher'>You're a Teacher</button></Link>
           
            <Link to="/student"><button className='button student'>You're a Student</button></Link>
           
        </div>
        </div>
    );
}

export default LandingPage;