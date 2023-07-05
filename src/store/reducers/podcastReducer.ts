import { PodcastDetail } from '../../models/Podcast';
import {
  CLEAR_PODCASTS,
  GET_PODCAST,
  SET_PODCAST
} from '../actions/PodcastActionTypes';
import { PodcastAction } from '../models/podcastTypes';

const initialState: PodcastDetail[] = [];

const podcastReducer = (
  state: PodcastDetail[] = initialState,
  action: PodcastAction
) => {
  switch (action.type) {
    case GET_PODCAST:
      return action.podcast ? [...state, action.podcast] : state;
    case SET_PODCAST:
      return !action.podcast
        ? state
        : state.map((pod) =>
            pod.collectionId === action.podcast?.collectionId
              ? action.podcast
              : pod
          );
    case CLEAR_PODCASTS:
      return initialState;
  }
  return state;
};

export default podcastReducer;
