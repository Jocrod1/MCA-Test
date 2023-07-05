import useSearch from '../hooks/useSearch';
import { Entry, SearchFunction } from '../models';

type Props = {
  items: Array<Entry>;
  handleChange: SearchFunction;
};

const FilterSearch = ({ items, handleChange }: Props) => {
  const { search, handleSearch } = useSearch(items, handleChange);

  return (
    <div className="flex flex-row w-full justify-end items-center">
      <span
        className="cursor-pointer bg-blue-400 text-white text-sm font-medium mr-2 px-2.5 rounded "
        onClick={() => handleSearch('')}
      >
        {items.length}
      </span>
      <input
        placeholder="Filter podcasts..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg outline-none hover:border-blue-400 focus:border-blue-600 transition w-60 p-2.5"
      />
    </div>
  );
};

export default FilterSearch;
