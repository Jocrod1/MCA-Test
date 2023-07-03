import { useState, useEffect } from "react";
import { StoreStateType, getMain } from "../actions";
import Podcard from "../components/Podcard";
import FilterSearch from "../components/FilterSearch";
import { Entry } from "../models";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { LOADED, LOADING } from "../store/actions/LoaderActionTypes";
import { useSelector } from "react-redux";

const Main = () => {
  const state = useSelector<StoreStateType, StoreStateType>((state) => state);
  const dispatch: Dispatch<any> = useDispatch();
  const [data, setData] = useState<Array<Entry>>([]);

  const handleFetch = async () => {
    dispatch({ type: LOADING });
    const entries = await getMain()(dispatch, () => state);

    setData(entries);
    dispatch({ type: LOADED });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const changeData = (response: Array<Entry>) => {
    setData(response);
  };

  return (
    <div className="flex flex-col w-full px-16 mt-6">
      <FilterSearch items={data} handleChange={changeData} />
      <div className="flex flex-row items-start justify-center w-full flex-wrap gap-4 mb-10">
        {data.map((d, index) => (
          <Podcard key={index} item={d} />
        ))}
      </div>
    </div>
  );
};

export default Main;
