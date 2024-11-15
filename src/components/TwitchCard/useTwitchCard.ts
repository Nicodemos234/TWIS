import { useCallback, useMemo } from "react";
import { StreamInfo } from "../../hooks/useTwitch";

export const useTwitchCard = (stream: StreamInfo) => {
  const handleCardClick = useCallback(() => {
    window.open(`https://www.twitch.tv/${stream.user_name}`, "_blank");
  }, [stream.user_name]);

  const streamUptime = useMemo(() => {
    // calculates the difference between the startTime and now returning the uptime in hours:minutes:seconds
    const startTime = new Date(stream.started_at).getTime();
    const now = Date.now();
    const uptime = now - startTime;

    function formatTwoDigits(number: Number) {
      return String(number).padStart(2, "0");
    }

    const hours = formatTwoDigits(Math.floor(uptime / 3600000));
    const minutes = formatTwoDigits(Math.floor((uptime % 3600000) / 60000));
    const seconds = formatTwoDigits(Math.floor((uptime % 60000) / 1000));
    return `${hours}:${minutes}:${seconds}`;
  }, [stream.started_at]);

  return {
    handleCardClick,
    streamUptime,
  };
};
