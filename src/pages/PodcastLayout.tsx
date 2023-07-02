import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getPodcast } from "../actions";
import { PodcastDetail } from "../models/Podcast";
import PodDetails from "../components/PodDetails";

import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

type Params = {
  id: string;
};

const PodcastLayout = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [podcast, setPodcast] = useState<PodcastDetail>();
  // const [episodes, setEpisodres] = useState<Array<EpisodeDetail>>([]);

  const { id } = useParams<Params>();

  const handleFetch = async () => {
    const _podcast = await dispatch(getPodcast(parseInt(id || "0")));

    setPodcast(_podcast);
    // setEpisodres(_episodes);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (!podcast) return null;

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
