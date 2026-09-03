import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getLanguageStats } from "../utils/getLanguageStats";
import { fetchUser, fetchRepos } from "../services/githubApi";

export function useGithubProfile() {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [repo, setRepo] = useState([]);
  const [langStats, setLangStats] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setUser("");
      setRepo([]);
      setLangStats({});
    }
  }, [location.pathname]);

  async function getUsers(directUsername) {
    const searchQuery = directUsername || username;
    setUsername("");
    try {
      setLoading(true);
      setError("");

      const userData = await fetchUser(searchQuery);
      setUser(userData);

      const repoData = await fetchRepos(searchQuery);
      setRepo(repoData);

      setLangStats(getLanguageStats(repoData));
      navigate(`/profile/${searchQuery}`);

    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 1000)
    } finally {
      setLoading(false);
    }
  }

  return { user, username, setUsername, loading, repo, error, langStats, getUsers };
}