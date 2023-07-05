import { PodcastDetail } from '../models/Podcast';

type Props = {
  podcast: PodcastDetail;
};
const PodDetails = ({ podcast }: Props) => {
  return (
    <div className="sticky top-24 flex flex-col bg-white shadow divide-y w-3/5 px-4">
      <img src={podcast.artworkUrl600} className="aspect-square mx-6 my-6" />
      <div className="flex flex-col py-6">
        <h4 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {podcast.collectionName}
        </h4>
        <span className="font-light text-sm italic whitespace-nowrap overflow-hidden text-ellipsis">
          by {podcast.artistName}
        </span>
      </div>
      <div className="flex flex-col py-6">
        <h4 className="font-bold">Description</h4>
        <span className="font-light text-sm italic">{podcast.description}</span>
      </div>
    </div>
  );
};

export default PodDetails;
