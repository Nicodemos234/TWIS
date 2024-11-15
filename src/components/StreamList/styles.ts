import { styled } from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const LoggedOutText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-family: "Roboto", sans-serif;
  color: ${(props) => props.theme.colors.darkGrey};
`;
