import podcastReducer from "./PodcastReducer";
import mainReducer from "./mainReducer";

import {combineReducers} from "redux"

export default combineReducers({
    FeedState: mainReducer,
    PodcastState: podcastReducer
});