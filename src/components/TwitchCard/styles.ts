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

export const StreamInfo = styled.div`
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
