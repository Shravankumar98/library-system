import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchAuthorsRequest,
  fetchAuthorsSuccess,
  fetchAuthorsFailure,
  createAuthorRequest,
  createAuthorSuccess,
  createAuthorFailure,
  updateAuthorFailure,
  updateAuthorRequest,
  updateAuthorSuccess,
  deleteAuthorRequest,
  deleteAuthorSuccess,
  deleteAuthorFailure,
} from "../slices/authorsSlice";
import api from "../../services/api";
import { Author } from "../../types";

function* fetchAuthorsSaga(): any {
  try {
    const response: { data: Author[] } = yield call(api.get, "/authors");
    yield put(fetchAuthorsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchAuthorsFailure(
        error.response?.data?.message || "Failed to fetch authors"
      )
    );
  }
}

function* createAuthorSaga(action: any): any {
  try {
    const response: { data: Author } = yield call(
      api.post,
      "/authors",
      action.payload
    );
    yield put(createAuthorSuccess(response.data));
    yield put(fetchAuthorsRequest());
  } catch (error: any) {
    yield put(
      createAuthorFailure(
        error.response?.data?.message || "Failed to create author"
      )
    );
  }
}

function* updateAuthorSaga(action: any): any {
  try {
    const response: { data: Author } = yield call(
      api.put,
      `/authors/${action.payload.id}`,
      action.payload
    );
    yield put(updateAuthorSuccess(response.data));
    yield put(fetchAuthorsRequest());
  } catch (error: any) {
    yield put(
      updateAuthorFailure(
        error.response?.data?.message || "Failed to update author"
      )
    );
  }
}

function* deleteAuthorSaga(action: any): any {
  try {
    yield call(api.delete, `/authors/${action.payload}`);
    yield put(deleteAuthorSuccess(action.payload));
  } catch (error: any) {
    yield put(
      deleteAuthorFailure(
        error.response?.data?.message || "Failed to delete author"
      )
    );
  }
}

export function* authorsSaga() {
  yield takeEvery(fetchAuthorsRequest.type, fetchAuthorsSaga);
  yield takeEvery(createAuthorRequest.type, createAuthorSaga);
  yield takeEvery(updateAuthorRequest.type, updateAuthorSaga);
  yield takeEvery(deleteAuthorRequest.type, deleteAuthorSaga);
}
