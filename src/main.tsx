import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FormContextProvider } from "./context/FormContextProvider.tsx";
import { AuthListContextProvider } from "./context/AuthListContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthListContextProvider>
      <FormContextProvider>
        <App />
      </FormContextProvider>
    </AuthListContextProvider>
  </StrictMode>
);
