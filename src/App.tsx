import styled from "styled-components";
import { Header } from "./components/Header";
import { StreamList } from "./components/StreamList";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-self: stretch;
  flex-direction: column;
  min-height: 560px;
  width: 360px;
  max-height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <StreamList />
    </Wrapper>
  );
}

export default App;
