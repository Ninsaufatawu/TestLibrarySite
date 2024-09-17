import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const FavoritePage = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    setFavoriteBooks(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favoriteBooks.filter(book => book.id !== id);
    setFavoriteBooks(updatedFavorites);
    localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
  };

  const handleDownload = (pdf) => {
    const url = `/uploads/${pdf}`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', pdf);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div className='dark:bg-gray-900'>
      <div className="pb-14 p-8 w-60  dark:bg-gray-900  ">
        <Link to="/" className="flex items-center gap-4 text-blue-600 dark:text-blue-400 hover:underline">
          <FaArrowLeft className="text-xl" />
          <p className="font-bold text-2xl">Back Home</p>
        </Link>
      </div>
      <div className="p-10 mx-auto max-w-screen-xl dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Favorite Books</h1>
        {favoriteBooks.length === 0 ? (
          <p className="text-lg text-gray-600 dark:text-gray-300">No favorite books added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 dark:bg-gray-900">
            {favoriteBooks.map(book => (
              <div key={book.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{book.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{book.author}</p>
                {book.image && (
                  <img
                    src={`/uploads/${book.image}`}
                    alt={book.title}
                    className="w-full h-64 object-cover mb-4 rounded"
                  />
                )}
                <div className="flex flex-col gap-2">
                  {book.pdf && (
                    <button
                      onClick={() => window.open(`/uploads/${book.pdf}`, '_blank')}
                      className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                    >
                      Read
                    </button>
                  )}
                  {book.pdf && (
                    <button
                      onClick={() => handleDownload(book.pdf)}
                      className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                    >
                      Download
                    </button>
                  )}
                  <button
                    onClick={() => removeFavorite(book.id)}
                    className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                  >
                    Remove Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;