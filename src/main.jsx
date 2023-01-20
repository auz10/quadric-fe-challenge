import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

export const ColorsContext = React.createContext();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorsContext.Provider
      value={{
        success: "#3f955d",
        failed: "#ef233c",
        pending: "#f0b70f",
        failure: "#ef233c",
      }}
    >
      <App />
    </ColorsContext.Provider>
  </React.StrictMode>
);
