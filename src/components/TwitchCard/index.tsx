import { StreamInfo } from "../../hooks/useTwitch";
import {
  StreamOtherInfo,
  StreamImagePreview,
  StreamInfoWrapper,
  StreamUser,
  Wrapper,
  StreamImageWrapper,
  StreamUptime,
} from "./styles";
import { useTwitchCard } from "./useTwitchCard";

export const TwitchCard = ({ stream }: { stream: StreamInfo }) => {
  const { handleCardClick, streamUptime } = useTwitchCard(stream);

  return (
    <Wrapper onClick={handleCardClick}>
      <StreamImageWrapper>
        <StreamImagePreview
          src={stream.thumbnail_url.replace("{width}x{height}", "360x200")}
          alt="Stream preview"
        />
        <StreamUptime>{streamUptime}</StreamUptime>
      </StreamImageWrapper>
      <StreamInfoWrapper>
        <StreamUser>{stream.user_name}</StreamUser>
        <StreamOtherInfo>
          {stream.game_name} - {stream.viewer_count}
        </StreamOtherInfo>
        <StreamOtherInfo>{stream.title}</StreamOtherInfo>
      </StreamInfoWrapper>
    </Wrapper>
  );
};
