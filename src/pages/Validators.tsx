import { useParams } from 'react-router-dom';

import Episode from './Episode';
import NotFound from './NotFound';
import PodcastLayout from './PodcastLayout';

type Params = {
  id: string;
  idEpisode: string;
};
export const ValidatePodcast = () => {
  const { id } = useParams<Params>();
  if (!!id && !id?.match(/^\d+$/)) {
    return <NotFound />;
  } else {
    return <PodcastLayout />;
  }
};

export const ValidateEpisode = () => {
  const { idEpisode } = useParams<Params>();
  if (!!idEpisode && !idEpisode?.match(/^\d+$/)) {
    return <NotFound />;
  } else {
    return <Episode />;
  }
};
