import moment from 'moment-timezone';

function generateRandom(min = 0, max = 100) {
  // find diff
  const difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}

export const getRandMinutes = (): string => {
  const time = generateRandom(30, 50);

  const dur = moment('2000-01-01 00:00:00').add(time, 'minutes');

  return dur.format('mm:ss');
};

function pad(numberString: string, size: number) {
  let padded = numberString;
  while (padded.length < size) {
    padded = `0${padded}`;
  }
  return padded;
}

export const convertMsToTime = (value: number): string => {
  const seconds = Math.floor((value / 1000) % 60);
  const minutes = Math.floor((value / 1000 / 60) % 60);
  const hours = Math.floor((value / 1000 / 3600) % 24);

  let humanized = [];
  if (hours >= 1) {
    humanized = [
      pad(hours.toString(), 2),
      pad(minutes.toString(), 2),
      pad(seconds.toString(), 2)
    ];
  } else {
    humanized = [pad(minutes.toString(), 2), pad(seconds.toString(), 2)];
  }

  return humanized.join(':');
};

export const isValidUrl = (urlString: string) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};
