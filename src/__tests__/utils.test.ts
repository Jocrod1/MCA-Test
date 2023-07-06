import { describe, expect, expectTypeOf, it } from 'vitest';

import { convertMsToTime, getRandMinutes, isValidUrl } from '../utils';

describe('utils', () => {
  it('should generate a random minute in string format', () => {
    const minutes = getRandMinutes();

    expectTypeOf(minutes).toBeString();
    expect(!!minutes.match(/\d+:[0-5]\d/)).toBe(true);
  });
  it('should convert 1 hour in miliseconds to timespan in string format', () => {
    //1 hour
    const time = convertMsToTime(3600000);

    expectTypeOf(time).toBeString();
    expect(time.includes(':')).toBe(true);
    expect(parseInt(time[1])).toBe(1);
  });
  it('should pass a valid url', () => {
    //1 hour
    const isValid = isValidUrl('www.google.com');

    expect(isValid).toBe(true);
  });
  it('should notpass a invalid url', () => {
    //1 hour
    const isValid = isValidUrl('google.com');

    expect(isValid).toBe(true);
  });
});
