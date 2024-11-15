export const setExtensionBadge = (text: string) => {
  chrome.action.setBadgeText({ text });
};
