import { useState, useEffect } from 'react';
import { Entry, SearchChange, SearchFunction } from '../models';

const useSearch = (items: Array<Entry>, handleChange: SearchFunction) => {
  const [search, setSearch] = useState('');
  const [storedItems, setStoredItems] = useState<Array<Entry>>([]);

  useEffect(() => {
    if (!!items.length && !storedItems.length) setStoredItems(items);
  }, [items]);

  const handleSearch: SearchChange = (value) => {
    setSearch(value);

    let response: Array<Entry> = [];

    if (!value) response = storedItems;
    else {
      response = storedItems.filter(
        (item) =>
          item.title.label
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .match(
              value
                .toUpperCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
            ) ||
          item['im:artist'].label
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .match(
              value
                .toUpperCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
            )
      );
    }

    handleChange(response);
  };

  return { search, handleSearch };
};

export default useSearch;
