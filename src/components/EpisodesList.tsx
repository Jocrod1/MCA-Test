import { EpisodeDetail } from "../models/Podcast";
import moment from "moment-timezone";

const EpisodesHeaderList = () => {
  return (
    <>
      <div className="col-span-4 font-semibold">Title</div>
      <div className="col-span-2 font-semibold">Date</div>
      <div className="col-span-2 font-semibold">Duration</div>
    </>
  );
};

type ItemProps = {
  episode: EpisodeDetail;
};

const EpisodeItem = ({ episode }: ItemProps) => {
  return (
    <div className="grid grid-cols-8 mx-6 py-3 bg-white even:bg-zinc-100 cursor-pointer hover:bg-zinc-200">
      <div className="col-span-4 text-blue-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis pr-8">
        {episode.trackName.toUpperCase()}
      </div>
      <div className="col-span-2">
        {moment(episode.releaseDate).format("DD/MM/YYYY")}
      </div>
      <div className="col-span-2">{episode.timeLength}</div>
    </div>
  );
};

type ListProps = {
  episodes: EpisodeDetail[];
};

const EpisodesList = ({ episodes }: ListProps) => {
  //TODO Connect with Data
  return (
    <div className="flex flex-col bg-white shadow divide-y py-8">
      <div className="grid grid-cols-8 mx-6 ">
        <EpisodesHeaderList />
      </div>
      {episodes.map((ep, index) => (
        <EpisodeItem key={index} episode={ep} />
      ))}
    </div>
  );
};

export default EpisodesList;
