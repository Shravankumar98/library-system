import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthorsState, Author } from "../../types";

const initialState: AuthorsState = {
  authors: [],
  loading: false,
  error: null,
};

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    fetchAuthorsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAuthorsSuccess: (state, action: PayloadAction<Author[]>) => {
      state.authors = action.payload;
      state.loading = false;
    },
    fetchAuthorsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createAuthorRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createAuthorSuccess: (state, action: PayloadAction<Author>) => {
      state.authors.push(action.payload);
      state.loading = false;
    },
    createAuthorFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAuthorRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateAuthorSuccess: (state, action: PayloadAction<Author>) => {
      const index = state.authors.findIndex(
        (author) => author.id === action.payload.id
      );
      if (index !== -1) {
        state.authors[index] = action.payload;
      }
      state.loading = false;
    },
    updateAuthorFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAuthorRequest: (state, _action) => {
      state.loading = true;
      state.error = null;
    },
    deleteAuthorSuccess: (state, action: PayloadAction<number>) => {
      state.authors = state.authors.filter(
        (author) => author.id !== action.payload
      );
      state.loading = false;
    },
    deleteAuthorFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAuthorsRequest,
  fetchAuthorsSuccess,
  fetchAuthorsFailure,
  createAuthorRequest,
  createAuthorSuccess,
  createAuthorFailure,
  updateAuthorRequest,
  updateAuthorSuccess,
  updateAuthorFailure,
  deleteAuthorRequest,
  deleteAuthorSuccess,
  deleteAuthorFailure,
} = authorsSlice.actions;
export default authorsSlice.reducer;
