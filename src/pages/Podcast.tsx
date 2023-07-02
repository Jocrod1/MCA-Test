import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPodcast } from "../actions";
import { PodcastDetail } from "../models/Podcast";
import PodDetails from "../components/PodDetails";
import EpisodesList from "../components/EpisodesList";

import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

type Params = {
  id: string;
};

const Podcast = () => {
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
        <div className="flex flex-col gap-y-10 px-6">
          <div className="shadow bg-white py-4 pl-4">
            <h2 className="font-bold text-xl">
              Episodes: {podcast?.trackCount}
            </h2>
          </div>

          <EpisodesList episodes={podcast.episodes} />
        </div>
      </div>
    </div>
  );
};

export default Podcast;
