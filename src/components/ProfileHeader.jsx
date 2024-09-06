import { useState, useContext, useEffect } from 'react';
import { FaBell, FaSun, FaMoon } from 'react-icons/fa';
import { SettingsContext } from '../context/SettingsContext';
import Notifications from './Notifications';

const ProfileHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notificationCount] = useState(5); // Example count
  const { profileImage } = useContext(SettingsContext);

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

    // Save the new theme in localStorage
    localStorage.setItem('theme', newTheme);
  };

  const handleNotificationClick = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  const handleCloseNotifications = () => {
    setNotificationsVisible(false);
  };

  return (
    <div className="flex items-center space-x-4 dark:bg-slate-800 justify-end relative">
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
      <div className="flex items-center bg-white p-1 rounded-full shadow-md">
        <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
        
        <span className="m text-black">▼</span>
      </div>
      {notificationsVisible && (
        <Notifications onClose={handleCloseNotifications} />
      )}
    </div>
  );
};

export default ProfileHeader;