import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { StoreStateType } from '../actions';
import EpisodesList from '../components/EpisodesList';
import { PodcastDetail } from '../models/Podcast';

type Params = {
  id: string;
};

const Podcast = () => {
  // Get the podcast state from the Redux store
  const podcastState = useSelector<StoreStateType, PodcastDetail[]>(
    (state) => state.PodcastState
  );

  // Define the 'podcast' state variable to store a PodcastDetail object
  const [podcast, setPodcast] = useState<PodcastDetail>();

  // Get the 'id' parameter from the URL
  const { id } = useParams<Params>();

  // Fetch the podcast data and update the state
  const handleFetch = useCallback(() => {
    // Find the podcast in the podcastState array based on the 'id' parameter
    const _podcast = podcastState.find(
      (Pd) => Pd.collectionId == parseInt(id || '0')
    );

    // If the podcast is found, update the 'podcast' state variable
    if (_podcast) setPodcast(_podcast);
  }, [podcastState, id]);

  // Fetch data when the component mounts or when the podcastState changes
  useEffect(() => {
    handleFetch();
  }, [podcastState, handleFetch]);

  // If the podcast is not available, return null
  if (!podcast) return null;

  return (
    <div className="flex flex-col gap-y-10 px-6 mb-10">
      <div className="shadow bg-white py-4 pl-4">
        {/* Render the number of episodes in the podcast */}
        <h2 className="font-bold text-xl">Episodes: {podcast?.trackCount}</h2>
      </div>

      {/* Render the EpisodesList component and pass the episodes as props */}
      <EpisodesList episodes={podcast.episodes} />
    </div>
  );
};

export default Podcast;
