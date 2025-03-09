import React, { useState } from 'react';
import axios from 'axios';
import email_icon from '../Assets/mail.png'
import password_icon from '../Assets/pass.png'
import user_icon from '../Assets/user_3.png'
import './style/auth.css'


function TeacherRegister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register/teacher', { name, email, password });
            alert('Registration successful!');
        } catch (error) {
            alert(error.response.data.message || 'Registration failed');
        }
    };

    return (
        // <form onSubmit={handleSubmit}>
        //     <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        //     <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        //     <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        //     <button type="submit">Register</button>
        // </form>

<div className='container'>
<div className="header-reg">
<img src={user_icon} alt="" />
<div className="text">SignUp</div>
{/* <div className="underline"></div> */}
</div>
<form onSubmit={handleSubmit}>
<div className='inputs-reg'>

    <div className="input-reg">
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Name'value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='line'></div>

    <div className='input-reg'>
    <img src={email_icon} alt="" />
<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
</div>
<div className='line'></div>
<div className='input-reg'>
<img src={password_icon} alt="" />
<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
</div>
<div className='line'></div>

<div className='submit-container'>
<button className='submit-btn-reg' type="submit">Login</button>
</div>
</div>
</form>

</div>
    );
}

export default TeacherRegister;