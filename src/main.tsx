import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import Theme, { ResetStyle } from "./theme";
import "./assets/fonts.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <ResetStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
