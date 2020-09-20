const zeroFill = val => parseInt(val) ? 
parseInt(val) <= 9 ? `0${val}`: val
: 0;
export const formatDateFrom = (date) => {
  if (!date) return null;
  return `${zeroFill(date.getDate())}/${zeroFill(date.getMonth() + 1)}/${date.getFullYear()}`;
}