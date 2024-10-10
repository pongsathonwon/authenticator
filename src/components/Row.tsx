import React from "react";
import { AuthList } from "../lib/types";

type RowProps = AuthList;

function Row({ name, value, timeout }: RowProps) {
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
          <span>{value[0]}</span>
          <span>{value[1]}</span>
        </div>
        <div style={{ width: "2rem", height: "2rem", borderRadius: "9999px" }}>
          {timeout / 1000}
        </div>
      </div>
    </li>
  );
}

export default Row;
