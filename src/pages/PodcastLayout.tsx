import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { StoreStateType, getPodcast } from "../actions";
import { PodcastDetail } from "../models/Podcast";
import PodDetails from "../components/PodDetails";

import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { LOADED, LOADING } from "../store/actions/LoaderActionTypes";
import { useSelector } from "react-redux";

type Params = {
  id: string;
};

const PodcastLayout = () => {
  const loadingState = useSelector<StoreStateType, boolean>(
    (state) => state.loadingState
  );
  const dispatch: Dispatch<any> = useDispatch();
  const [podcast, setPodcast] = useState<PodcastDetail>();
  // const [episodes, setEpisodres] = useState<Array<EpisodeDetail>>([]);

  const { id } = useParams<Params>();

  const handleFetch = async () => {
    dispatch({ type: LOADING });
    const _podcast = await dispatch(getPodcast(parseInt(id || "0")));

    setPodcast(_podcast);
    dispatch({ type: LOADED });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (!podcast || loadingState)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <span className="loader-lg" />
      </div>
    );

  return (
    <div className="grid grid-cols-12 mt-6">
      <div className="col-span-4">
        <PodDetails podcast={podcast} />
      </div>
      <div className="col-span-8">
        <Outlet />
      </div>
    </div>
  );
};

export default PodcastLayout;
