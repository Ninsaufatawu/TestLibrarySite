import { useState, useEffect } from 'react';
import booksData from '../books.json'; // Import local JSON file

const TrendingBooks = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);

  useEffect(() => {
    const fetchTrendingBooks = () => {
      try {
        const categorizedBooks = booksData.categories || {};
        console.log(categorizedBooks); // Debug log
        setTrendingBooks(categorizedBooks.Trending || []);
      } catch (error) {
        console.error("Error loading books:", error);
      }
    };

    fetchTrendingBooks();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Trending Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingBooks.length > 0 ? (
          trendingBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={`/uploads/${book.image}`}
                alt={book.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-gray-800 mt-2">{book.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No trending books available.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingBooks;
