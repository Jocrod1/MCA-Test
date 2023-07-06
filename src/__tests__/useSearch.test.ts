import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useSearch from '../hooks/useSearch';
import { Entry, SearchFunction } from '../models';
import FeedMock from './FeedMock.json';

const entry = FeedMock.feed.entry[0];
const items: Entry[] = [
  {
    'im:artist': { label: entry['im:artist'].label },
    'im:image': [
      {
        attributes: entry['im:image'][0].attributes,
        label: entry['im:image'][0].label
      }
    ],
    id: { attributes: { 'im:id': parseInt(entry.id.attributes['im:id']) } },
    summary: { label: entry.summary.label },
    title: { label: entry.title.label }
  }
];

describe('useSearch', () => {
  it('should return a empty search string', () => {
    let response: Entry[] = [];
    const handleChange: SearchFunction = (resp) => {
      response = resp;
    };

    const { result } = renderHook(() => useSearch(items, handleChange));

    expect(result.current.search).toBe('');
    expect(response.length).toBe(0);
  });
  it('should return  search string', () => {
    let response: Entry[] = [];
    const handleChange: SearchFunction = (resp) => {
      response = resp;
    };

    const { result } = renderHook(() => useSearch(items, handleChange));

    act(() => {
      result.current.handleSearch('jerome');
    });

    expect(result.current.search).toBe('jerome');
    expect(response.length).toBe(0);
  });
  it('should call the handleChange function', () => {
    const items: Entry[] = [];
    let called = false;
    const handleChange: SearchFunction = () => {
      called = true;
    };

    const { result } = renderHook(() => useSearch(items, handleChange));

    act(() => {
      result.current.handleSearch('jerome');
    });

    expect(called).toBe(true);
  });
  it('should have items when search changes to something coincident', () => {
    let called = false;
    let response: Entry[] = [];
    const handleChange: SearchFunction = (resp) => {
      response = resp;
      called = true;
    };

    const { result } = renderHook(() => useSearch(items, handleChange));

    act(() => {
      result.current.handleSearch('joe');
    });

    expect(called).toBe(true);
    expect(response.length).toBe(1);
  });
  it('should not have items when search changes to something not coincident', () => {
    let called = false;
    let response: Entry[] = [];
    const handleChange: SearchFunction = (resp) => {
      response = resp;
      called = true;
    };

    const { result } = renderHook(() => useSearch(items, handleChange));

    act(() => {
      result.current.handleSearch('notItem');
    });

    expect(called).toBe(true);
    expect(response.length).toBe(0);
  });
});
