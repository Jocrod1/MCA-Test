import { Entry, Pod_Image } from "../models";

type Props = {
  item: Entry;
};

const getImage: (images: Array<Pod_Image>) => Pod_Image = (images) => {
  return (
    images.find((img) => parseInt(img.attributes.height) > 100) || images[0]
  );
};

const Podcard = ({ item }: Props) => {
  const image = getImage(item["im:image"]);
  return (
    <div className="flex bg-white shrink flex-col w-96 h-auto mt-20 shadow-lg items-center justify-center p-4 cursor-pointer hover:shadow-2xl transition-all">
      <div className="h-20 flex items-end">
        <img src={image.label} className="h-40 w-40 bg-red-700 rounded-full" />
      </div>
      <p className="font-semibold text-center mb-3">
        {item.title.label.toUpperCase()}
      </p>
      <p className="font-light text-center">{`Author: ${item["im:artist"].label}`}</p>
    </div>
  );
};

export default Podcard;
