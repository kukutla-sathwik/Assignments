export async function fetchGitHubUser(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);

  if (res.status === 404) {
    throw new Error("User not found");
  }
  if (!res.ok) {
    throw new Error("Failed to load user");
  }
  return res.json();
}

export async function fetchGitHubUserRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=50&sort=updated`
  );

  if (!res.ok) {
    throw new Error("Failed to load repositories");
  }
  return res.json();
}

export async function fetchRepo(owner, repo) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

  if (res.status === 404) throw new Error("Repository not found");
  if (!res.ok) throw new Error("Failed to load repository");

  return res.json();
}

export async function searchRepos(query) {
  const res = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(
      query
    )}&per_page=30`
  );

  if (!res.ok) throw new Error("Failed to search repositories");
  const data = await res.json();
  return data.items || [];
}
