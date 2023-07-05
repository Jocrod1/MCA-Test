import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { StoreStateType, getMain } from '../actions';
import FilterSearch from '../components/FilterSearch';
import Podcard from '../components/Podcard';
import { Entry, Feed } from '../models';
import { LOADED, LOADING } from '../store/actions/LoaderActionTypes';

const Main = () => {
  // Get the current state from the Redux store
  const FeedState = useSelector<StoreStateType, Feed>(
    (state) => state.FeedState
  );

  // Get the dispatch function from the Redux store
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: Dispatch<any> = useDispatch();

  // Define the 'data' state variable to store an array of 'Entry' objects
  const [data, setData] = useState<Array<Entry>>([]);

  // Fetch data from the server and update the state
  const handleFetch = useCallback(async () => {
    // Dispatch a 'LOADING' action to indicate that data is being loaded
    dispatch({ type: LOADING });

    // Call the 'getMain' action creator to fetch data from the server
    const entries = await getMain()(dispatch, FeedState);

    // Update the 'data' state variable with the fetched data
    setData(entries);

    // Dispatch a 'LOADED' action to indicate that data loading is complete
    dispatch({ type: LOADED });
  }, [dispatch, FeedState]);
  // Fetch data when the component mounts
  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  // Callback function to update the 'data' state variable
  const changeData = (response: Array<Entry>) => {
    setData(response);
  };

  return (
    <div className="flex flex-col w-full px-16 mt-6">
      {/* Render the FilterSearch component and pass 'data' and 'changeData' as props */}
      <FilterSearch items={data} handleChange={changeData} />

      <div className="flex flex-row items-start justify-center w-full flex-wrap gap-4 mb-10">
        {/* Render Podcard components for each 'Entry' object in 'data' */}
        {data.map((d, index) => (
          <Podcard key={index} item={d} />
        ))}
      </div>
    </div>
  );
};

export default Main;
