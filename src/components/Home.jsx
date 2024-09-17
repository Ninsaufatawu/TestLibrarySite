import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooksByCategory, clearSearchResults } from '../features/books/booksSlice'; // Adjust the path
import Banner from "./Banner";
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
import booksData from '../books.json'; // Import local JSON file

export const Home = () => {
  const dispatch = useDispatch();
  const booksByCategory = useSelector((state) => state.books.booksByCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false); // Track if left arrow should be visible
  const [showRightArrow, setShowRightArrow] = useState(true); // Track if right arrow should be visible
  const scrollRefs = useRef({}); // Use an object to track multiple category refs

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const categorizedBooks = booksData.categories || {};
        dispatch(setBooksByCategory(categorizedBooks)); 
      } catch (error) {
        console.error("Error loading books:", error);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
    dispatch(clearSearchResults());
  }, [dispatch]);

  const handleScroll = (category, direction) => {
    const scrollElement = scrollRefs.current[category]; // Get the correct ref based on the category
    if (scrollElement) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollElement;
      const scrollAmount = clientWidth * 0.7; // Adjust the scroll amount to 70% of container width

      if (direction === 'left') {
        scrollElement.scrollTo({
          left: Math.max(scrollLeft - scrollAmount, 0),
          behavior: 'smooth',
        });
      } else {
        scrollElement.scrollTo({
          left: Math.min(scrollLeft + scrollAmount, scrollWidth - clientWidth),
          behavior: 'smooth',
        });
      }
    }
  };

  const handleScrollCheck = (category) => {
    const scrollElement = scrollRefs.current[category]; // Get the correct ref based on the category
    if (scrollElement) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollElement;
      const maxScrollLeft = scrollWidth - clientWidth;

      // Update arrow visibility based on the scroll position
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < maxScrollLeft);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="overflow-y-scroll dark:bg-gray-800 pb-20">
      <div className="dark:text-white">
        <div className='fixed w-full dark:h-16 h-16 z-20 bg-white'>
          <SearchBar />
        </div>
        <div className='p-8 pt-24'>
          <Banner />
          {Object.keys(booksByCategory).map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4 pt-10">
                <Link to={`/category/${category}`}>
                  {category}
                </Link>
              </h2>
              <div className="relative">
                {/* Left Scroll Arrow */} 
                {showLeftArrow && (
                  <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-600 p-2 rounded-full"
                    onClick={() => handleScroll(category, 'left')}
                  >
                    <FaChevronLeft className="text-white" />
                  </button>
                )}

                <div
                  ref={(el) => (scrollRefs.current[category] = el)} // Assign ref dynamically to each category
                  onScroll={() => handleScrollCheck(category)}
                  className="overflow-x-auto flex gap-10 scrollbar-hide"
                >
                  {booksByCategory[category].map((book) => (
                    <div
                      key={book.id}
                      className="flex-shrink-0 w-1/2 md:w-64 rounded-xl"
                    >
                      <Link to={`/book/${book.id}`}>
                        <div className="relative gap-1 justify-center text-center pt-4">
                          {book.image && (
                            <img
                              src={`/uploads/${book.image}`}
                              alt={book.title}
                              className="w-full h-60 md:h-96 object-cover rounded-t-xl"
                            />
                          )}
                        </div>
                        <div className="pt-2">
                          <button className="p-2 border justify-center text-sm md:text-lg dark:bg-slate-800 text-center rounded-md w-full bg-blue-600 text-white">
                            Read More
                          </button>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Right Scroll Arrow */}
                {showRightArrow && (
                  <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-600 p-2 rounded-full"
                    onClick={() => handleScroll(category, 'right')}
                  >
                    <FaChevronRight className="text-white" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
