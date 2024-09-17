import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const notificationsList = [
  { 
      id: 1, 
      type: 'Health', 
      message: 'Stay active and maintain your health with these expert tips...',
      details: 'Maintaining a healthy lifestyle is crucial as we age. Incorporate regular exercise, balanced nutrition, and routine health check-ups into your daily regimen. Discover strategies for staying active and preventing common health issues.' 
  },
  { 
      id: 2, 
      type: 'Books', 
      message: 'Our library has just been updated with the latest bestsellers...',
      details: 'Delve into the latest bestsellers across various genres, from fiction to non-fiction. Whether you enjoy thrillers or self-help books, there are new titles waiting for you to discover. Visit the library today and expand your reading list!' 
  },
  { 
      id: 3, 
      type: 'App Usage', 
      message: 'Unlock the full potential of our app with these simple tips...',
      details: 'Learn how to navigate our app more effectively with tips that enhance your user experience. From customizing settings to utilizing hidden features, maximize your productivity and enjoyment with our app.' 
  },
  { 
      id: 4, 
      type: 'Phone Tips', 
      message: 'Are you getting the most out of your smartphone? Discover tips and hacks...',
      details: 'Smartphones can do much more than just make calls. Discover essential tips and tricks that help you optimize battery life, enhance security, and explore useful apps that can simplify your daily tasks.' 
  },
  {        
      id: 5, 
      type: 'Politics', 
      message: 'Get informed on the latest political events happening around the world...',
      details: 'Stay updated with current political events, including analyses of significant developments. Learn about upcoming elections, policy changes, and international relations that impact you and your community.' 
  },
  {        
      id: 6, 
      type: 'Technology', 
      message: 'The tech world is evolving rapidly, and we\'re here to keep you informed...',
      details: 'Stay abreast of the latest technological advancements, trends, and innovations. From artificial intelligence to the newest gadgets, find out how technology is shaping our lives and what to expect in the future.' 
  },
  {        
      id: 7, 
      type: 'Entertainment', 
      message: 'Catch up on the latest in entertainment! From blockbuster movies to trending TV shows...',
      details: 'Get the latest updates on movies, TV shows, and celebrity news. Whether you’re looking for recommendations or just want to stay in the loop, find out what’s worth watching and what’s trending now.' 
  },
  {       
      id: 8, 
      type: 'Safety', 
      message: 'Safety first! Discover essential tips to protect yourself both online and offline...',
      details: 'Learn vital safety tips that help you navigate the digital world securely. From protecting your personal information online to staying safe in public spaces, these tips are essential for your peace of mind.' 
  },
  {       
      id: 9, 
      type: 'Finance', 
      message: 'Managing your finances doesn\'t have to be daunting. Get expert advice...',
      details: 'Explore practical financial advice that can help you budget, save, and invest wisely. Whether you’re planning for retirement or looking to manage daily expenses, our tips can guide you toward financial stability.' 
  },
  { 
      id: 10, 
      type: 'Travel', 
      message: 'Dreaming of your next getaway? Explore top travel destinations...',
      details: 'Discover exciting travel destinations that cater to all types of travelers. From serene beaches to bustling cities, find tips on planning your next adventure and making the most of your trips.' 
  },
  { 
      id: 11, 
      type: 'Food', 
      message: 'Delicious recipes and healthy eating tips are just a click away...',
      details: 'Explore a variety of recipes that cater to different dietary needs, along with tips for maintaining a balanced diet. From quick meals to gourmet dishes, there’s something for everyone to enjoy.' 
  },
  { 
      id: 12, 
      type: 'Events', 
      message: 'Don\'t miss out on upcoming local and community events...',
      details: 'Stay informed about exciting events happening in your area. From festivals to workshops, find out how you can participate and connect with your community through various activities.' 
  },
  { 
      id: 13, 
      type: 'Education', 
      message: 'Expand your knowledge with new educational resources and opportunities...',
      details: 'Access a wealth of educational resources that can help you learn new skills or deepen your knowledge in various fields. Whether you’re interested in online courses or local workshops, there’s plenty to discover.' 
  },
  { 
      id: 14, 
      type: 'Environment', 
      message: 'Stay informed about the latest environmental issues and what you can do...',
      details: 'Learn about pressing environmental issues and discover ways you can contribute to sustainability. Understand how individual actions can make a difference for our planet.' 
  },
  { 
      id: 15, 
      type: 'Wellness', 
      message: 'Your mental and physical well-being are crucial to a happy life...',
      details: 'Explore wellness strategies that promote both mental and physical health. From mindfulness practices to exercise routines, find tips that can enhance your overall well-being.' 
  },
  { 
      id: 16, 
      type: 'Social', 
      message: 'Looking to connect with others? Discover social groups and activities in your area...',
      details: 'Find social groups and activities that align with your interests. Whether you’re looking to make new friends or join a community, there are plenty of opportunities available.' 
  },
];

export const Notifications = ({ onClose }) => {
  const [showNotifications, setShowNotifications] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowNotifications(false);
    if (onClose) onClose();
  };

  const handleNotificationClick = (notification) => {
    navigate('/notifications', { state: { notification } });
  };

  return (
    <div className={`fixed top-10 right-4 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 transition-transform ${showNotifications ? 'transform translate-x-0' : 'transform translate-x-full'} duration-300`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Notifications</h3>
        <button onClick={handleClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <FaTimes size={20} />
        </button>
      </div>
     
      <div className="space-y-5 max-h-96 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>
          {`
            .overflow-y-scroll::-webkit-scrollbar {
              display: none;
            }
            .overflow-y-scroll {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>
        {notificationsList.map(notification => (
          <div
            key={notification.id}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
            onClick={() => handleNotificationClick(notification)}
          >
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">{notification.type}</h4>
            <p className="text-gray-600 dark:text-gray-400">{notification.message}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
