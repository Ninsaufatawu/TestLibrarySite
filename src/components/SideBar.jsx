import { Link, NavLink } from 'react-router-dom';
import { AiOutlineSetting, AiOutlineTag } from 'react-icons/ai';
import { MdEventAvailable } from "react-icons/md";
import { FaHome, FaHeart, FaQuestionCircle } from 'react-icons/fa';

const SideBar = () => {
  return (
    <>
      {/* Sidebar for larger screens */}
      <div className="h-screen w-60 dark:bg-slate-700 bg-slate-50 flex flex-col p-4 md:w-72 hidden md:flex">
        <nav className="flex-1 text-lg font-medium">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg hover:bg-gray-200  
                  ${isActive ? 'bg-slate-200' : 'dark:text-gray-300 dark:hover:bg-gray-800'}`
                }
              >
                <FaHome className="mr-3" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/news"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg hover:bg-gray-200  
                  ${isActive ? 'bg-slate-200' : 'dark:text-gray-300 dark:hover:bg-gray-800'}`
                }
              >
                <MdEventAvailable className="mr-3" />
                <span>News & Events</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/favorite"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg hover:bg-gray-200  
                  ${isActive ? 'bg-slate-200' : 'dark:text-gray-300 dark:hover:bg-gray-800'}`
                }
              >
                <FaHeart className="mr-3" />
                <span>Favorite</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg hover:bg-gray-200  
                  ${isActive ? 'bg-slate-200' : 'dark:text-gray-300 dark:hover:bg-gray-800'}`
                }
              >
                <AiOutlineSetting className="mr-3" />
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <Link 
                to="/active-bid" 
                className="flex items-center p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
              >
                <AiOutlineTag className="mr-3" />
                <span>Active Bid</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto p-4 bg-white shadow-2xl dark:bg-gray-800 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <FaQuestionCircle className="text-gray-500 dark:text-gray-300" size={27} />
          </div>
          <h2 className="text-lg font-bold dark:text-white">Help Center</h2>
          <p className="text-sm dark:text-gray-400 mb-4">Having trouble in Enatf? Please contact us for more questions.</p>
          <button className="bg-blue-600 text-white p-2 rounded">
            <Link to="/help">
              Go To Help Center
            </Link>
          </button>
        </div>
      </div>
      
      {/* Bottom bar for mobile screens */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg dark:bg-gray-800 flex justify-around items-center p-2 md:hidden z-50">
        <NavLink 
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${isActive ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'}`
          }
        >
          <FaHome size={24} />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink 
          to="/news"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${isActive ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'}`
          }
        >
          <MdEventAvailable size={24} />
          <span className="text-xs">News</span>
        </NavLink>
        <NavLink 
          to="/favorite"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${isActive ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'}`
          }
        >
          <FaHeart size={24} />
          <span className="text-xs">Favorite</span>
        </NavLink>
        <NavLink 
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${isActive ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'}`
          }
        >
          <AiOutlineSetting size={24} />
          <span className="text-xs">Settings</span>
        </NavLink>
      </div>
    </>
  );
};

export default SideBar;
