import axios from "axios";
import { Entry, Feed } from "../models";
import { PodcastDetail, resultResponse } from "../models/Podcast";
import { Dispatchtype } from "../store/models/mainsTypes";
import { GetMain } from "../store/creators/MainCreator";
import moment from "moment";
import { GetPodcast, SetPodcast } from "../store/creators/PodcastCreator";
import { getRandMinutes } from "../utils";

export type StoreStateType = {FeedState: Feed, PodcastState: PodcastDetail[]};

type storeReducer = () => StoreStateType
  
export const getMain = () => async (dispatch:Dispatchtype, getStore : storeReducer) => {
  let entry : Entry[]= [];
  const {FeedState} : StoreStateType = getStore();
  if(!!FeedState?.lastFetch && moment().diff(moment(FeedState.lastFetch), "days") <= 0){
    entry = FeedState.entry;
  }
  else {
    const { data } = await axios.get(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    );
    GetMain({...data.feed, lastFetch: moment()})(dispatch)
    entry = data.feed.entry;
  }
  return entry.map(entr => ({...entr, title:{...entr.title, label: entr.title.label.split(" - ")[0]}}));
}

export const getPodcast = (id: number) => async (dispatch:Dispatchtype, getStore : storeReducer)  => {
  let podcastD : PodcastDetail;

  const {PodcastState, FeedState} :StoreStateType = getStore();

  const podcastFromReducer : PodcastDetail | undefined = PodcastState.find(pD => pD.collectionId === id);

  if(!!podcastFromReducer && moment().diff(moment(podcastFromReducer.lastFetch), "days") <= 0){
    podcastD = podcastFromReducer;
  }
  else {
    const { data } = await axios.get(
      `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode&limit=10 `)}`
    );

    const {results}: resultResponse =JSON.parse(data.contents); 

    const [podcastDet, ...episodes] = results;

    const entry = FeedState.entry.find(ent => ent.id.attributes["im:id"] == id);
  
    const podcast: PodcastDetail = {...podcastDet, description: entry?.summary.label || "", episodes: episodes.map(ep => ({...ep, timeLength: getRandMinutes()}))};

    if(!!podcastFromReducer){
      SetPodcast(podcast)(dispatch);
    }
    else {
      GetPodcast(podcast)(dispatch);
    }

    podcastD = podcast;
  }

  return podcastD;
}