import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTwitch } from "../../hooks/useTwitch";
import { StreamInfo } from "../../api";

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
