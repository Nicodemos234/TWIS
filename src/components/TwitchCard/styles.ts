import { styled } from "styled-components";

export const Wrapper = styled.div`
  padding: 0.5rem 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey};
  display: flex;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.grey};
    cursor: pointer;
  }
`;

export const StreamImagePreview = styled.img`
  width: 4.75rem;
  height: auto;
  border-radius: 0.25rem;
`;

export const StreamImageWrapper = styled.div`
  position: relative;
`;

export const StreamUptime = styled.p`
  position: absolute;
  bottom: 0.25rem;
  right: 0;
  border-radius: 0.25rem;
  padding: 0.1rem 0.25rem;
  background: ${({ theme }) => theme.colors.darkGrey + "80"};

  font-family: "Poppins", sans-serif;
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.whiteText};
`;

export const StreamInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StreamUser = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
`;

export const StreamOtherInfo = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.625rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGrey};
  overflow: hidden;
  max-height: 0.6rem;
  text-overflow: ellipsis;
`;
