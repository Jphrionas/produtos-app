import moment from 'moment';

export const parseDateFrom = (dataString, separator = "/") => {
  return new Date(
    ...dataString.split(separator)
    .reverse()
    .map((item, idx) => idx % 2 === 0 ? item : parseInt(item) - idx )
  );
}

export const parseStringFrom = (date) => {
  if (!date || typeof date !== Date) throw new Error('Invalid Date Object parameter!')
  return moment(date).format(pattern);
}