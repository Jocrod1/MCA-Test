import { PodcastDetail } from "../../models/Podcast";
import { CLEAR_PODCASTS, GET_PODCAST, SET_PODCAST } from "../actions/PodcastActionTypes";
import { DispatchPodcast, PodcastAction } from "../models/podcastTypes";


export const  GetPodcast = (podcast: PodcastDetail) => (dispatch: DispatchPodcast) => {
    const action : PodcastAction = {
        type: GET_PODCAST, 
        podcast,
    };
    dispatch(action);
};

export const  SetPodcast = (podcast: PodcastDetail) => (dispatch: DispatchPodcast) => {
    const action : PodcastAction = {
        type: SET_PODCAST, 
        podcast,
    };
    dispatch(action);
};

export const  ClearPodcast = () => (dispatch: DispatchPodcast) => {
    const action : PodcastAction = {
        type: CLEAR_PODCASTS, 
    };
    dispatch(action);
};