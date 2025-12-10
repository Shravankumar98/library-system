import { call, put, takeEvery } from "redux-saga/effects";
import {
  borrowBookRequest,
  borrowBookSuccess,
  borrowBookFailure,
  returnBookRequest,
  returnBookSuccess,
  returnBookFailure,
  fetchUserBorrowedBooksRequest,
  fetchUserBorrowedBooksSuccess,
  fetchUserBorrowedBooksFailure,
} from "../slices/borrowSlice";
import api from "../../services/api";
import { BorrowRecord } from "../../types";

function* borrowBookSaga(action: any): any {
  try {
    const response: { data: BorrowRecord } = yield call(
      api.post,
      "/borrow/borrow",
      action.payload
    );
    yield put(borrowBookSuccess(response.data));
    // Fetch updated borrowed books for the user
    const borrowedBooksResponse: { data: BorrowRecord[] } = yield call(
      api.get,
      `/borrow/user/${action.payload.userId}`
    );
    yield put(fetchUserBorrowedBooksSuccess(borrowedBooksResponse.data));
  } catch (error: any) {
    yield put(
      borrowBookFailure(
        error.response?.data?.message || "Failed to borrow book"
      )
    );
  }
}

function* returnBookSaga(action: any): any {
  try {
    const response: { data: BorrowRecord } = yield call(
      api.post,
      "/borrow/return",
      action.payload
    );
    yield put(returnBookSuccess(response.data));
  } catch (error: any) {
    yield put(
      returnBookFailure(
        error.response?.data?.message || "Failed to return book"
      )
    );
  }
}

function* fetchUserBorrowedBooksSaga(action: any): any {
  try {
    const response: { data: BorrowRecord[] } = yield call(
      api.get,
      `/borrow/user/${action.payload}`
    );
    yield put(fetchUserBorrowedBooksSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchUserBorrowedBooksFailure(
        error.response?.data?.message || "Failed to fetch borrowed books"
      )
    );
  }
}

export function* borrowSaga() {
  yield takeEvery(borrowBookRequest.type, borrowBookSaga);
  yield takeEvery(returnBookRequest.type, returnBookSaga);
  yield takeEvery(
    fetchUserBorrowedBooksRequest.type,
    fetchUserBorrowedBooksSaga
  );
}
