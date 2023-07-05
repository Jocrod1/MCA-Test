import { Dispatch } from 'redux';

import { Feed } from '../../models';
import { CLEAN_MAIN, GET_MAIN } from '../actions/MainActionTypes';
import { Dispatchtype, FeedAction } from '../models/mainsTypes';

export const GetMain = (feed: Feed) => (dispatch: Dispatchtype) => {
  const action: FeedAction = {
    type: GET_MAIN,
    feed
  };
  dispatch(action);
};

export const cleanMain = () => (dispatch: Dispatch<FeedAction>) => {
  const action: FeedAction = {
    type: CLEAN_MAIN
  };
  dispatch(action);
};
