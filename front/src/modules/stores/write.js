import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createRequestActionTypes } from '../../lib/createRequestSaga';

export const initialState = {
  markdown: '',
  title: '',
  tags: '',
  desc: '',
  coverImg: null,
  writeError: null,
  images: null,
  image: null,
};

export const [
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
] = createRequestActionTypes('UPLOAD_IMAGES');
export const [
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
] = createRequestActionTypes('UPLOAD_IMAGE');
export const [
  UPLOAD_THUMBNAIL_REQUEST,
  UPLOAD_THUMBNAIL_SUCCESS,
  UPLOAD_THUMBNAIL_FAILURE,
] = createRequestActionTypes('UPLOAD_THUMBNAIL');

export const INITIALIZE = 'INITIALIZE';
export const CHANGE_INPUT = 'CHANGE_INPUT';
export const CHANGE_MARKDOWN = 'CHANGE_MARKDOWN';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_DESC = 'CHANGE_DESC';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const REMOVE_THUMBNAIL = 'REMOVE_THUMBNAIL';

export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const changeMarkdown = createAction(CHANGE_MARKDOWN);
export const changeTitle = createAction(CHANGE_TITLE);
export const changeDesc = createAction(CHANGE_DESC);

export const uploadThumbnail = createAction(
  UPLOAD_THUMBNAIL_REQUEST,
  ({ imageFormData }) => ({ imageFormData }),
);
export const uploadImg = createAction(
  UPLOAD_IMAGES_REQUEST,
  ({ imageFormData }) => ({ imageFormData }),
);

export const removeImg = createAction(REMOVE_IMAGE);
export const removeThumbnail = createAction(REMOVE_THUMBNAIL);

// 여기추가

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        const { name, value } = action.payload;
        draft[name] = value;
      }),
    [CHANGE_MARKDOWN]: (state, action) =>
      produce(state, draft => {
        draft.markdown = action.payload;
      }),
    [CHANGE_TITLE]: (state, action) =>
      produce(state, draft => {
        draft.title = action.payload;
      }),
    [CHANGE_DESC]: (state, action) =>
      produce(state, draft => {
        draft.desc = action.payload;
      }),
    [UPLOAD_THUMBNAIL_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.coverImg = action.payload;
      }),
    [UPLOAD_THUMBNAIL_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.writeError = action.payload;
      }),
    [UPLOAD_IMAGE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.image = action.payload;
      }),
    [UPLOAD_IMAGE_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.writeError = action.payload;
      }),
    [UPLOAD_IMAGES_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.images = action.payload;
      }),
    [UPLOAD_IMAGES_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.writeError = action.payload;
      }),
    [REMOVE_IMAGE]: state =>
      produce(state, draft => {
        draft.image = null;
      }),
    [REMOVE_THUMBNAIL]: state =>
      produce(state, draft => {
        draft.coverImg = null;
      }),
  },
  initialState,
);
