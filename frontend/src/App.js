import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeacherRegister from './components/TeacherRegister.js';
import TeacherLogin from './components/TeacherLogin.js';
import TeacherPage from './components/TeacherPage.js';
import LandingPage from './components/LandingPage.js';
import StudentPage from './components/StudentPage.js'
import TeacherHome from './components/TeacherHome.js';

function App() {
    return (
        <div className='bg'>
           
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />         //This '/' is the '/landing API from app.py'
                <Route path="/teacher" element={<TeacherPage />} />  //This '/teacher' is '/teacher' API from app.py
                <Route path="/register/teacher" element={<TeacherRegister />} />    //This '/register' is '/register' API from app.py
                <Route path="/login/teacher" element={<TeacherLogin />} />          //This '/login' is '/login' API from app.py
                <Route path='/student' element={<StudentPage/>}/>    //This '/student' is '/student' API from app.py
                <Route path= '/teacherhome' element={<TeacherHome/>} /> //This '/teacherhome' is '/teacherhome' API from app
            </Routes>
        </Router>
        </div>
    );
}

export default App;