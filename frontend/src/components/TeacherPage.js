import React from 'react';
import { Link } from 'react-router-dom';

function TeacherPage() {
    return (
        <div>
            <h2>Hello Sensei!</h2>
            <Link to="/register"><button>Register</button></Link>
            <Link to="/login"><button>Login</button></Link>
        </div>
    );
}

export default TeacherPage;