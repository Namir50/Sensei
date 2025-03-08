import React from 'react';
import { Link } from 'react-router-dom';
import './style/teacher.css'

function TeacherPage() {
    return (
        <div>
            <div className='container-teacher'>
            <h2 className='text-focus-in'>Hello Sensei!</h2>
            <div className='inputs-landing'>
            <Link to="/register/teacher"><button className='button-teacher-register'>Register</button></Link>
            <Link to="/login/teacher"><button className='button-teacher-login'>Login</button></Link>
            </div>
            </div>
        </div>
    );
}

export default TeacherPage;