import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { EpisodeDetail, PodcastDetail } from '../models/Podcast';
import { StoreStateType } from '../actions';
import { isValidUrl } from '../utils';

type DescriptionProps = {
  text: string;
  onClick: (secs: number) => void;
};

// Function to check if a string contains a time character interval
const isTimeCharInterval = (txt: string, init: string, end: string) => {
  return txt.includes(init) && txt.includes(end) && txt.includes(':');
};

// Function to extract time values from a string containing a time character interval
const getTime = (txt: string, init: string, end: string) => {
  const digitsArr = txt
    .slice(txt.indexOf(init) + 1, txt.indexOf(end))
    .split(':')
    .reverse()
    .map((str) => parseInt(str));
  let min: number,
    secs: number,
    hours = 0;

  secs = digitsArr[0];
  min = digitsArr[1];
  if (digitsArr[2]) hours = digitsArr[2];

  return { secs, min, hours };
};

// Component to display the episode description
const Description = ({ text, onClick }: DescriptionProps) => {
  return (
    <div className="italic mt-4 whitespace-pre-line">
      {text.split('\n').map((str, jindex) => (
        <div key={jindex}>
          {str.split(/\s/).map((txt, index) => {
            if (isTimeCharInterval(txt, '(', ')')) {
              const { secs, min, hours } = getTime(txt, '(', ')');
              return (
                <span
                  key={index}
                  onClick={() => onClick(secs + min * 60 + hours * 3600)}
                  className="text-blue-500 underline hover:no-underline cursor-pointer"
                >
                  {txt + ' '}
                </span>
              );
            }
            if (isTimeCharInterval(txt, '[', ']')) {
              const { secs, min, hours } = getTime(txt, '[', ']');
              return (
                <span
                  key={index}
                  onClick={() => onClick(secs + min * 60 + hours * 3600)}
                  className="text-blue-500 underline hover:no-underline cursor-pointer"
                >
                  {txt + ' '}
                </span>
              );
            }
            if (isValidUrl(txt)) {
              const hyperlink = txt.startsWith('www')
                ? 'https://' + txt
                : txt.startsWith('https://www.')
                ? txt
                : 'https://www.' + txt;

              return (
                <a
                  key={index}
                  href={hyperlink}
                  target="_blank"
                  className="text-blue-500 underline hover:no-underline cursor-pointer"
                >
                  {txt + ' '}
                </a>
              );
            }

            return <span key={index}>{txt + ' '}</span>;
          })}

          <br></br>
        </div>
      ))}
    </div>
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

  const [episode, setEpisode] = useState<EpisodeDetail>();

  // Function to fetch and set the episode data
  const handleFetch = () => {
    const _podcast = podcastState.find(
      (Pd) => Pd.collectionId == parseInt(id || '0')
    );

    if (_podcast) {
      const episode = _podcast.episodes.find(
        (ep) => ep.trackId == parseInt(idEpisode || '0')
      );

      if (episode) setEpisode(episode);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [podcastState]);

  // Return null if the episode is not available
  if (!episode) return null;

  return (
    <div className="flex flex-col gap-y-10 px-6 mb-10">
      <div className="shadow bg-white py-8 px-8">
        <div className="flex flex-row items-center">
          <span
            onClick={() => navigate(-1)}
            className="text-4xl font-bold mr-8 cursor-pointer text-blue-500"
          >
            {'≪'}
          </span>
          <h2 className="font-bold text-2xl">{episode.trackName}</h2>
        </div>
        <Description
          text={episode.description}
          onClick={(secs) => {
            if (videoRef.current) {
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
