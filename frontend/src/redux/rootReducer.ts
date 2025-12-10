import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import booksReducer from "./slices/booksSlice";
import authorsReducer from "./slices/authorsSlice";
import usersReducer from "./slices/usersSlice";
import borrowReducer from "./slices/borrowSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
  authors: authorsReducer,
  users: usersReducer,
  borrow: borrowReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
