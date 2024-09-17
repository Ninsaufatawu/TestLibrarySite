import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const NotificationPage = () => {
  const location = useLocation();
  const { notification } = location.state || {};

  if (!notification) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Notification Details</h2>
        <p className="text-lg text-gray-600">No notification details available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className='pb-6'>
        <Link to="/" className='flex items-center gap-4 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition'>
          <FaArrowLeft className='text-xl' />
          <p className='font-bold text-2xl'>Back Home</p>
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{notification.type}</h2>
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">{notification.message}</p>
        <p className="text-base text-gray-600 dark:text-gray-400">{notification.details}</p>
      </div>
    </div>
  );
};

export default NotificationPage;