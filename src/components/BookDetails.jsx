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
      let foundBook = null;
      for (const category in booksData.categories) {
        const booksInCategory = booksData.categories[category];
        foundBook = booksInCategory.find(book => book.id === parseInt(id));
        if (foundBook) break;
      }
      setBook(foundBook);
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
    { name: "Alice", comment: "Great book!", rating: 5, date: "2023-01-01" },
    { name: "Bob", comment: "Very informative.", rating: 4, date: "2023-01-02" },
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

      <div className="p-4  md:pt-0 md:p-8  dark:bg-gray-800 dark:text-white mx-auto bg-white ">
        <div className="relative w-full pt-20 bg-transparent sm:bg-gradient-to-r sm:from-gray-700 sm:to-gray-900 text-white p-14 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row pl-96 md:pl-32 lg:pl-96">
            <div className="items-center justify-center relative">
              <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left">{book.title}</h1>
              <p className="text-xl md:text-2xl text-gray-300 text-center md:text-left">{book.author}</p>
            </div>
            <div className="ml-auto text-center md:text-right">
              <FaBookmark
                onClick={handleBookmark}
                className={`cursor-pointer ${isBookmarked ? 'text-yellow-500' : 'text-white'}`}
                size={30}
              />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative z-10 pl-0 md:pl-32 -top-60 md:-top-36">
          {book.image && (
            <img
              src={`/uploads/${book.image}`}
              alt={book.title}
              className="md:w-24 w-48 lg:w-56 mx-auto md:mx-0 rounded-lg shadow-lg mb-6"
            />
          )}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-start relative -top-60 pb-16"> {/* Align items to start */}
          <div className="flex justify-between w-full mt-4 px-4">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <p className="text-xl text-gray-700 mt-1">{book.author}</p> {/* Inline author */}
            </div>
            <FaBookmark
              onClick={handleBookmark}
              className={`cursor-pointer ${isBookmarked ? 'text-yellow-500' : 'text-gray-600'}`}
              size={30}
            />
          </div>

          <div className="mt-6 w-full px-4">
            <h2 className="text-2xl font-bold">About</h2>
            <p className="mt-2 text-gray-700">{book.description}</p>
          </div>

          <div className="mt-6 w-full px-4">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="flex items-center mt-2">
              <div className="text-yellow-500 text-lg">{renderStars(book.rating || 0)}</div>
              <span className="ml-2 text-gray-600">{(book.rating || 0).toFixed(1)} out of 5</span>
            </div>
            <div className="mt-4 space-y-4">
              {(book.reviews && book.reviews.length > 0 ? book.reviews : dummyReviews).map((review, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{review.name}</span>
                    <span className="text-yellow-500">{renderStars(review.rating)}</span>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                  <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Buttons for Read and Download (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg md:hidden">
          <div className="flex justify-between">
            <button className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600">
              {book.pdf && (
                <a href={`/uploads/${book.pdf}`} target="_blank" rel="noopener noreferrer">
                  Read Online
                </a>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 ml-2">
              Download
            </button>
          </div>
        </div>

        {/* Large Screen Content (unchanged) */}
        <div className="hidden md:block">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 pl-0 md:pl-20 relative -top-24 text-center md:text-left">
              <button className="w-full md:w-80 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 mb-4">
                {book.pdf && (
                  <a href={`/uploads/${book.pdf}`} target="_blank" rel="noopener noreferrer">
                    Read Online
                  </a>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="w-full md:w-80 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              >
                Download
              </button>
            </div>
            <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0 relative -top-96">
              {/* About Section */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">About</h2>
                <p className="mt-2 text-gray-700 dark:text-gray-200">{book.description}</p>
              </div>

              {/* Publisher Section */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Publisher</h2>
                <p className="text-gray-700 dark:text-gray-200">{book.published}</p>
              </div>

              {/* Customer Reviews Section */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Reviews</h2>
                <div className="flex items-center mt-2">
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
      </div>
    </>
  );
};