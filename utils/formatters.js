const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const dateFormatter = (rawDate) => {
  const processedDate = new Date(rawDate);
  return `${monthNames[processedDate.getMonth()]} ${processedDate.getDate()}`;
};

const completeDateFormatter = (rawDate) => {
  const processedDate = new Date(rawDate);
  return `${processedDate.getDate()} ${
    monthNames[processedDate.getMonth()]
  } ${processedDate.getFullYear()}`;
};

module.exports = {
  completeDateFormatter,
  dateFormatter,
};
