import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { StreamInfo, useTwitch } from "../../hooks/useTwitch";

export const useStreamList = () => {
  const [streamList, setStreamList] = useState<StreamInfo[]>([]);
  const { token } = useAuth();
  const { getStreamFollowed } = useTwitch();
  useEffect(() => {
    if (token)
      getStreamFollowed()
        .then((streamsInfo) => {
          setStreamList(streamsInfo);
        })
        .catch(console.error);
  }, [token]);
  return { streamList };
};
