import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Section = styled.section`
  margin-top: 1.5rem;
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  margin-top: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Form = styled.form`
  margin-top: 1.25rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 0.5rem 0.7rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  min-width: 260px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Button = styled.button`
  padding: 0.5rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;
    navigate(`/user/${username.trim()}`);
  }

  return (
    <Section>
      <Title>GitHub Radar</Title>
      <Subtitle>
        Explore GitHub users, their repositories, and open-source projects.
      </Subtitle>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="e.g. facebook, vercel, gaearon"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button type="submit">View Profile</Button>
      </Form>
    </Section>
  );
}

export default Home;
