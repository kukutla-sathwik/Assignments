import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import {
  fetchGitHubUser,
  fetchGitHubUserRepos,
} from "../api/github";

const Section = styled.section`
  margin-top: 1.5rem;
`;

const ProfileCard = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const Avatar = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;
`;

const Name = styled.h2`
  margin: 0 0 0.15rem;
`;

const Username = styled.p`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Bio = styled.p`
  margin: 0 0 0.5rem;
`;

const Meta = styled.p`
  margin: 0.1rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const GitHubLink = styled.a`
  display: inline-block;
  margin-top: 0.35rem;
  font-size: 0.88rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent};

  &:hover {
    text-decoration: underline;
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 0.75rem;
`;

const RepoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const RepoItem = styled.li`
  padding: 0.75rem 0.75rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surfaceSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 0.6rem;
`;

const RepoName = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 0.25rem;

  &:hover {
    text-decoration: underline;
  }
`;

const RepoDesc = styled.p`
  margin: 0 0 0.25rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const RepoMeta = styled.small`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

function UserProfile() {
  const { username } = useParams();

  const {
    data: user,
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => fetchGitHubUser(username),
  });

  const {
    data: repos = [],
    isLoading: reposLoading,
    isError: reposIsError,
    error: reposError,
    refetch: refetchRepos,
  } = useQuery({
    queryKey: ["repos", username],
    queryFn: () => fetchGitHubUserRepos(username),
    enabled: !!username,
  });

  const loading = userLoading || reposLoading;
  const hasError = userIsError || reposIsError;
  const errorMessage =
    userError?.message || reposError?.message || "Something went wrong";

  if (loading) return <LoadingSpinner message="Loading user..." />;

  if (hasError) {
    return (
      <ErrorMessage
        message={errorMessage}
        onRetry={() => {
          refetchUser();
          refetchRepos();
        }}
      />
    );
  }

  if (!user) return null;

  return (
    <Section>
      <ProfileCard>
        <Avatar src={user.avatar_url} alt={user.login} />
        <div>
          <Name>{user.name || user.login}</Name>
          <Username>@{user.login}</Username>
          {user.bio && <Bio>{user.bio}</Bio>}
          <Meta>
            Followers: {user.followers} · Following: {user.following}
          </Meta>
          <Meta>Public repos: {user.public_repos}</Meta>
          {user.location && <Meta>📍 {user.location}</Meta>}
          {user.html_url && (
            <GitHubLink href={user.html_url} target="_blank" rel="noreferrer">
              View on GitHub
            </GitHubLink>
          )}
        </div>
      </ProfileCard>

      <SectionTitle>Repositories</SectionTitle>
      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <RepoList>
          {repos.map((repo) => (
            <RepoItem key={repo.id}>
              <RepoName to={`/repo/${repo.owner.login}/${repo.name}`}>
                {repo.name}
              </RepoName>
              {repo.description && <RepoDesc>{repo.description}</RepoDesc>}
              <RepoMeta>
                ⭐ {repo.stargazers_count} ·{" "}
                {repo.language || "Unknown language"}
              </RepoMeta>
            </RepoItem>
          ))}
        </RepoList>
      )}
    </Section>
  );
}

export default UserProfile;
