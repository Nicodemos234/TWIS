import { createContext, useCallback, useContext, useMemo } from "react";
import { useAuth } from "./useAuth";
import { twitchApi } from "../consts";

type CurrentTwitchUser = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
};

export type StreamInfo = {
  id: string;
  user_id: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  thumbnail_url: string;
};

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
    return await new Promise<CurrentTwitchUser>((resolve) =>
      chrome.storage.local.get("user", function (items) {
        const user = items.user;
        if (user) resolve(user as CurrentTwitchUser);

        // If no user is saved, fetch it from the API
        fetch("https://api.twitch.tv/helix/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Client-Id": twitchApi.client_id,
          },
        }).then((response) => {
          response.json().then((userResponse) => {
            const user = userResponse?.data?.[0];
            if (!user) throw new Error("Error to get user");

            chrome.storage.local.set({ user });
            resolve(user);
          });
        });
      })
    );
  }, [token]);

  const getStreamFollowed = useCallback(async () => {
    if (!token) throw new Error("Token not found");
    const user = await getCurrentUser();
    return fetch(
      `https://api.twitch.tv/helix/streams/followed?user_id=${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": twitchApi.client_id,
        },
      }
    ).then((response) => response.json().then((data) => data.data));
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
