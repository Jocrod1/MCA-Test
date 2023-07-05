import podcastReducer from './podcastReducer';
import mainReducer from './mainReducer';

import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';

export default combineReducers({
  FeedState: mainReducer,
  PodcastState: podcastReducer,
  loadingState: loaderReducer
});
