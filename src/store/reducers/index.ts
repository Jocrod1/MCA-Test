import { combineReducers } from 'redux';

import loaderReducer from './loaderReducer';
import mainReducer from './mainReducer';
import podcastReducer from './podcastReducer';

export default combineReducers({
  FeedState: mainReducer,
  PodcastState: podcastReducer,
  loadingState: loaderReducer
});
