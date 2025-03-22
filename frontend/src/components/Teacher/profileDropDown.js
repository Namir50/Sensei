import React, { useState } from 'react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    console.log(`${option} clicked`);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="profile-container">
      {/* Profile Image */}
      <div className="profile" onClick={toggleDropdown}>
        <img src="path_to_your_image.png" alt="Profile" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown">
          <ul>
            <li onClick={() => handleOptionClick('View Profile')}>View Profile</li>
            <li onClick={() => handleOptionClick('Edit Profile')}>Edit Profile</li>
            <li onClick={() => handleOptionClick('Logout')}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
