import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createRequestActionTypes } from 'lib/createRequestSaga';

export const initialState = {
  post: null,
  postError: null,
  postSuccess: null,
  toc: null,
  activeHeading: null,
};

export const [
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
] = createRequestActionTypes('ADD_POST');
export const [
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
] = createRequestActionTypes('DELETE_POST');
export const [
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
] = createRequestActionTypes('LOAD_POST');
export const [
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes('UPDATE_POST');

export const [
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
] = createRequestActionTypes('LIKE_POST');
export const [
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
] = createRequestActionTypes('UNLIKE_POST');

export const likePost = createAction(LIKE_POST_REQUEST);
export const unlikePost = createAction(UNLIKE_POST_REQUEST);

export const SET_TOC = 'SET_TOC';
export const SET_ACTIVE_HEADING = 'SET_ACTIVE_HEADING';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const UNLOAD_POST = 'UNLOAD_POST';

export const setToc = createAction(SET_TOC, toc => toc);

export const addPost = createAction(
  ADD_POST_REQUEST,
  ({ title, markdown, tags, id, desc, category, coverImg }) => ({
    title,
    desc,
    markdown,
    tags,
    id,
    category,
    coverImg,
  }),
);

export const deletePost = createAction(DELETE_POST_REQUEST, id => id);
export const loadPost = createAction(LOAD_POST_REQUEST, id => id);
export const updatePost = createAction(UPDATE_POST_REQUEST);
export const unloadPost = createAction(UNLOAD_POST);
export const setActiveHeading = createAction(SET_ACTIVE_HEADING, id => id);

// 여기추가

export default handleActions(
  {
    [LOAD_POST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.post = action.payload;
      }),
    [LOAD_POST_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.postError = action.payload;
      }),
    [DELETE_POST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.postSuccess = action.payload;
      }),
    [DELETE_POST_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.postError = action.payload;
      }),
    [UPDATE_POST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.post = action.payload;
      }),
    [UPDATE_POST_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.postError = action.payload;
      }),
    [ADD_POST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.postSuccess = action.payload;
      }),
    [ADD_POST_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.postError = action.payload;
      }),
    [SET_TOC]: (state, action) =>
      produce(state, draft => {
        draft.toc = action.payload;
      }),
    [SET_ACTIVE_HEADING]: (state, action) =>
      produce(state, draft => {
        draft.activeHeading = action.payload;
      }),
    [LIKE_POST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.post.likes = action.payload;
      }),
    [LIKE_POST_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.postError = action.payload;
      }),
    [UNLIKE_POST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.post.likes = action.payload;
      }),
    [UNLIKE_POST_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.postError = action.payload;
      }),

    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);
