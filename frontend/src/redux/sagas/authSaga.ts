import { call, put, takeEvery } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "../slices/authSlice";
import api from "../../services/api";
import { LoginResponse } from "../../types";

function* loginSaga(action: any): any {
  try {
    const response: { data: LoginResponse } = yield call(
      api.post,
      "/auth/login",
      {
        email: action.payload.email,
        password: action.payload.password,
      }
    );
    yield put(
      loginSuccess({
        user: response.data.user,
        token: response.data.access_token,
      })
    );
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

export function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
}
