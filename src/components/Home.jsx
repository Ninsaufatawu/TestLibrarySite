import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooksByCategory, clearSearchResults } from '../features/books/booksSlice'; // Adjust the path
import Banner from "./Banner";
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import booksData from '../books.json'; // Import local JSON file

export const Home = () => {
  const dispatch = useDispatch();
  const booksByCategory = useSelector((state) => state.books.booksByCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Simulate fetching data from a local JSON file
        // Assuming booksData is an object with categories
        const categorizedBooks = booksData.categories || {}; // Adjust based on actual structure

        dispatch(setBooksByCategory(categorizedBooks)); // Dispatch to Redux
      } catch (error) {
        console.error("Error loading books:", error);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
    dispatch(clearSearchResults()); // Clear any previous search results
  }, [dispatch]);

  // Loading and error handling UI
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="overflow-y-scroll dark:bg-gray-800">
      <div className="dark:text-white">
        <div className='fixed w-full dark:h-16 h-16 z-20 bg-white'>
          <SearchBar />
        </div>
        <div className='p-8 pt-24'>
          <Banner />
          {Object.keys(booksByCategory).map(category => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4 pt-10">
                <Link to={`/category/${category}`}>
                  {category}
                </Link>
              </h2>
              <div className="overflow-x-auto flex gap-10 scrollbar-hide">
                {booksByCategory[category].map((book) => (
                  <div
                    key={book.id}
                    className="flex-shrink-0 w-1/2 md:w-36 rounded-xl drop-shadow-2xl" // Responsive widths
                  >
                    <Link to={`/book/${book.id}`}>
                      <div className="relative gap-1 justify-center text-center pt-4">
                        {book.image && (
                          <img src={`/uploads/${book.image}`} alt={book.title} className='w-full h-48 object-cover rounded-t-xl' />
                        )}
                      </div>
                      <div className='pt-2'>
                        <button className="p-2 border justify-center text-sm md:text-lg dark:bg-slate-800 text-center rounded-md w-full bg-blue-600 text-white">
                          Read More
                        </button>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
