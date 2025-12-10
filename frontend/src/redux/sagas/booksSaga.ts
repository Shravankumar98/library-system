import { call, put, takeEvery } from "redux-saga/effects";
import {
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
} from "../slices/booksSlice";
import api from "../../services/api";
import { Book } from "../../types";

function* fetchBooksSaga(): any {
  try {
    const response: { data: Book[] } = yield call(api.get, "/books");
    yield put(fetchBooksSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchBooksFailure(
        error.response?.data?.message || "Failed to fetch books"
      )
    );
  }
}

function* createBookSaga(action: any): any {
  try {
    const response: { data: Book } = yield call(
      api.post,
      "/books",
      action.payload
    );
    yield put(createBookSuccess(response.data));
    yield put(fetchBooksRequest());
  } catch (error: any) {
    yield put(
      createBookFailure(
        error.response?.data?.message || "Failed to create book"
      )
    );
  }
}

function* updateBookSaga(action: any): any {
  try {
    const response: { data: Book } = yield call(
      api.put,
      `/books/${action.payload.id}`,
      action.payload
    );
    yield put(updateBookSuccess(response.data));
    yield put(fetchBooksRequest());
  } catch (error: any) {
    yield put(
      updateBookFailure(
        error.response?.data?.message || "Failed to update book"
      )
    );
  }
}

function* deleteBookSaga(action: any): any {
  try {
    yield call(api.delete, `/books/${action.payload}`);
    yield put(deleteBookSuccess(action.payload));
  } catch (error: any) {
    yield put(
      deleteBookFailure(
        error.response?.data?.message || "Failed to delete book"
      )
    );
  }
}

export function* booksSaga() {
  yield takeEvery(fetchBooksRequest.type, fetchBooksSaga);
  yield takeEvery(createBookRequest.type, createBookSaga);
  yield takeEvery(updateBookRequest.type, updateBookSaga);
  yield takeEvery(deleteBookRequest.type, deleteBookSaga);
}
