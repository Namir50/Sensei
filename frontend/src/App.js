import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register.js';
import Login from './components/Login.js';
import TeacherPage from './components/TeacherPage.js';
import LandingPage from './components/LandingPage.js';
import StudentPage from './components/StudentPage.js'

function App() {
    return (
        <div className='bg'>
           
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />         //This '/' is the '/landing API from app.py'
                <Route path="/teacher" element={<TeacherPage />} />  //This '/teacher' is '/teacher' API from app.py
                <Route path="/register" element={<Register />} />    //This '/register' is '/register' API from app.py
                <Route path="/login" element={<Login />} />          //This '/login' is '/login' API from app.py
                <Route path='/student' element={<StudentPage/>}/>    //This '/student' is '/student' API from app.py
            </Routes>
        </Router>
        </div>
    );
}

export default App;