import { Feed } from "../../models";
import { CLEAN_MAIN, GET_MAIN } from "../actions/MainActionTypes";
import { FeedAction } from "../models/mainsTypes";


const initialState : Feed = {
    entry: [],
};

const mainReducer = (state : Feed = initialState, action: FeedAction) : Feed => {
    switch(action.type){
        case GET_MAIN:
            return action.feed || initialState;
        case CLEAN_MAIN:
            return initialState;
    }
    return state;
}

export default mainReducer;