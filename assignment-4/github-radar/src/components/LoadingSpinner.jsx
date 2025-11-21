import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.accent};
  animation: ${spin} 0.8s linear infinite;
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <Wrapper>
      <Spinner />
      <Message>{message}</Message>
    </Wrapper>
  );
}

export default LoadingSpinner;
