import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style/auth.css';
import email_icon from '../Assets/mail.png';
import password_icon from '../Assets/pass.png';
import user_icon from '../Assets/user_3.png';

function TeacherLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login/teacher', 
                { email, password }, 
                { withCredentials: true } // Enables session storage!
            );

            if (response && response.data) {
                alert(response.data.message);
                
                // Save teacher_id in sessionStorage
                sessionStorage.setItem('teacher_id', response.data.teacher_id);
                
                navigate('/teacherhome');
            } else {
                alert('Unexpected response format');
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error);
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <img src={user_icon} alt="" />
                <div className="text">Login</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <div className='input'>
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='line'></div>
                    <div className='input'>
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='line'></div>
                    <div className="forgot-password">Lost Password?<span> Click Here</span></div>
                    <div className='submit-container'>
                        <button className='submit-btn' type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TeacherLogin;
