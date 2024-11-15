import { useAuth } from "../../hooks/useAuth";
import { TwitchCard } from "../TwitchCard";
import { Content, LoggedOutText } from "./styles";
import { useStreamList } from "./useStreamList";

export const StreamList = () => {
  const { streamList } = useStreamList();
  const { token } = useAuth();
  return (
    <Content>
      {token ? (
        streamList.map((stream) => (
          <TwitchCard key={stream.id} stream={stream} />
        ))
      ) : (
        <LoggedOutText>Sign-in to see lives here</LoggedOutText>
      )}
    </Content>
  );
};
