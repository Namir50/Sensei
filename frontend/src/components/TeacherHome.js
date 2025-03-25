import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/teacherHome.css"; // Ensure this is the correct path

function TeacherHome() {
    const [teacherData, setTeacherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/teacher/dashboard", {
                    withCredentials: true, // Ensures session cookie is sent
                });

                if (response.status === 200) {
                    setTeacherData(response.data);
                } else {
                    throw new Error("Failed to fetch teacher details");
                }
            } catch (err) {
                console.error("Error fetching teacher data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeacherData();
    }, []);

    return (
        <div className="teacher-home">
            {/* Header with Sidebar Toggle */}
            <header>
                <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    ☰
                </div>
                <div className="logo-container">
                    <h1 className="logo-text">Teacher Dashboard</h1>
                </div>
                <div className="profile">
                    <img
                        src="/profile_icon.png" // Replace with teacher's profile image if available
                        alt="Profile"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                    {dropdownOpen && (
                        <div className="dropdown">
                            <ul>
                                <li>Profile</li>
                                <li>Settings</li>
                                <li>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>

            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
               <div className="sidebar-header">
                  <span className="close-btn" onClick={() => setSidebarOpen(false)}>✖</span>
               </div>
              <ul>
                <li>Settings</li>
                <li>Subscription</li>
             </ul>
            </div>

            <div className="logo-container">
              <img src="/Sensei-logo.png" alt="Sensei Logo" className="sensei-logo" />
              <h1 className="sensei-text">SENSEI</h1>
            </div>

            {/* Main Dashboard Content */}
            <div className="dashboard">
                {loading ? (
                    <p>Loading data...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>Error: {error}</p>
                ) : (
                    <div className="dashboard-info">
                        <h1>Dashboard</h1>
                        <h2>Welcome {teacherData?.name ? teacherData.name : "Teacher"}</h2>
                        <p>📚 Students Enrolled: {teacherData.students_enrolled}</p>
                        <p>👀 Profile Views: {teacherData.profile_views}</p>
                        <p>📞 Phone Clicks: {teacherData.phone_number_clicks}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeacherHome;
