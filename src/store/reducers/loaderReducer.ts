import { LOADED, LOADING } from "../actions/LoaderActionTypes";



const initialState : boolean = false;

const loaderReducer = (state : boolean = initialState, action: LoaderAction) : boolean => {
    switch(action.type){
        case LOADING:
            return true;
        case LOADED:
            return false;
    }
    return state;
}

export default loaderReducer;