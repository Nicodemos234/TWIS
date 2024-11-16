export const setExtensionBadge = (text: string) => {
  chrome.action.setBadgeText({ text });
};

export const addChromeListener = (
  type: string,
  callback: (message: any) => void
) => {
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === type) {
      callback(message);
    }
  });
};

export const getDataFromChromeStorage = (key: string) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (data) => {
      resolve(data[key]);
    });
  });
};

export const setDataToChromeStorage = (key: string, value: any) => {
  chrome.storage.local.set({ [key]: value });
};
