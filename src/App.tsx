import React, { createContext, PropsWithChildren, useContext } from "react";
import "./App.css";
import { AuthList } from "./lib/types";
import Row from "./components/Row";
import Form from "./components/Form";
import { useAuthListContext } from "./context/AuthListContextProvider";

const mock: AuthList[] = [
  {
    name: "a",
    code: ["000", "000"],
    timeout: 10000,
  },
  {
    name: "b",
    code: ["000", "000"],
    timeout: 10000,
  },
];

function App() {
  const { list } = useAuthListContext();
  const [showForm, setShowForm] = React.useState(false);
  return (
    <section className="container">
      <h1 className="header">Authenticator app</h1>
      <div className="content">
        <ul style={{ listStyle: "none", padding: "0" }}>
          {list.map(({ name, code, timeout }) => (
            <Row key={name} {...{ name, code, timeout }} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default App;
