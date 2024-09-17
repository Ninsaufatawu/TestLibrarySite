
import { Link } from 'react-router-dom';

const HelpPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center dark:text-white">Help Center</h1>
      <p className="mb-8 text-center text-lg dark:text-gray-300">
        Welcome to the Help Center! Here you'll find information on how to use our library app effectively.
      </p>

      <div className="w-full max-w-3xl space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4 dark:text-white">Getting Started</h2>
          <p className="mb-4 dark:text-gray-300">
            To get started, download our app from the App Store or Google Play Store. Once installed, create an account using your email address and a secure password.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4 dark:text-white">Navigating the App</h2>
          <p className="mb-4 dark:text-gray-300">
            The main menu can be accessed from the home screen. Here you can find links to:
          </p>
          <ul className="list-disc list-inside mb-4 dark:text-gray-300">
            <li>Browse Books</li>
            <li>My Account</li>
            <li>Help Center</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4 dark:text-white">Borrowing Books</h2>
          <p className="mb-4 dark:text-gray-300">
            To borrow a book, simply search for the title or author in the search bar. Once you find the book, click “Borrow” and it will be added to your account.
          </p>
          <p className="mb-4 dark:text-gray-300">
            You can borrow up to 5 books at a time for a period of 2 weeks. You will receive a notification before your due date.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4 dark:text-white">Using Resources</h2>
          <p className="mb-4 dark:text-gray-300">
            Our app offers a variety of resources including eBooks, audiobooks, and online courses. You can access these by navigating to the "Resources" section from the main menu.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4 dark:text-white">Contact Information</h2>
          <p className="mb-4 dark:text-gray-300">
            If you have any questions or need further assistance, please reach out to our support team:
          </p>
          <p className="mb-4 dark:text-gray-300">
            Email: <span className="text-blue-600 dark:text-blue-400">support@libraryapp.com</span>
          </p>
          <p className="mb-4 dark:text-gray-300">
            Phone: <span className="text-blue-600 dark:text-blue-400">1-800-555-0199</span>
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-600 hover:underline dark:text-blue-400 text-lg">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default HelpPage;