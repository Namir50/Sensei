import React from 'react';
import { Link } from 'react-router-dom';
import './style/landing.css'

function LandingPage() {
    return (
        <div className='container'>
            <h2 className='text-focus-in'>Welcome to Sensei App</h2>
            <div className='inputs-landing'>
                <div className='input'>
            <Link to="/teacher"><button>You're a Teacher</button></Link>
            </div>
            <div className='input'>
            <Link to="/student"><button>You're a Student</button></Link>
            </div>
        </div>
        </div>
    );
}

export default LandingPage;