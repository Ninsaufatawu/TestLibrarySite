import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBook } from '../../features/books/booksSlice'; // Adjust import based on your file structure
import { Link } from 'react-router-dom';

function AddBook({ categories }) {
  const [newBook, setNewBook] = useState({
    id: uuidv4(), // Generate a unique ID for the book
    title: '',
    author: '',
    description: '',
    published: '',
    category: '',
    image: null,
    pdf: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewBook({ ...newBook, [name]: files[0] });
  };

  const handleAddBook = () => {
    // Dispatch action to add book to Redux store
    dispatch(addBook(newBook));

    // Clear the form and reset the state
    setNewBook({
      id: uuidv4(), // Generate a new unique ID for the next book
      title: '',
      author: '',
      description: '',
      published: '',
      category: '',
      image: null,
      pdf: null,
    });

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (pdfInputRef.current) {
      pdfInputRef.current.value = '';
    }

    setIsDialogOpen(true); // Show dialog
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex-1 lg:w-1/2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg mb-8">
      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold dark:text-white">Book Successfully Added</h3>
            <button
              onClick={closeDialog}
              className="mt-4 bg-blue-600 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-2 text-center dark:text-white">Add New Book</h2>
      {['title', 'author', 'description', 'published'].map(field => (
        <div className="mb-1" key={field}>
          <label htmlFor={field} className="block text-lg font-medium dark:text-white capitalize">{field}</label>
          <input
            id={field}
            type="text"
            name={field}
            value={newBook[field]}
            onChange={handleInputChange}
            placeholder={field}
            className="border p-2 mb-2 w-full text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      ))}
      <div className="mb-1">
        <label htmlFor="category" className="block text-lg font-medium dark:text-white">Select Category</label>
        <select
          id="category"
          name="category"
          value={newBook.category}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
          <option value="">
            <Link to="/category">Create New Category</Link>
          </option>
        </select>
      </div>
      {['image', 'pdf'].map(field => (
        <div className="mb-1" key={field}>
          <label htmlFor={field} className="block text-lg font-medium dark:text-white capitalize">{field}</label>
          <input
            id={field}
            type="file"
            name={field}
            onChange={handleFileChange}
            ref={field === 'image' ? imageInputRef : pdfInputRef}
            className="border p-2 mb-2 w-full text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      ))}
      <button onClick={handleAddBook} className="bg-blue-600 text-white p-2 w-full text-lg rounded">Add Book</button>
    </div>
  );
}

export default AddBook;
