import { twitchApi } from "./consts";
import { getDataFromChromeStorage } from "./utils";

export type CurrentTwitchUser = {
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

export const getTwitchUser = async (
  token: string
): Promise<CurrentTwitchUser> => {
  return await new Promise<CurrentTwitchUser>(async (resolve) => {
    const user = await getDataFromChromeStorage("user");
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
  });
};

export const getTwitchStreamFollowed = async (
  token: string
): Promise<StreamInfo[]> => {
  const user = await getTwitchUser(token);
  return fetch(
    `https://api.twitch.tv/helix/streams/followed?user_id=${user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": twitchApi.client_id,
      },
    }
  ).then((response) => response.json().then((data) => data.data));
};
