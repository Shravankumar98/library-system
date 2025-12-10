import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BooksState, Book } from "../../types";

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    fetchBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
      state.loading = false;
    },
    fetchBooksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createBookRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createBookSuccess: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
      state.loading = false;
    },
    createBookFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBookRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateBookSuccess: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
      state.loading = false;
    },
    updateBookFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteBookRequest: (state, _action) => {
      state.loading = true;
      state.error = null;
    },
    deleteBookSuccess: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      state.loading = false;
    },
    deleteBookFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailure,
  createBookRequest,
  createBookSuccess,
  createBookFailure,
  updateBookRequest,
  updateBookSuccess,
  updateBookFailure,
  deleteBookRequest,
  deleteBookSuccess,
  deleteBookFailure,
} = booksSlice.actions;
export default booksSlice.reducer;
