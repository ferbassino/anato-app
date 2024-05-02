import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AnatoContextProvider } from "./context/StudentContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnatoContextProvider>
        <App />
      </AnatoContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
