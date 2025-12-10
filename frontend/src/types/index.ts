export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: number;
  title: string;
  isbn: string;
  description?: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowRecord {
  id: number;
  userId: number;
  bookId: number;
  borrowedAt: string;
  returnedAt: string | null;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

export interface AuthorsState {
  authors: Author[];
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface BorrowState {
  borrowRecords: BorrowRecord[];
  userBorrowedBooks: BorrowRecord[];
  loading: boolean;
  error: string | null;
}
