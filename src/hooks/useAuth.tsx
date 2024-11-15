import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { twitchApi } from "../consts";

type AuthContextType = {
  token?: string;
  logout: () => void;
  login: () => void;
};

const AuthContext = createContext<AuthContextType>({
  logout: () => {
    throw new Error("AuthContext not initialized");
  },
  login: () => {
    throw new Error("AuthContext not initialized");
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    chrome.storage.local.get(["token"], function (result) {
      setToken(result.token);
    });
  }, []);

  const logout = useCallback(() => {
    chrome.storage.local.remove("token", function () {
      setToken(undefined);
    });
    setToken(undefined);
  }, []);

  const login = useCallback(() => {
    console.log(
      "will create tabs with url",
      `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${twitchApi.client_id}&redirect_uri=${twitchApi.redirect_uri}&scope=${twitchApi.scope}`
    );
    chrome.tabs.create({
      url: `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${twitchApi.client_id}&redirect_uri=${twitchApi.redirect_uri}&scope=${twitchApi.scope}`,
    });
  }, []);

  const value = useMemo(() => ({ token, logout, login }), [token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
