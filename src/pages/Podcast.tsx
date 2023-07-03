import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StoreStateType } from "../actions";
import { PodcastDetail } from "../models/Podcast";
import EpisodesList from "../components/EpisodesList";
import { useSelector } from "react-redux";

type Params = {
  id: string;
};

const Podcast = () => {
  const podcastState = useSelector<StoreStateType, PodcastDetail[]>(
    (state) => state.PodcastState
  );
  const [podcast, setPodcast] = useState<PodcastDetail>();

  const { id } = useParams<Params>();

  const handleFetch = () => {
    const _podcast = podcastState.find(
      (Pd) => Pd.collectionId == parseInt(id || "0")
    );

    if (!!_podcast) setPodcast(_podcast);
  };

  useEffect(() => {
    handleFetch();
  }, [podcastState]);

  if (!podcast) return null;

  return (
    <div className="flex flex-col gap-y-10 px-6 mb-10">
      <div className="shadow bg-white py-4 pl-4">
        <h2 className="font-bold text-xl">Episodes: {podcast?.trackCount}</h2>
      </div>

      <EpisodesList episodes={podcast.episodes} />
    </div>
  );
};

export default Podcast;
