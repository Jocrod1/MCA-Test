import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';

import { Entry, Pod_Image } from '../models';
import { LOADING } from '../store/actions/LoaderActionTypes';
import { LoaderAction } from '../store/models/loaderTypes';

type Props = {
  item: Entry;
};

const getImage: (images: Array<Pod_Image>) => Pod_Image = (images) => {
  return (
    images.find((img) => parseInt(img.attributes.height) > 100) || images[0]
  );
};

const Podcard = ({ item }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<LoaderAction>>();
  const image = getImage(item['im:image']);
  return (
    <div
      onClick={() => {
        navigate('/podcast/' + item.id.attributes['im:id']);
        dispatch({ type: LOADING });
      }}
      className="flex bg-white shrink flex-col w-96 h-auto mt-20 shadow items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-all"
    >
      <div className="h-20 flex items-end">
        <img src={image.label} className="h-40 w-40 bg-white rounded-full" />
      </div>
      <p className="font-semibold text-center mb-3">
        {item.title.label.toUpperCase()}
      </p>
      <p className="font-light text-center">{`Author: ${item['im:artist'].label}`}</p>
    </div>
  );
};

export default Podcard;
