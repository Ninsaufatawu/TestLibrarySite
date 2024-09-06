import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import booksData from '../books.json'; // Import local JSON file
import { FaArrowLeft, FaBookmark } from 'react-icons/fa';

export const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (booksData && booksData.categories) {
      // Assuming the category name is known. Adjust as needed.
      const category = 'Trending Books'; // Change this to the appropriate category
      const booksInCategory = booksData.categories[category] || [];
      const fetchedBook = booksInCategory.find(book => book.id === parseInt(id));
      setBook(fetchedBook);
    } else {
      console.error('Books data is not available or not in the expected format.');
    }
  }, [id]);

  useEffect(() => {
    const favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    const isFavorited = favoriteBooks.some(favBook => favBook.id === parseInt(id));
    setIsBookmarked(isFavorited);
  }, [id]);

  const handleBookmark = () => {
    if (book) {
      let favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
      const alreadyBookmarked = favoriteBooks.some(favBook => favBook.id === book.id);

      if (!alreadyBookmarked) {
        favoriteBooks.push(book);
        localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
        setIsBookmarked(true);
      } else {
        favoriteBooks = favoriteBooks.filter(favBook => favBook.id !== book.id);
        localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
        setIsBookmarked(false);
      }
    }
  };

  if (!book) return <div>Loading...</div>;

  const renderStars = (rating) => {
    if (typeof rating !== 'number' || rating < 0) {
      rating = 0;
    }
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars).fill(null).map((_, index) => (
          <span key={index}>⭐</span>
        ))}
        {halfStar && <span>⭐</span>}
        {Array(emptyStars).fill(null).map((_, index) => (
          <span key={index}>☆</span>
        ))}
      </>
    );
  };

  const handleDownload = () => {
    if (book) {
      const link = document.createElement('a');
      link.href = `/uploads/${book.pdf}`;
      link.setAttribute('download', `${book.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  const dummyReviews = [
    // Dummy reviews
  ];

  return (
    <>
      <div className='p-6'>
        <Link to={"/"} className='flex gap-4 '>
          <div className='pt-2 text-xl'>
            <FaArrowLeft />
          </div>
          <p className='font-bold text-2xl'>Back Home</p>
        </Link>
      </div>

      <div className="p-8 dark:bg-gray-800 dark:text-white mx-auto bg-white">
        <div className="relative w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white p-14 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row pl-96">
            <div className="items-center justify-center relative">
              <h1 className="text-3xl md:text-5xl font-bold ">{book.title}</h1>
              <p className="text-xl md:text-2xl text-gray-300">{book.author}</p>
            </div>
            <div className="ml-auto">
              <FaBookmark
                onClick={handleBookmark}
                className={`cursor-pointer ${isBookmarked ? 'text-yellow-500' : 'text-white'}`}
                size={30}
              />
            </div>
          </div>
        </div>

        <div className="pb-10 relative z-10 pl-32 -top-36">
          {book.image && (
            <img
              src={`/uploads/${book.image}`}
              alt={book.title}
              className="relative z-10 w-32 md:w-56 rounded-lg shadow-lg mr-6"
            />
          )}
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 pl-20 relative -top-24">
            <button className="w-80 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 mb-4">
              {book.pdf && (
                <a href={`/uploads/${book.pdf}`} target="_blank" rel="noopener noreferrer">
                  Read Online
                </a>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="w-80 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            >
              Download
            </button>
          </div>
          <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0 relative -top-96">
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">About</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200">{book.description}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Publisher</h2>
              <p className="text-gray-700 dark:text-gray-200">{book.published}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Reviews</h2>
              <div className="flex items-center mt-2">
                {/* Assuming you have some way to get rating from your JSON or set a default value */}
                <div className="text-yellow-500 text-lg">{renderStars(book.rating || 0)}</div>
                <span className="ml-2 text-gray-600 dark:text-gray-300">{(book.rating || 0).toFixed(1)} out of 5</span>
              </div>
              <div className="mt-4 space-y-4">
                {(book.reviews && book.reviews.length > 0 ? book.reviews : dummyReviews).map((review, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{review.name}</span>
                      <span className="text-yellow-500">{renderStars(review.rating)}</span>
                    </div>
                    <p className="mt-2 text-gray-700 dark:text-gray-200">{review.comment}</p>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
