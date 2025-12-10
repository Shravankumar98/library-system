import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
} from "../slices/usersSlice";
import api from "../../services/api";
import { User } from "../../types";

function* fetchUsersSaga(): any {
  try {
    const response: { data: User[] } = yield call(api.get, "/users");
    yield put(fetchUsersSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchUsersFailure(
        error.response?.data?.message || "Failed to fetch users"
      )
    );
  }
}

function* createUserSaga(action: any): any {
  try {
    const response: { data: User } = yield call(
      api.post,
      "/users",
      action.payload
    );
    yield put(createUserSuccess(response.data));
    yield put(fetchUsersRequest());
  } catch (error: any) {
    yield put(
      createUserFailure(
        error.response?.data?.message || "Failed to create user"
      )
    );
  }
}

export function* usersSaga() {
  yield takeEvery(fetchUsersRequest.type, fetchUsersSaga);
  yield takeEvery(createUserRequest.type, createUserSaga);
}
