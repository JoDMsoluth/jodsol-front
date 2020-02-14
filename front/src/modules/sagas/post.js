import { all, fork, takeEvery } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga';
import {
  addPostApi,
  deletePostApi,
  updatePostApi,
  loadPostApi,
  likePostApi,
  unlikePostApi,
  uploadThumbnailApi,
} from './apis/post';
import {
  ADD_POST_REQUEST,
  DELETE_POST_REQUEST,
  UPDATE_POST_REQUEST,
  LOAD_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from '../stores/post';
import { UPLOAD_THUMBNAIL_REQUEST } from 'modules/stores/write';

//--------------------------------------------------------
const addPost = createRequestSaga('ADD_POST', addPostApi);
const deletePost = createRequestSaga('DELETE_POST', deletePostApi);
const updatePost = createRequestSaga('UPDATE_POST', updatePostApi);
const loadPost = createRequestSaga('LOAD_POST', loadPostApi);
const likePost = createRequestSaga('LIKE_POST', likePostApi);
const unlikePost = createRequestSaga('UNLIKE_POST', unlikePostApi);
const uploadThumbnail = createRequestSaga(
  'UPLOAD_THUMBNAIL',
  uploadThumbnailApi,
);

//---------------------------------------------

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}
function* watchDeletePost() {
  yield takeEvery(DELETE_POST_REQUEST, deletePost);
}
function* watchUpdatePost() {
  yield takeEvery(UPDATE_POST_REQUEST, updatePost);
}

function* watchLoadPost() {
  yield takeEvery(LOAD_POST_REQUEST, loadPost);
}

function* watchLikePost() {
  yield takeEvery(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
  yield takeEvery(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchUploadImg() {
  yield takeEvery(UPLOAD_THUMBNAIL_REQUEST, uploadThumbnail);
}

//---------------------------------------

export default function* userSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchDeletePost),
    fork(watchUpdatePost),
    fork(watchLoadPost),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImg),
  ]);
}
