import { createSlice } from "@reduxjs/toolkit";
import booksData from "../../books.json"; // Import local JSON file

// Initial state
const initialState = {
  booksByCategory: booksData.categories || {},
  searchResults: [],
};

// Create a slice
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooksByCategory: (state, action) => {
      state.booksByCategory = action.payload;
    },
    addBook: (state, action) => {
      const { book } = action.payload;
      if (!state.booksByCategory[book.category]) {
        state.booksByCategory[book.category] = [];
      }
      state.booksByCategory[book.category].push(book);
    },
    updateBook: (state, action) => {
      const { id, updatedData } = action.payload;
      Object.keys(state.booksByCategory).forEach((category) => {
        state.booksByCategory[category] = state.booksByCategory[category].map(
          (book) => (book.id === id ? { ...book, ...updatedData } : book)
        );
      });
    },
    deleteBook: (state, action) => {
      const { id } = action.payload;
      Object.keys(state.booksByCategory).forEach((category) => {
        state.booksByCategory[category] = state.booksByCategory[
          category
        ].filter((book) => book.id !== id);
      });
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

// Export actions
export const {
  setBooksByCategory,
  addBook,
  updateBook,
  deleteBook,
  setSearchResults,
  clearSearchResults,
} = booksSlice.actions;

// Export reducer
export default booksSlice.reducer;
