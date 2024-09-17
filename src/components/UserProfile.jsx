import  { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import defaultProfileImage from '../assets/profileimage.jpg'; // Default profile image

export const UserProfile = () => {
  const { profileImage } = useContext(SettingsContext);

  return (
    <div className="flex items-center bg-white p-1 rounded-full shadow-md cursor-pointer">
      {/* If profileImage exists, use it; otherwise, fallback to the defaultProfileImage */}
      <img
        src={profileImage || defaultProfileImage}
        alt="Profile"
        className="w-10 h-10 rounded-full mr-2"
      />
      <span className="text-black">▼</span>
    </div>
  );
};
