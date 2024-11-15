import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
`;

export const MainLogo = styled.img`
  height: 2.5rem;
`;

export const MenuIcon = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.whiteText};
  position: relative;
  cursor: pointer;
`;

export const Menu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  background: white;
  border-radius: 0.25rem;
  right: 0;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
`;

export const MenuButton = styled.button`
  font-size: 0.75rem;
  cursor: pointer;
  color: black;
  border: none;
  background: none;

  font-family: "Poppins", sans-serif;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;

  &:hover {
    background: ${({ theme }) => theme.colors.grey};
  }
`;
