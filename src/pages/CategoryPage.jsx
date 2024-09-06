import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import booksData from '../books.json'; // Import your local JSON file

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
    <div className="p-8 dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-8">{category || 'All Books'}</h1>
      {books.length === 0 ? (
        <p>No books available in this category.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <div key={book.id} className="rounded-xl drop-shadow-2xl w-36">
              <Link to={`/book/${book.id}`}>
                <div className="relative gap-1 justify-center text-center pt-4">
                  {book.image && (
                    <img
                      src={`/uploads/${book.image}`} // Adjust as needed for local file path
                      alt={book.title}
                      className="w-52 h-48 object-fit"
                    />
                  )}
                </div>
                <div className="pt-5">
                  <button
                    className="p-2 border justify-center text-lg dark:bg-slate-800 text-center rounded-md w-36 bg-blue-600 text-white"
                  >
                    Read More
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;