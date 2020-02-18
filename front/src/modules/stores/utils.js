import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createRequestActionTypes } from '../../lib/createRequestSaga';

export const initialState = {
  todayViews: 0,
  totalViews: 0,
  viewsError: null,
  mailResult: null,
  loginResult: null,
};

export const [
  LOAD_VIEWS_REQUEST,
  LOAD_VIEWS_SUCCESS,
  LOAD_VIEWS_FAILURE,
] = createRequestActionTypes('LOAD_VIEWS');

export const [
  SEND_MAIL_REQUEST,
  SEND_MAIL_SUCCESS,
  SEND_MAIL_FAILURE,
] = createRequestActionTypes('SEND_MAIL');

export const [
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
] = createRequestActionTypes('ADMIN_LOGIN');

export const UNLOAD_VIEWS = 'UNLOAD_VIEWS';
export const INITIAL_MAIL = 'INITIAL_MAIL';

export const loadViews = createAction(LOAD_VIEWS_REQUEST);
export const unloadViews = createAction(UNLOAD_VIEWS);
export const sendMail = createAction(
  SEND_MAIL_REQUEST,
  ({ name, from, subject, content }) => ({ name, from, subject, content }),
);
export const adminLogin = createAction(
  ADMIN_LOGIN_REQUEST,
  ({ id, password }) => ({ id, password }),
);

export const initialMail = createAction(INITIAL_MAIL);
// 여기추가

export default handleActions(
  {
    [LOAD_VIEWS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.totalViews = action.payload.getTotalViews[0].totalViews;
        draft.todayViews = action.payload.getTodayViews.todayViews;
      }),
    [LOAD_VIEWS_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.viewsError = action.payload;
      }),
    [SEND_MAIL_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.mailResult = action.payload;
      }),
    [SEND_MAIL_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.mailResult = action.payload;
      }),
    [ADMIN_LOGIN_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.loginResult = action.payload;
      }),
    [ADMIN_LOGIN_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.loginResult = action.payload;
      }),
    [INITIAL_MAIL]: () => initialState,
  },
  initialState,
);
