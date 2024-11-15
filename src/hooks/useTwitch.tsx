import { createContext, useCallback, useContext, useMemo } from "react";
import { useAuth } from "./useAuth";
import {
  CurrentTwitchUser,
  getTwitchStreamFollowed,
  getTwitchUser,
  StreamInfo,
} from "../api";
import { setExtensionBadge } from "../utils";

type TwitchContextType = {
  getCurrentUser: () => Promise<CurrentTwitchUser>;
  getStreamFollowed: () => Promise<StreamInfo[]>;
};

const TwitchContext = createContext<TwitchContextType>({
  getCurrentUser: () => {
    throw new Error("TwitchContext not initialized");
  },
  getStreamFollowed: () => {
    throw new Error("TwitchContext not initialized");
  },
});

export const TwitchProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();

  const getCurrentUser = useCallback(async () => {
    if (!token) throw new Error("Token not found");
    return await getTwitchUser(token);
  }, [token]);

  const getStreamFollowed = useCallback(async () => {
    if (!token) throw new Error("Token not found");
    const streams = await getTwitchStreamFollowed(token);
    setExtensionBadge(streams.length + "");
    return streams;
  }, [token, getCurrentUser]);

  const value = useMemo(
    () => ({ getCurrentUser, getStreamFollowed }),
    [getCurrentUser]
  );
  return (
    <TwitchContext.Provider value={value}>{children}</TwitchContext.Provider>
  );
};

export const useTwitch = () => useContext(TwitchContext);
