import { getTwitchStreamFollowed, StreamInfo } from "../api";
import {
  addChromeListener,
  getDataFromChromeStorage,
  setDataToChromeStorage,
  setExtensionBadge,
} from "../utils";

addChromeListener("setBadge", (message) => {
  setExtensionBadge(message.text);
});

chrome.alarms.create({ delayInMinutes: 0, periodInMinutes: 1 });

const updateBadgeWithStreamsSize = async () => {
  const token = (await getDataFromChromeStorage("token")) as string | undefined;
  if (!token) return;
  const streams = await getTwitchStreamFollowed(token);
  setExtensionBadge(streams.length + "");
};

updateBadgeWithStreamsSize();

chrome.alarms.onAlarm.addListener(async () => {
  const token = (await getDataFromChromeStorage("token")) as string | undefined;
  if (!token) return;
  const oldStreams =
    ((await getDataFromChromeStorage("streams")) as StreamInfo[] | undefined) ||
    [];
  const streams = await getTwitchStreamFollowed(token);
  // We keep the extension badge updated with the number of streams
  setExtensionBadge(streams.length + "");
  // Update the streams in the storage
  setDataToChromeStorage("streams", streams);

  // Compare the old streams with the new streams
  const newStreams = streams.filter(
    (stream) => !oldStreams.find((oldStream) => oldStream.id === stream.id)
  );
  if (newStreams.length > 0 && newStreams.length < 5) {
    //Limit the new streams to five, to not span notifications
    const limitedStreams = newStreams.slice(0, 5);
    limitedStreams.forEach((stream) => {
      chrome.notifications.create({
        type: "basic",
        title: `${stream.user_name} is online now!`,
        message: stream.title,
        silent: false,
        iconUrl: stream.thumbnail_url.replace("{width}x{height}", "128x72"),
      });
    });
  }
});
