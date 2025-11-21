import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { fetchRepo } from "../api/github";

const Section = styled.section`
  margin-top: 1.5rem;
`;

const Card = styled.div`
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 0.3rem;
`;

const Description = styled.p`
  margin-top: 0;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MetaRow = styled.p`
  margin: 0.15rem 0;
  font-size: 0.9rem;
`;

const GithubAnchor = styled.a`
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function RepoDetails() {
  const { owner, repo } = useParams();

  const {
    data: repoData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["repo", owner, repo],
    queryFn: () => fetchRepo(owner, repo),
  });

  if (isLoading) return <LoadingSpinner message="Loading repository..." />;

  if (isError)
    return (
      <ErrorMessage
        message={error?.message || "Failed to load repository"}
        onRetry={refetch}
      />
    );

  if (!repoData) return null;

  return (
    <Section>
      <Card>
        <Title>{repoData.full_name}</Title>
        {repoData.description && (
          <Description>{repoData.description}</Description>
        )}
        <MetaRow>
          ⭐ {repoData.stargazers_count} · Forks: {repoData.forks_count} ·
          Issues: {repoData.open_issues_count}
        </MetaRow>
        <MetaRow>
          Language: {repoData.language || "Unknown"} · Visibility:{" "}
          {repoData.private ? "Private" : "Public"}
        </MetaRow>
        <MetaRow>
          Created at: {new Date(repoData.created_at).toLocaleDateString()}
        </MetaRow>
        <MetaRow>
          Last updated: {new Date(repoData.updated_at).toLocaleString()}
        </MetaRow>

        <GithubAnchor
          href={repoData.html_url}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </GithubAnchor>
      </Card>
    </Section>
  );
}

export default RepoDetails;
