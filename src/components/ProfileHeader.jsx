import { useState, useEffect, useRef } from 'react';
import { FaBell, FaSun, FaMoon } from 'react-icons/fa';
import Notifications from './Notifications';
import { UserProfile } from './UserProfile';

const ProfileHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const [notificationCount] = useState(5); // Example count
  const dropdownRef = useRef(null); // Reference to the dropdown

  // Load the theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  const handleNotificationClick = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  const handleCloseNotifications = () => {
    setNotificationsVisible(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };

  // Handle click outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex items-center space-x-4 dark:bg-slate-800 justify-end relative">
      {/* Small screen: Only user profile and dropdown */}
      <div className="md:hidden flex items-center">
        <div onClick={toggleProfileDropdown}>
          <UserProfile />
        </div>
      </div>

      {/* Larger screen: Notifications and theme toggle outside profile */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="relative bg-white p-2 rounded-full shadow-md" onClick={handleNotificationClick}>
          <FaBell className="text-red-500" size={24} />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {notificationCount}
            </span>
          )}
        </button>
        <button onClick={toggleTheme} className="bg-white p-2 rounded-full shadow-md">
          {isDarkMode ? <FaSun className="text-yellow-500" size={24} /> : <FaMoon className="text-gray-500" size={24} />}
        </button>
        <div>
          <UserProfile />
        </div>
      </div>

      {/* Small screen: Show profile dropdown with icons */}
      {isProfileDropdownVisible && (
        <div ref={dropdownRef} className="absolute right-0 mt-12 bg-white shadow-lg rounded-lg p-4 z-50">
          <button className="relative bg-white p-2 rounded-full shadow-md" onClick={handleNotificationClick}>
            <FaBell className="text-red-500" size={24} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
          <button onClick={toggleTheme} className="bg-white p-2 rounded-full shadow-md mt-2">
            {isDarkMode ? <FaSun className="text-yellow-500" size={24} /> : <FaMoon className="text-gray-500" size={24} />}
          </button>
        </div>
      )}

      {notificationsVisible && <Notifications onClose={handleCloseNotifications} />}
    </div>
  );
};

export default ProfileHeader;
