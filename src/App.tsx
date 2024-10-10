import React, { createContext, PropsWithChildren, useContext } from "react";
import "./App.css";
import Row from "./components/Row";
import Form from "./components/Form";
import { useAuthListContext } from "./context/AuthListContextProvider";
import AddBtn from "./components/AddBtn";

function App() {
  const { list } = useAuthListContext();
  const [showForm, setShowForm] = React.useState(false);
  return (
    <section className="container">
      <h1 className="header">Authenticator app</h1>
      {showForm && (
        <div
          style={{
            position: "absolute",
            left: "0",
            width: "100vw",
            zIndex: 100,
          }}
        >
          <Form />
        </div>
      )}
      <div className="content">
        <ul style={{ listStyle: "none", padding: "0" }}>
          {list.map(({ name, code, digit, time }) => (
            <Row key={code} {...{ name, digit, time }} />
          ))}
        </ul>
        <AddBtn showForm={showForm} onClick={() => setShowForm((p) => !p)} />
      </div>
    </section>
  );
}

export default App;
