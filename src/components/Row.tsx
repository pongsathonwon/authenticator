import React, { useEffect } from "react";
import { AuthList } from "../lib/types";
import { useAuthListContext } from "../context/AuthListContextProvider";
import { genDigit } from "../lib/util";

type RowProps = Omit<AuthList, "code">;

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
  // handle css countdown
  useEffect(() => {
    const id = setInterval(() => {
      console.log(time - 1000, name);
    }, time / 10);
    return () => clearInterval(id);
  }, []);
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
        <div style={{ width: "2rem", height: "2rem", borderRadius: "9999px" }}>
          {time / 1000}
        </div>
      </div>
    </li>
  );
}

export default Row;
