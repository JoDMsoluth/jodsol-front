import { all, fork, takeEvery } from 'redux-saga/effects';
import createRequestSaga from '../../lib/createRequestSaga';
import {
  LOAD_VIEWS_REQUEST,
  SEND_MAIL_REQUEST,
  ADMIN_LOGIN_REQUEST,
} from '../stores/utils';
import { loadViewsApi, sendMailApi, adminLoginApi } from './apis/utils';

//--------------------------------------------------------
const loadViews = createRequestSaga('LOAD_VIEWS', loadViewsApi);
const sendMail = createRequestSaga('LOAD_MAIL', sendMailApi);
const adminLogin = createRequestSaga('ADMIN_LOGIN', adminLoginApi);

//---------------------------------------------

function* watchLoadViews() {
  yield takeEvery(LOAD_VIEWS_REQUEST, loadViews);
}
function* watchSendMail() {
  yield takeEvery(SEND_MAIL_REQUEST, sendMail);
}
function* watchAdminLogin() {
  yield takeEvery(ADMIN_LOGIN_REQUEST, adminLogin);
}

//---------------------------------------

export default function* userSaga() {
  yield all([fork(watchLoadViews), fork(watchSendMail), fork(watchAdminLogin)]);
}
