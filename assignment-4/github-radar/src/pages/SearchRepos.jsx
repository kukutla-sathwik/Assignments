import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { searchRepos } from "../api/github";

const Section = styled.section`
  margin-top: 1.5rem;
`;

const ResultList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ResultItem = styled.li`
  padding: 0.8rem 0.8rem 0.65rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surfaceSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 0.6rem;
`;

const ResultName = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 0.25rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ResultDesc = styled.p`
  margin: 0 0 0.25rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ResultMeta = styled.small`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

function SearchRepos() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const {
    data: results = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["search-repos", query],
    queryFn: () => searchRepos(query),
    enabled: !!query,
  });

  return (
    <Section>
      <h2>Search Repositories</h2>
      {query && (
        <p>
          Results for: <strong>{query}</strong>
        </p>
      )}

      {!query && (
        <p>Use the search box in the navbar to search for repositories.</p>
      )}

      {isLoading && query && (
        <LoadingSpinner message="Searching repositories..." />
      )}

      {isError && (
        <ErrorMessage message={error?.message || "Search failed"} />
      )}

      {!isLoading && !isError && query && (
        <>
          {results.length === 0 ? (
            <p>No repositories found.</p>
          ) : (
            <ResultList>
              {results.map((repo) => (
                <ResultItem key={repo.id}>
                  <ResultName to={`/repo/${repo.owner.login}/${repo.name}`}>
                    {repo.full_name}
                  </ResultName>
                  {repo.description && (
                    <ResultDesc>{repo.description}</ResultDesc>
                  )}
                  <ResultMeta>
                    ⭐ {repo.stargazers_count} ·{" "}
                    {repo.language || "Unknown language"}
                  </ResultMeta>
                </ResultItem>
              ))}
            </ResultList>
          )}
        </>
      )}
    </Section>
  );
}

export default SearchRepos;
