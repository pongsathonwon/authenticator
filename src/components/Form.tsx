import React from "react";
import { useAuthListContext } from "../context/AuthListContextProvider";
import { genDigit } from "../lib/util";
import { AuthList } from "../lib/types";

type FormProps = { onClose: () => void };

function Form({ onClose }: FormProps) {
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [time, setTime] = React.useState(30);
  const { listKey, setList } = useAuthListContext();
  const isError = listKey.findIndex((l) => l === name) >= 0;
  const submit = () => {
    const newAuth = {
      name,
      code,
      time: time * 1000,
      digit: genDigit(),
    } satisfies AuthList;
    setList((l) => [...l, newAuth]);
    setName("");
    setCode("");
    setTime(30);
  };

  return (
    <>
      {isError && (
        <div
          style={{
            backgroundColor: "salmon",
            maxWidth: "40rem",
            margin: "0 auto",
          }}
        >
          name already exsist!!!
        </div>
      )}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem 0",
          maxWidth: "40rem",
          backgroundColor: "black",
          margin: "0 auto",
        }}
      >
        <label htmlFor="name" className="fieldset">
          name
          <input
            type="text"
            id="name"
            onChange={({ target }) => setName(target.value)}
            value={name}
          />
        </label>
        <label htmlFor="code" className="fieldset">
          code
          <input
            type="text"
            id="code"
            value={code}
            onChange={({ target }) => setCode(target.value)}
          />
        </label>
        <label htmlFor="timeout" className="fieldset">
          time
          <input
            type="number"
            id="timeout"
            value={time}
            onChange={({ target }) => setTime(Number(target.value))}
          />
        </label>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "80%",
            margin: "0 auto",
            gap: "2rem",
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              submit();
              onClose();
            }}
            style={{
              flex: "1 1 auto",
              margin: "0 auto",
              padding: ".5rem 1rem",
            }}
          >
            add
          </button>
          <button
            onClick={onClose}
            style={{
              flex: "1 1 auto",
              margin: "0 auto",
              padding: ".5rem 1rem",
            }}
          >
            cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
