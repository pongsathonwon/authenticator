const randInt = () => Math.floor(Math.random() * 1000);

const convetNumToString = () => {
  const str = String(randInt());
  if (str.length === 1) return `00${str}`;
  if (str.length === 2) return `0${str}`;
  return str;
};

export const genDigit = () =>
  [convetNumToString(), convetNumToString()] satisfies [string, string];
