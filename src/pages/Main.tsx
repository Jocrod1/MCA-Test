import { useState, useEffect } from "react";
import { getMain } from "../actions";
import Podcard from "../components/Podcard";
import FilterSearch from "../components/FilterSearch";
import { Entry } from "../models";

const Main = () => {
  const [data, setData] = useState<Array<Entry>>([]);

  const handleFetch = async () => {
    const entries = await getMain();

    setData(entries);
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
      <div className="flex flex-row items-start justify-center w-full flex-wrap gap-4">
        {data.map((d, index) => (
          <Podcard key={index} item={d} />
        ))}
      </div>
    </div>
  );
};

export default Main;
