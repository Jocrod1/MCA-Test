import { LOADED, LOADING } from '../actions/LoaderActionTypes';
import { LoaderAction } from '../models/loaderTypes';

const initialState = false;

const loaderReducer = (
  state: boolean = initialState,
  action: LoaderAction
): boolean => {
  switch (action.type) {
    case LOADING:
      return true;
    case LOADED:
      return false;
  }
  return state;
};

export default loaderReducer;
