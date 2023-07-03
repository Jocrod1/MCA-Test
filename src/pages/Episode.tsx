import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { EpisodeDetail, PodcastDetail } from "../models/Podcast";
import { StoreStateType } from "../actions";
import { isValidUrl } from "../utils";

type DescriptionProps = {
  text: string;
  onClick: (secs: number) => void;
};
const Description = ({ text, onClick }: DescriptionProps) => {
  return (
    <p className="italic mt-4 whitespace-pre-line">
      {text.split("\n").map((str) => (
        <>
          {str.split(/\s/).map((txt, index) => {
            if (txt.includes("(") && txt.includes(")") && txt.includes(":")) {
              const digitsArr = txt
                .slice(txt.indexOf("(") + 1, txt.indexOf(")"))
                .split(":")
                .reverse()
                .map((str) => parseInt(str));
              let min: number,
                secs: number,
                hours: number = 0;

              secs = digitsArr[0];
              min = digitsArr[1];
              if (!!digitsArr[2]) hours = digitsArr[2];

              return (
                <>
                  <span
                    onClick={() => onClick(secs + min * 60 + hours * 3600)}
                    className="text-blue-500 underline hover:no-underline cursor-pointer"
                  >
                    {txt}
                  </span>
                  &nbsp;
                </>
              );
            }
            if (isValidUrl(txt)) {
              const hyperlink = txt.startsWith("www")
                ? "https://" + txt
                : txt.startsWith("https://www.")
                ? txt
                : "https://www." + txt;

              return (
                <>
                  <a
                    key={index}
                    href={hyperlink}
                    target="_blank"
                    className="text-blue-500 underline hover:no-underline cursor-pointer"
                  >
                    {txt}
                  </a>
                  &nbsp;
                </>
              );
            }

            return txt + " ";
          })}

          <br></br>
        </>
      ))}
    </p>
  );
};

type Params = {
  id: string;
  idEpisode: string;
};

const Episode = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { id, idEpisode } = useParams<Params>();
  const podcastState = useSelector<StoreStateType, PodcastDetail[]>(
    (state) => state.PodcastState
  );
  //   const [podcast, setPodcast] = useState<PodcastDetail>();
  const [episode, setEpisode] = useState<EpisodeDetail>();

  const handleFetch = () => {
    const _podcast = podcastState.find(
      (Pd) => Pd.collectionId == parseInt(id || "0")
    );

    if (!!_podcast) {
      const episode = _podcast.episodes.find(
        (ep) => ep.trackId == parseInt(idEpisode || "0")
      );

      if (!!episode) setEpisode(episode);
    }
    // setEpisodres(_episodes);
  };

  useEffect(() => {
    handleFetch();
  }, [podcastState]);

  if (!episode) return null;

  return (
    <div className="flex flex-col gap-y-10 px-6">
      <div className="shadow bg-white py-8 px-8">
        <div className="flex flex-row items-center">
          <span
            onClick={() => navigate(-1)}
            className="text-4xl font-bold mr-8 cursor-pointer text-blue-500"
          >
            {"≪"}
          </span>
          <h2 className="font-bold text-2xl">{episode.trackName}</h2>
        </div>
        <Description
          text={episode.description}
          onClick={(secs) => {
            if (!!videoRef.current) {
              videoRef.current.currentTime = secs;
            }
          }}
        />

        <video
          ref={videoRef}
          height={10}
          playsInline
          controls
          className="outline-none w-full h-10 mt-6"
        >
          <source src={episode.episodeUrl} type="audio/mpeg" />
        </video>
      </div>
    </div>
  );
};

export default Episode;
