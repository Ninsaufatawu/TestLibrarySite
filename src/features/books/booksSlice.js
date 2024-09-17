import { createSlice } from "@reduxjs/toolkit";
import booksData from "../../books.json"; // Import local JSON file

// Initial state
const initialState = {
  booksByCategory: booksData.categories || {},
  searchResults: [],
  categories: [], // Add categories to the state
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
        state.booksByCategory[category] = state.booksByCategory[category].filter(
          (book) => book.id !== id
        );
      });
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    addCategory: (state, action) => { // New reducer to handle adding a category
      const newCategory = action.payload;
      if (!state.categories.includes(newCategory)) {
        state.categories.push(newCategory);
        state.booksByCategory[newCategory] = [];
      }
    },
    deleteCategory: (state, action) => { // New reducer to handle deleting a category
      const categoryToDelete = action.payload;
      const { [categoryToDelete]: _, ...remainingCategories } = state.booksByCategory;
      state.booksByCategory = remainingCategories;
      state.categories = state.categories.filter(category => category !== categoryToDelete);
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
  addCategory, // Export the new action
  deleteCategory, // Export the new action
} = booksSlice.actions;

// Export reducer
export default booksSlice.reducer;
