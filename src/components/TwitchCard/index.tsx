import {
  StreamOtherInfo,
  StreamImagePreview,
  StreamInfo,
  StreamUser,
  Wrapper,
} from "./styles";

export const TwitchCard = () => {
  return (
    <Wrapper>
      <StreamImagePreview
        src="https://static-cdn.jtvnw.net/previews-ttv/live_user_rubius-500x280.jpg"
        alt="Stream preview"
      />
      <StreamInfo>
        <StreamUser>Rubius</StreamUser>
        <StreamOtherInfo>Just Chatting</StreamOtherInfo>
        <StreamOtherInfo>
          💀SKIBIDI CRAFT DIA 4💀POV DEL GANADOR💀100.000$💀REVIVIERON AL
          MUFAS💀SEGUIMOS MALDITOS💀
        </StreamOtherInfo>
      </StreamInfo>
    </Wrapper>
  );
};
