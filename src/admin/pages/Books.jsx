import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooksByCategory } from "../../features/books/booksSlice"; // Redux action to set initial books/categories
import AddBook from "../components/AddBook"; // AddBook component
import SearchBook from "../components/SearchBook"; // SearchBook component
import Navbar from "../components/Navbar"; // Navbar component

function Books() {
  const dispatch = useDispatch();
  
  // Get books from categories safely
  const booksByCategory = useSelector((state) => state.books.booksByCategory || {});
  const books = Object.values(booksByCategory).flat();

  // Get all available categories safely
  const categories = Object.keys(booksByCategory);

  useEffect(() => {
    // Dispatch action to set books and categories from local JSON (only if not set)
    dispatch(setBooksByCategory());
  }, [dispatch]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 p-4 relative">
        <div className="flex flex-col lg:flex-row gap-3">
          <AddBook categories={categories} />
          <SearchBook categories={categories} books={books} />
        </div>
      </div>
    </>
  );
}

export default Books;
