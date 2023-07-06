import axios from 'axios';
import moment from 'moment-timezone';

import { Entry, Feed } from '../models';
import { PodcastDetail, resultResponse } from '../models/Podcast';
import { GetMain } from '../store/creators/MainCreator';
import { GetPodcast, SetPodcast } from '../store/creators/PodcastCreator';
import { Dispatchtype } from '../store/models/mainsTypes';
import { getRandMinutes } from '../utils';

export type StoreStateType = {
  FeedState: Feed;
  PodcastState: PodcastDetail[];
  loadingState: boolean;
};

export const getMain =
  () => async (dispatch: Dispatchtype, FeedState: Feed) => {
    let entry: Entry[] = [];
    if (
      !!FeedState?.lastFetch &&
      moment().diff(moment(FeedState.lastFetch), 'days') <= 0
    ) {
      entry = FeedState.entry;
    } else {
      const { data } = await axios.get(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
      );
      GetMain({ ...data.feed, lastFetch: moment() })(dispatch);
      entry = data.feed.entry;
    }
    return entry.map((entr) => ({
      ...entr,
      title: { ...entr.title, label: entr.title.label.split(' - ')[0] }
    }));
  };

export const getPodcast =
  (id: number) =>
  async (
    dispatch: Dispatchtype,
    {
      PodcastState,
      FeedState
    }: { FeedState: Feed; PodcastState: PodcastDetail[] }
  ) => {
    let podcastD: PodcastDetail;

    const podcastFromReducer: PodcastDetail | undefined = PodcastState.find(
      (pD) => pD.collectionId === id
    );

    if (
      !!podcastFromReducer &&
      moment().diff(moment(podcastFromReducer.lastFetch), 'days') <= 0
    ) {
      podcastD = podcastFromReducer;
    } else {
      const { data } = await axios.get(
        `https://cors-anywhere.herokuapp.com/${`https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode&limit=50 `}`
      );

      const { results }: resultResponse = data;

      const [podcastDet, ...episodes] = results;

      const entry = FeedState.entry.find(
        (ent) => ent.id.attributes['im:id'] == id
      );

      const podcast: PodcastDetail = {
        ...podcastDet,
        description: entry?.summary.label || '',
        episodes: episodes.map((ep) => ({
          ...ep,
          timeLength: getRandMinutes()
        }))
      };

      if (podcastFromReducer) {
        SetPodcast(podcast)(dispatch);
      } else {
        GetPodcast(podcast)(dispatch);
      }

      podcastD = podcast;
    }

    return podcastD;
  };
