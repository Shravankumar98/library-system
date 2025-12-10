import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BorrowState, BorrowRecord } from "../../types";

const initialState: BorrowState = {
  borrowRecords: [],
  userBorrowedBooks: [],
  loading: false,
  error: null,
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    borrowBookRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    borrowBookSuccess: (state, action: PayloadAction<BorrowRecord>) => {
      state.borrowRecords.push(action.payload);
      // Add to user's borrowed books if returnedAt is null (still active)
      if (!action.payload.returnedAt) {
        state.userBorrowedBooks.push(action.payload);
      }
      state.loading = false;
    },
    borrowBookFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    returnBookRequest: (state, _action) => {
      state.loading = true;
      state.error = null;
    },
    returnBookSuccess: (state, action: PayloadAction<BorrowRecord>) => {
      state.borrowRecords = state.borrowRecords.map((record) =>
        record.id === action.payload.id ? action.payload : record
      );
      state.userBorrowedBooks = state.userBorrowedBooks.filter(
        (record) => record.id !== action.payload.id
      );
      state.loading = false;
    },
    returnBookFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserBorrowedBooksRequest: (state, _action) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserBorrowedBooksSuccess: (
      state,
      action: PayloadAction<BorrowRecord[]>
    ) => {
      state.userBorrowedBooks = action.payload;
      state.loading = false;
    },
    fetchUserBorrowedBooksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  borrowBookRequest,
  borrowBookSuccess,
  borrowBookFailure,
  returnBookRequest,
  returnBookSuccess,
  returnBookFailure,
  fetchUserBorrowedBooksRequest,
  fetchUserBorrowedBooksSuccess,
  fetchUserBorrowedBooksFailure,
} = borrowSlice.actions;
export default borrowSlice.reducer;
