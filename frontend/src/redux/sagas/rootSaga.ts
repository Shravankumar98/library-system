import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { booksSaga } from "./booksSaga";
import { authorsSaga } from "./authorsSaga";
import { usersSaga } from "./usersSaga";
import { borrowSaga } from "./borrowSaga";

export function* rootSaga() {
  yield all([
    authSaga(),
    booksSaga(),
    authorsSaga(),
    usersSaga(),
    borrowSaga(),
  ]);
}
