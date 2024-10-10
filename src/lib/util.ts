const randInt = () => Math.floor(Math.random() * 1000);

const convetNumToString = () => {
  const str = String(randInt());
  if (str.length === 1) return `00${str}`;
  if (str.length === 2) return `0${str}`;
  return str;
};

export const genDigit = () =>
  [convetNumToString(), convetNumToString()] satisfies [string, string];

type ColorConfig = {
  color1: string;
  color2: string;
};

export const generateTimerGradient =
  ({ color1, color2 }: ColorConfig) =>
  (ratio: number) => {
    if (ratio > 1) {
      const newRatio = ratio - Math.floor(ratio);
      return `conic-gradient(${color1}, ${color1} ${newRatio}turn, ${color2} ${newRatio}turn)`;
    }
    return `conic-gradient(${color1}, ${color1} ${ratio}turn, ${color2} ${ratio}turn)`;
  };
