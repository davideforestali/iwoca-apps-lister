const getOrdinal = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

export const getFormattedDate = (date) => {
  const parsedDate = new Date(date);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][parsedDate.getMonth()];

  return `
    ${parsedDate.getDate()}${getOrdinal(parsedDate.getDate())} 
    ${month} ${parsedDate.getFullYear()}`;
};
