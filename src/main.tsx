import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import Theme, { ResetStyle } from "./theme";
import "./assets/fonts.css";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { TwitchProvider } from "./hooks/useTwitch.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <AuthProvider>
        <TwitchProvider>
          <ResetStyle />
          <App />
        </TwitchProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
