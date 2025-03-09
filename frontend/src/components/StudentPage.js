import React from 'react';
import { Link } from 'react-router-dom';
import './style/landing.css'

function StudentPage(){
    return(
        <div>
        <div className='container-teacher'>
        <h2 className='text-focus-in'>Welcome Student!</h2>
        <div className='inputs-landing'>
        <Link to="/register/student"><button className='button-teacher-register'>Register</button></Link>
        <Link to="/login/student"><button className='button-teacher-login'>Login</button></Link>
        </div>
        </div>
    </div>
    );
}

export default StudentPage;

