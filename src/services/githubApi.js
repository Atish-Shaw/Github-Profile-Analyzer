const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export async function fetchUser(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("User not found");
  }

  return await response.json();
}

export async function fetchRepos(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Repositories not found");
  }

  return await response.json();
}

export async function compareUsers(usernameA, usernameB) {
  const [userA, userB, reposA, reposB] = await Promise.all([
    fetchUser(usernameA),
    fetchUser(usernameB),
    fetchRepos(usernameA),
    fetchRepos(usernameB),
  ]);

  return { userA, userB, reposA, reposB };
}