import { combineReducers } from 'redux';
import post from './post';
import posts from './posts';
import write from './write';
import loading from './loading';
import comment from './comment';
import hashtags from './hashtags';
import series from './series';
import utils from './utils';
import project from './project';

export default combineReducers({
  comment,
  hashtags,
  write,
  post,
  posts,
  loading,
  series,
  utils,
  project,
});
