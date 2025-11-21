import styled from "styled-components";

const Box = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.dangerBorder};
  background-color: ${({ theme }) => theme.colors.dangerBg};
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.95rem;
`;

const RetryButton = styled.button`
  margin-top: 0.5rem;
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: 0.85rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

function ErrorMessage({ message, onRetry }) {
  return (
    <Box>
      <Text>{message}</Text>
      {onRetry && (
        <RetryButton type="button" onClick={onRetry}>
          Retry
        </RetryButton>
      )}
    </Box>
  );
}

export default ErrorMessage;
