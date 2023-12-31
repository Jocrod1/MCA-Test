import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';

import { StoreStateType, getPodcast } from '../actions';
import PodDetails from '../components/PodDetails';
import { Feed } from '../models';
import { PodcastDetail } from '../models/Podcast';
import { LOADED, LOADING } from '../store/actions/LoaderActionTypes';

type Params = {
  id: string;
};

const PodcastLayout = () => {
  // Get the current state from the Redux store
  const FeedState = useSelector<StoreStateType, Feed>(
    (state) => state.FeedState
  );
  const loadingState = useSelector<StoreStateType, boolean>(
    (state) => state.loadingState
  );
  const PodcastState = useSelector<StoreStateType, PodcastDetail[]>(
    (state) => state.PodcastState
  );

  // Get the dispatch function from the Redux store
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: Dispatch<any> = useDispatch();

  // Define the 'podcast' state variable to store a PodcastDetail object
  const [podcast, setPodcast] = useState<PodcastDetail>();

  // Get the 'id' parameter from the URL
  const { id } = useParams<Params>();

  // Fetch the podcast data and update the state
  const handleFetch = useCallback(async () => {
    // Dispatch a 'LOADING' action to indicate that data is being loaded
    dispatch({ type: LOADING });

    // Call the 'getPodcast' action creator to fetch podcast data from the server
    const _podcast = await getPodcast(parseInt(id || '0'))(dispatch, {
      FeedState,
      PodcastState
    });

    // Update the 'podcast' state variable with the fetched podcast data
    setPodcast(_podcast);

    // Dispatch a 'LOADED' action to indicate that data loading is complete
    dispatch({ type: LOADED });
  }, [id, dispatch, FeedState, PodcastState]);
  // Fetch data when the component mounts
  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  // If the podcast is not available or still loading, show a loading indicator
  if (!podcast || loadingState)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <span className="loader-lg" />
      </div>
    );

  return (
    <div className="grid grid-cols-12 mt-6">
      {/* Render the PodDetails component and pass the podcast as props */}
      <div className="col-span-4 relative flex justify-center items-start">
        <PodDetails podcast={podcast} />
      </div>
      {/* Render the nested routes */}
      <div className="col-span-8">
        <Outlet />
      </div>
    </div>
  );
};

export default PodcastLayout;
