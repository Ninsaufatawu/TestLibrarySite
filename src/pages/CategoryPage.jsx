import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import booksData from '../books.json'; // Import your local JSON file
import { FaArrowLeft } from 'react-icons/fa';

export const CategoryPage = () => {
  const { category } = useParams(); // Get the category from the URL
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const filterBooksByCategory = () => {
      let filteredBooks = [];

      // If a category is provided, filter books by that category
      if (category) {
        for (const cat in booksData.categories) {
          if (cat.toLowerCase() === category.toLowerCase()) {
            filteredBooks = booksData.categories[cat];
            break;
          }
        }
      } else {
        // If no category, get all books from all categories
        for (const cat in booksData.categories) {
          filteredBooks.push(...booksData.categories[cat]);
        }
      }

      setBooks(filteredBooks);
    };

    filterBooksByCategory();
  }, [category]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="p-8 ">
        <Link to="/" className="flex items-center w-40 gap-2 mb-6 text-blue-600 hover:underline">
          <FaArrowLeft className="text-xl" />
          <span className="font-bold text-2xl">Back Home</span>
        </Link>

        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">{category || 'All Books'}</h1>

        {books.length === 0 ? (
          <div className="text-lg text-gray-600 dark:text-gray-300">No books available in this category.</div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <Link to={`/book/${book.id}`} className="block">
                  <img
                    src={`/uploads/${book.image}`} // Adjust as needed for local file path
                    alt={book.title}
                    className="w-64 h-80 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{book.title}</h2>
                    <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
                      Read More
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;