import { all, fork } from 'redux-saga/effects';
import posts from './posts';
import post from './post';
import comment from './comment';
import series from './series';
import utils from './utils';
import project from './project';

export default function* rootSaga() {
  yield all([
    fork(posts),
    fork(post),
    fork(comment),
    fork(series),
    fork(project),
    fork(utils),
  ]);
  // 배열 형태로 추가 ex) yield all([fork(user), fork(post)])
}
