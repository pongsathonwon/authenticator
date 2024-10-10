import { useEffect, useState } from "react";
import { AuthList } from "../lib/types";
import { useAuthListContext } from "../context/AuthListContextProvider";
import { genDigit, generateTimerGradient } from "../lib/util";

type RowProps = Omit<AuthList, "code">;

const useColorTimer = (time: number) => {
  const STEP = 100;
  const [ratio, setRatio] = useState(0);
  const color1 = "black";
  const color2 = "white";
  const baseColor = generateTimerGradient({ color1, color2 });
  const timerCss = baseColor((ratio * STEP) / time);
  useEffect(() => {
    const id = setInterval(() => {
      setRatio((r) => r + 1);
    }, STEP);
    return () => clearInterval(id);
  }, []);
  return timerCss;
};

function Row({ name, digit, time }: RowProps) {
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
  return (
    <li
      style={{
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        padding: ".5rem 1rem",
        borderBottom: "1px solid lightgray",
      }}
    >
      <h2>{name}</h2>
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
