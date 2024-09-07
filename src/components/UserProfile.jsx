import { SettingsContext } from '../context/SettingsContext';
import { useContext } from 'react';

export const UserProfile = () => {
  const { profileImage } = useContext(SettingsContext);

  return (
    <div className="flex items-center bg-white p-1 rounded-full shadow-md cursor-pointer">
      <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
      <span className="text-black">▼</span>
    </div>
  );
};
