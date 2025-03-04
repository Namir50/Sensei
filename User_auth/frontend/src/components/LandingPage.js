import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div>
            <h2>Welcome to Sensei App</h2>
            <Link to="/teacher"><button>You're a Teacher</button></Link>
            <Link to="/student"><button>You're a Student</button></Link>
        </div>
    );
}

export default LandingPage;