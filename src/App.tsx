import styled from "styled-components";
import { Header } from "./components/Header";
import { TwitchCard } from "./components/TwitchCard";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-self: stretch;
  flex-direction: column;
  min-height: 560px;
  width: 360px;
  max-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  align-self: stretch;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Content>
        <TwitchCard />
        <TwitchCard />
        <TwitchCard />
        <TwitchCard />
        <TwitchCard />
        <TwitchCard />
        <TwitchCard />
        <TwitchCard />
      </Content>
    </Wrapper>
  );
}

export default App;
