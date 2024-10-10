import { useEffect, useState } from "react";
import { AuthList } from "../lib/types";
import { useAuthListContext } from "../context/AuthListContextProvider";
import { genDigit, generateTimerGradient } from "../lib/util";
import useCopyToClipboard from "../hook/useClipboard";

type RowProps = Omit<AuthList, "code"> & {
  copyValue: string | null;
  handleCopy: () => Promise<void>;
};

const useColorTimer = (time: number) => {
  const STEP = 200;
  const [ratio, setRatio] = useState(0);
  const timeLeft = time - ratio;
  const color1 = "white";
  const color2 = timeLeft > 5000 ? "lightblue" : "tomato";
  const baseColor = generateTimerGradient({ color1, color2 });
  const timerCss = baseColor(ratio / time);
  useEffect(() => {
    const id = setInterval(() => {
      setRatio((r) => (r + STEP > time ? r + STEP - time : r + STEP));
    }, STEP);
    return () => clearInterval(id);
  }, []);
  return timerCss;
};

function Row({ name, digit, time, copyValue, handleCopy }: RowProps) {
  const { setList } = useAuthListContext();
  // count down
  useEffect(() => {
    const id = setTimeout(() => {
      setList((l) =>
        l.map((al) => (al.name === name ? { ...al, digit: genDigit() } : al))
      );
    }, time);
    return () => clearTimeout(id);
  }, [name, digit]);

  // change color
  const timerCss = useColorTimer(time);
  const currentDigit = digit[0] + digit[1];

  const isDigitCopied = currentDigit === copyValue;
  return (
    <li
      onClick={handleCopy}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        padding: ".5rem 1rem",
        borderBottom: "1px solid lightgray",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>{name}</h2>
        {isDigitCopied && <span>copied</span>}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <span>{digit[0]}</span>
          <span>{digit[1]}</span>
        </div>
        <div
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "9999px",
            background: timerCss,
          }}
        ></div>
      </div>
    </li>
  );
}

export default Row;
