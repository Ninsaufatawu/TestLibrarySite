import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice'; // Adjust the import path as needed

const store = configureStore({
  reducer: {
    books: booksReducer, // Add the books slice reducer
  },
});

export default store;