import styled from "styled-components";
import { Header } from "./components/Header";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-self: stretch;
  flex-direction: column;
  height: 100%;
`;

function App() {
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
}

export default App;
